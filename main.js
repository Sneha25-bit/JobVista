// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href !== '#') {
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Authentication functionality
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Sample user data (in a real app, this would be in a database)
const sampleUser = {
    email: 'user@example.com',
    password: 'password123'
};

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simple authentication (in a real app, this would be more secure)
        if (email === sampleUser.email && password === sampleUser.password) {
            // Store user session
            localStorage.setItem('currentUser', JSON.stringify({ email: email, name: 'John Doe' }));
            // Redirect to home page
            window.location.href = 'index.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // In a real app, this would create a new user in the database
        alert('Account created successfully! Please login.');
        window.location.href = 'login.html';
    });
}

// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    // Update navigation for logged-in user
    const authLinks = document.querySelectorAll('.btn-signin, .btn-signup');
    authLinks.forEach(link => {
        if (link.classList.contains('btn-signin')) {
            link.textContent = `Welcome, ${currentUser.name}`;
            link.href = '#';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.reload();
            });
        } else {
            link.style.display = 'none';
        }
    });
}

// Job search functionality
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const jobTitle = document.querySelector('.search-box input:first-child').value;
        const location = document.querySelector('.search-box input:last-child').value;
        
        if (jobTitle || location) {
            alert(`Searching for ${jobTitle} jobs in ${location}`);
            // Here you would typically make an API call to fetch job listings
        } else {
            alert('Please enter a job title or location');
        }
    });
}

// Apply button functionality
document.querySelectorAll('.apply-btn').forEach(button => {
    button.addEventListener('click', function() {
        const jobTitle = this.parentElement.querySelector('h3').textContent;
        // Check if user is logged in before allowing application
        if (!currentUser) {
            alert('Please login to apply for jobs');
            window.location.href = 'login.html';
            return;
        }
        alert(`Applying for ${jobTitle}`);
        // Here you would typically open a modal or redirect to an application page
    });
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Jobs page functionality
if (window.location.pathname.includes('jobs.html')) {
    const jobsList = document.querySelector('.jobs-list');
    const mockJobs = [
        {
            title: 'Frontend Developer',
            company: 'Tech Solutions Inc.',
            location: 'San Francisco, CA',
            type: 'Full Time',
            salary: '$100K - $130K',
            experience: 'Mid Level'
        },
        {
            title: 'Product Manager',
            company: 'Innovation Hub',
            location: 'New York, NY',
            type: 'Full Time',
            salary: '$120K - $150K',
            experience: 'Senior Level'
        },
        {
            title: 'UI/UX Designer',
            company: 'Creative Agency',
            location: 'Remote',
            type: 'Contract',
            salary: '$80K - $100K',
            experience: 'Mid Level'
        }
    ];

    function displayJobs(jobs) {
        jobsList.innerHTML = jobs.map(job => `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p class="company">${job.company}</p>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                <p><i class="fas fa-briefcase"></i> ${job.type}</p>
                <p class="salary"><i class="fas fa-dollar-sign"></i> ${job.salary}</p>
                <p><i class="fas fa-user-tie"></i> ${job.experience}</p>
                <button class="apply-btn">Apply Now</button>
            </div>
        `).join('');
    }

    // Initial display of jobs
    displayJobs(mockJobs);

    // Filter functionality
    const filters = document.querySelectorAll('.filter-select');
    filters.forEach(filter => {
        filter.addEventListener('change', () => {
            // Here you would typically filter the jobs based on selected criteria
            // For now, we'll just show the mock jobs
            displayJobs(mockJobs);
        });
    });
}

// News page functionality
if (window.location.pathname.includes('news.html')) {
    const newsSearch = document.querySelector('.news-search input');
    const newsFilter = document.querySelector('.news-filter');

    if (newsSearch) {
        newsSearch.addEventListener('input', (e) => {
            // Here you would typically filter news based on search input
            console.log('Searching for:', e.target.value);
        });
    }

    if (newsFilter) {
        newsFilter.addEventListener('change', (e) => {
            // Here you would typically filter news based on selected category
            console.log('Filtering by:', e.target.value);
        });
    }
}