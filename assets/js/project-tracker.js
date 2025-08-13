/**
 * Project Tracker Interactive Features
 * Handles filtering, collapsible sections, and dynamic interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeCollapsibleSections();
    initializeAnimations();
});

/**
 * Initialize filter functionality
 */
function initializeFilters() {
    const statusFilter = document.getElementById('status-filter');
    const categoryFilter = document.getElementById('category-filter');
    const priorityFilter = document.getElementById('priority-filter');
    
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (priorityFilter) priorityFilter.addEventListener('change', applyFilters);
}

/**
 * Apply filters to project cards
 */
function applyFilters() {
    const statusValue = document.getElementById('status-filter')?.value || 'all';
    const categoryValue = document.getElementById('category-filter')?.value || 'all';
    const priorityValue = document.getElementById('priority-filter')?.value || 'all';
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const cardStatus = getCardAttribute(card, 'status');
        const cardCategory = getCardAttribute(card, 'category');
        const cardPriority = getCardAttribute(card, 'priority');
        
        const matchesStatus = statusValue === 'all' || cardStatus === statusValue;
        const matchesCategory = categoryValue === 'all' || cardCategory === categoryValue;
        const matchesPriority = priorityValue === 'all' || cardPriority === priorityValue;
        
        if (matchesStatus && matchesCategory && matchesPriority) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
    
    // Update section visibility and counts
    updateSectionVisibility();
}

/**
 * Get card attribute based on its content
 */
function getCardAttribute(card, attribute) {
    switch (attribute) {
        case 'status':
            const statusBadge = card.querySelector('.status-badge');
            if (!statusBadge) return '';
            const statusClasses = statusBadge.className.split(' ');
            const statusClass = statusClasses.find(cls => cls.startsWith('status-'));
            return statusClass ? statusClass.replace('status-', '') : '';
            
        case 'category':
            const categoryElement = card.querySelector('.project-category');
            return categoryElement ? categoryElement.textContent.toLowerCase().trim() : '';
            
        case 'priority':
            const priorityBadge = card.querySelector('.priority-badge');
            if (!priorityBadge) return '';
            const priorityClasses = priorityBadge.className.split(' ');
            const priorityClass = priorityClasses.find(cls => cls.startsWith('priority-'));
            return priorityClass ? priorityClass.replace('priority-', '') : '';
            
        default:
            return '';
    }
}

/**
 * Update section visibility based on filtered results
 */
function updateSectionVisibility() {
    const sections = document.querySelectorAll('.projects-grid');
    
    sections.forEach(section => {
        const visibleCards = section.querySelectorAll('.project-card[style*="display: block"], .project-card:not([style*="display: none"])');
        const sectionHeader = section.previousElementSibling;
        
        if (visibleCards.length === 0) {
            section.style.display = 'none';
            if (sectionHeader && sectionHeader.classList.contains('section-header')) {
                sectionHeader.style.display = 'none';
            }
        } else {
            section.style.display = 'grid';
            if (sectionHeader && sectionHeader.classList.contains('section-header')) {
                sectionHeader.style.display = 'flex';
            }
        }
    });
}

/**
 * Initialize collapsible sections
 */
function initializeCollapsibleSections() {
    // Auto-collapse completed and on-hold sections by default
    const collapsibleSections = ['completed', 'on-hold'];
    
    collapsibleSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const header = document.querySelector(`[onclick*="${sectionId}"]`);
        
        if (section && header) {
            // Start collapsed
            section.classList.add('collapsed');
            header.classList.add('collapsed');
        }
    });
}

/**
 * Toggle collapsible section
 * @param {string} sectionId - The ID of the section to toggle
 */
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.querySelector(`[onclick*="${sectionId}"]`);
    
    if (!section || !header) return;
    
    const isCollapsed = section.classList.contains('collapsed');
    
    if (isCollapsed) {
        // Expand
        section.classList.remove('collapsed');
        header.classList.remove('collapsed');
        section.style.maxHeight = section.scrollHeight + 'px';
    } else {
        // Collapse
        section.classList.add('collapsed');
        header.classList.add('collapsed');
        section.style.maxHeight = '0';
    }
}

/**
 * Initialize animations and scroll effects
 */
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe project cards for animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
    
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Reset all filters
 */
function resetFilters() {
    const filters = ['status-filter', 'category-filter', 'priority-filter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.value = 'all';
        }
    });
    applyFilters();
}

/**
 * Utility function to debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Search functionality for projects
 * @param {string} query - Search query
 */
function searchProjects(query) {
    const projectCards = document.querySelectorAll('.project-card');
    const searchTerm = query.toLowerCase();
    
    projectCards.forEach(card => {
        const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
        const tags = Array.from(card.querySelectorAll('.project-tag'))
            .map(tag => tag.textContent.toLowerCase())
            .join(' ');
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       tags.includes(searchTerm);
        
        if (matches || searchTerm === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    updateSectionVisibility();
}

// Make functions available globally
window.toggleSection = toggleSection;
window.resetFilters = resetFilters;
window.searchProjects = debounce(searchProjects, 300);
