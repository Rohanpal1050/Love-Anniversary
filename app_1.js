// Relationship data from JSON
const relationshipData = {
  "startDate": "2020-08-01",
  "anniversaryDate": "2025-08-01",
  "timeline": [
    {
      "title": "First Meeting",
      "date": "2023-01-20",
      "description": "The day we first met at the coffee shop and I knew you were special",
      "icon": "💕"
    },
    {
      "title": "First Date",
      "date": "2023-02-14",
      "description": "Our magical Valentine's Day first date that started it all",
      "icon": "📅"
    },
    {
      "title": "First I Love You",
      "date": "2023-04-15",
      "description": "The moment we both knew this was forever",
      "icon": "💌"
    },
    {
      "title": "First Trip Together",
      "date": "2023-07-22",
      "description": "Our amazing weekend getaway to the mountains",
      "icon": "🗺️"
    },
    {
      "title": "Moving In Together",
      "date": "2024-01-10",
      "description": "Making our home together - the best decision ever",
      "icon": "🏠"
    },
    {
      "title": "One Year Anniversary",
      "date": "2024-02-14",
      "description": "Celebrating our first year of incredible love",
      "icon": "🎁"
    }
  ],
  "memories": [
    {
      "title": "Your Beautiful Smile",
      "description": "The way you light up every room you enter"
    },
    {
      "title": "Late Night Conversations",
      "description": "Talking until sunrise about our dreams and everything"
    },
    {
      "title": "Your Laugh",
      "description": "The most beautiful sound in the world"
    },
    {
      "title": "Dancing in the Kitchen",
      "description": "Our spontaneous dance parties while cooking dinner"
    },
    {
      "title": "Morning Coffee Together",
      "description": "Starting every day with you makes everything perfect"
    },
    {
      "title": "Your Kindness",
      "description": "How you care for everyone around you amazes me"
    }
  ],
  "futurePlans": [
    "Travel to Paris together",
    "Adopt a puppy",
    "Learn to cook your grandmother's recipes",
    "Take dancing lessons",
    "Buy our dream house",
    "Grow old together"
  ],
  "quizQuestions": [
    {
      "question": "Where did we have our first date?",
      "options": ["Italian Restaurant", "Coffee Shop", "Park", "Movies"],
      "correct": 0
    },
    {
      "question": "What's my favorite thing about you?",
      "options": ["Your smile", "Your laugh", "Your kindness", "Everything"],
      "correct": 3
    },
    {
      "question": "What's our song?",
      "options": ["Perfect by Ed Sheeran", "All of Me by John Legend", "A Thousand Years", "Can't Help Myself"],
      "correct": 1
    }
  ]
};

// Global variables
let currentQuestionIndex = 0;
let quizScore = 0;
let quizAnswered = false;

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdowns();
    populateTimeline();
    populateMemories();
    populateFuturePlans();
    initializeQuiz();
    setupScrollAnimations();
    setupPhotoGallery();
    animateLoveLetter();
});

// Countdown Functions
function initializeCountdowns() {
    // Time together countdown
    updateTimeTogetherCountdown();
    setInterval(updateTimeTogetherCountdown, 1000);
    
    // Next anniversary countdown  
    updateNextAnniversaryCountdown();
    setInterval(updateNextAnniversaryCountdown, 1000);
}

function updateTimeTogetherCountdown() {
    const startDate = new Date(relationshipData.startDate);
    const now = new Date();
    const diff = now - startDate;
    
    const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor((diff % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
    const days = Math.floor((diff % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    
    const yearsEl = document.getElementById('years');
    const monthsEl = document.getElementById('months');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    
    if (yearsEl) yearsEl.textContent = years;
    if (monthsEl) monthsEl.textContent = months;
    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
}

function updateNextAnniversaryCountdown() {
    // Calculate next anniversary (either this year or next year)
    const now = new Date();
    const currentYear = now.getFullYear();
    let nextAnniversary = new Date(currentYear, 1, 14); // February 14th of current year
    
    // If this year's anniversary has passed, use next year's
    if (now > nextAnniversary) {
        nextAnniversary = new Date(currentYear + 1, 1, 14);
    }
    
    const diff = nextAnniversary - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((diff % (60 * 1000)) / 1000);
        
        const nextDaysEl = document.getElementById('nextDays');
        const nextHoursEl = document.getElementById('nextHours');
        const nextMinutesEl = document.getElementById('nextMinutes');
        const nextSecondsEl = document.getElementById('nextSeconds');
        
        if (nextDaysEl) nextDaysEl.textContent = days;
        if (nextHoursEl) nextHoursEl.textContent = hours;
        if (nextMinutesEl) nextMinutesEl.textContent = minutes;
        if (nextSecondsEl) nextSecondsEl.textContent = seconds;
    }
}

// Timeline Functions
function populateTimeline() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;
    
    relationshipData.timeline.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${formattedDate}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <p>${item.description}</p>
            </div>
            <div class="timeline-icon">${item.icon}</div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Memories Functions
function populateMemories() {
    const memoriesGrid = document.getElementById('memoriesGrid');
    if (!memoriesGrid) return;
    
    relationshipData.memories.forEach(memory => {
        const memoryItem = document.createElement('div');
        memoryItem.className = 'memory-item';
        memoryItem.innerHTML = `
            <h3>${memory.title}</h3>
            <p>${memory.description}</p>
        `;
        
        memoryItem.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
        
        memoriesGrid.appendChild(memoryItem);
    });
}

// Future Plans Functions
function populateFuturePlans() {
    const futureGrid = document.getElementById('futureGrid');
    if (!futureGrid) return;
    
    relationshipData.futurePlans.forEach(plan => {
        const futureItem = document.createElement('div');
        futureItem.className = 'future-item';
        futureItem.innerHTML = `<p>${plan}</p>`;
        futureGrid.appendChild(futureItem);
    });
}

// Quiz Functions
function initializeQuiz() {
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= relationshipData.quizQuestions.length) {
        showQuizResult();
        return;
    }
    
    const question = relationshipData.quizQuestions[currentQuestionIndex];
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('quizOptions');
    
    if (!questionText || !optionsContainer) return;
    
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    quizAnswered = false;
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionElement);
    });
}

function selectAnswer(selectedIndex) {
    if (quizAnswered) return;
    
    quizAnswered = true;
    const question = relationshipData.quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    if (selectedIndex === question.correct) {
        quizScore++;
    }
    
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000);
}

function showQuizResult() {
    const quizQuestion = document.getElementById('quizQuestion');
    const quizResult = document.getElementById('quizResult');
    
    if (quizQuestion && quizResult) {
        quizQuestion.classList.add('hidden');
        quizResult.classList.remove('hidden');
        
        // Update result message based on score
        const resultTitle = quizResult.querySelector('h3');
        if (resultTitle) {
            if (quizScore === relationshipData.quizQuestions.length) {
                resultTitle.textContent = "Perfect! You know us so well! 💕";
            } else if (quizScore >= relationshipData.quizQuestions.length / 2) {
                resultTitle.textContent = "Great job! You know us pretty well! 😊";
            } else {
                resultTitle.textContent = "Not bad! We should talk more about us! 💗";
            }
        }
    }
}

function resetQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswered = false;
    
    const quizQuestion = document.getElementById('quizQuestion');
    const quizResult = document.getElementById('quizResult');
    
    if (quizQuestion && quizResult) {
        quizQuestion.classList.remove('hidden');
        quizResult.classList.add('hidden');
    }
    
    loadQuestion();
}

// Photo Gallery Functions
function setupPhotoGallery() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.dataset.image;
            if (imageSrc) {
                openModal(imageSrc);
            }
        });
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function openModal(imageSrc) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    
    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Love Letter Animation
function animateLoveLetter() {
    const letterParagraphs = document.querySelectorAll('.letter-text p');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    letterParagraphs.forEach((paragraph, index) => {
        paragraph.style.transitionDelay = `${index * 0.3}s`;
        observer.observe(paragraph);
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Animate memory items on scroll
    const memoryItems = document.querySelectorAll('.memory-item');
    memoryItems.forEach((item, index) => {
        observer.observe(item);
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Animate future items on scroll
    const futureItems = document.querySelectorAll('.future-item');
    futureItems.forEach((item, index) => {
        observer.observe(item);
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Add smooth scrolling for any internal links
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

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    }
});

// Add heart animation on click anywhere
document.addEventListener('click', function(e) {
    createClickHeart(e.clientX, e.clientY);
});

function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 9999;
        animation: heartFloat 1s ease-out forwards;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (document.body.contains(heart)) {
            document.body.removeChild(heart);
        }
    }, 1000);
}

// Add CSS for click heart animation
const style = document.createElement('style');
style.textContent = `
    @keyframes heartFloat {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1) translateY(-50px);
        }
    }
`;
document.head.appendChild(style);

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Add typewriter effect to hero title
function typewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let index = 0;
    const timer = setInterval(() => {
        heroTitle.textContent += text[index];
        index++;
        
        if (index === text.length) {
            clearInterval(timer);
        }
    }, 100);
}

// Initialize typewriter effect after a delay
setTimeout(typewriterEffect, 500);

// Make sure reset quiz function is available globally
window.resetQuiz = resetQuiz;
window.openModal = openModal;
window.closeModal = closeModal;