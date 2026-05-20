// Global variables for charts
let progressChart = null;
let studyHoursChart = null;

// Function to get quiz data from localStorage
function getQuizDataFromStorage() {
  const quizResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
  return quizResults.map(result => ({
    date: new Date(result.date).toLocaleDateString(),
    score: result.score,
    hours: result.timeTakenMinutes || 0,
    subject: result.subject,
    difficulty: result.difficulty,
    type: result.type || 'quiz' 
  }));
}

const subjectColor = {
  'JavaScript': '#F7DF1E',
  'HTML': '#E34F26',
  'CSS': '#1572B6',
  'Java': '#B07219',
  'SQL': '#336791'
}

function getSubjectColor(subject) {
  return subjectColor[subject] || '#6c757d'
}
// Convert score to skill level (0–10 scale)
function scoreToSkill(score) {
  return Math.round((score / 100) * 10);
}

// Initialize or update progress chart
function initializeProgressChart() {
  const quizData = getQuizDataFromStorage();

  if (quizData.length === 0) {
    // Show empty state message
    document.getElementById('totalStudyHours').textContent = '0h';
    document.getElementById('averageScore').textContent = '0%';
    document.getElementById('quizzesCompleted').textContent = '0';
    return;
  }

  // Extract labels and data
  const labels = quizData.map(entry => entry.date);
  const skillLevels = quizData.map(entry => scoreToSkill(entry.score));
  const scores = quizData.map(entry => entry.score);

const subjectColorArray = quizData.map(entry => getSubjectColor(entry.subject));
const subjectBorderColorArray = quizData.map(entry => getSubjectColor(entry.subject));

  // Calculate summary statistics
  const totalHours = quizData.reduce((sum, entry) => sum + entry.hours, 0);
  const averageScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  const quizzesCompleted = quizData.length;

  // Update summary displays
  document.getElementById('totalStudyHours').textContent = `${totalHours.toFixed(1)}h`;
  document.getElementById('averageScore').textContent = `${averageScore}%`;
  document.getElementById('quizzesCompleted').textContent = quizzesCompleted;

  // Destroy existing chart if it exists
  if (progressChart) {
    progressChart.destroy();
  }

  // Create progress chart
  const ctx = document.getElementById('progressChart').getContext('2d');
  progressChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Skill Level',
        data: skillLevels,
        borderColor: subjectBorderColorArray,
        backgroundColor: subjectColorArray.map(c => c + '20'),
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: '#0077cc'
      }, {
        label: 'Quiz Score (%)',
        data: scores,
        borderColor: '#28a745',
        backgroundColor: 'rgba(40,167,69,0.1)',
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#28a745',
        yAxisID: 'y1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
          title: {
            display: true,
            text: 'Skill Level'
          }
        },
        y1: {
          beginAtZero: true,
          max: 100,
          position: 'right',
          title: {
            display: true,
            text: 'Quiz Score (%)'
          },
          grid: {
            drawOnChartArea: false,
          }
        },
        x: {
          title: {
            display: true,
            text: 'Quiz Date'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels : {
            usepointStyle: true,
            pointStyle: 'circle',
            padding: 20
          }
        },
         tooltip: {
          mode: 'index',
          intersect: false,
        }
      }
    }
  });

  // Create study hours chart
  initializeStudyHoursChart(quizData, labels);
}

// Initialize study hours chart
function initializeStudyHoursChart(quizData, labels) {
  const studyHours = quizData.map(entry => entry.hours);

  // Destroy existing chart if it exists
  if (studyHoursChart) {
    studyHoursChart.destroy();
  }

  const ctx2 = document.getElementById('studyHoursChart').getContext('2d');
  studyHoursChart = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Study Hours',
        data: studyHours,
        backgroundColor: 'rgba(108, 117, 235, 0.6)',
        borderColor: 'rgba(108, 117, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Hours'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Quiz Date'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

// Function to calculate skill improvement trend
function calculateSkillImprovement() {
  const quizData = getQuizDataFromStorage();

  if (quizData.length < 2) {
    return {
      improvement: 0,
      trend: 'Need more data',
      skillLevel: 'Beginner'
    };
  }

  const recentScores = quizData.slice(-5).map(q => q.score);
  const olderScores = quizData.slice(0, Math.max(1, quizData.length - 5)).map(q => q.score);

  const recentAverage = recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length;
  const olderAverage = olderScores.reduce((sum, score) => sum + score, 0) / olderScores.length;
  const improvement = recentAverage - olderAverage;

  let trend = 'Stable';
  if (improvement > 10) trend = 'Improving significantly';
  else if (improvement > 5) trend = 'Improving';
  else if (improvement < -10) trend = 'Declining';
  else if (improvement < -5) trend = 'Needs improvement';

  const latestScore = quizData[quizData.length - 1].score;
  let skillLevel = 'Beginner';
  if (latestScore >= 90) skillLevel = 'Expert';
  else if (latestScore >= 80) skillLevel = 'Advanced';
  else if (latestScore >= 70) skillLevel = 'Intermediate';
  else if (latestScore >= 60) skillLevel = 'Beginner';

  return {
    improvement: Math.round(improvement),
    trend: trend,
    skillLevel: skillLevel
  };
}

// XP thresholds for level progression (cumulative XP)
const LEVEL_THRESHOLDS = [0, 200, 500, 900, 1400, 2000, 2700, 3500, 4400, 5400, 6500];

// Calculate level from total XP
function xpToLevel(totalXP) {
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
      break;
    }
  }
  return Math.min(level, 10); // Cap at level 10
}

// Calculate progress percentage to next level
function getLevelProgress(totalXP, currentLevel) {
  const currentThreshold = LEVEL_THRESHOLDS[currentLevel - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[currentLevel] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  
  if (currentLevel >= 10) return 100; // Max level
  
  const range = nextThreshold - currentThreshold;
  const progress = totalXP - currentThreshold;
  return Math.min(Math.round((progress / range) * 100), 100);
}

// Calculate total XP from quiz scores (sum of all scores for a subject)
function calculateTotalXP(subjectQuizzes) {
  if (!subjectQuizzes || subjectQuizzes.length === 0) return 0;
  return subjectQuizzes.reduce((sum, quiz) => sum + quiz.score, 0);
}

// Initialize skill tracking with XP-based level system
function initializeSkillTracking() {
  const quizData = getQuizDataFromStorage();

  if (quizData.length === 0) {
// Set default values for new users
     updateSkillDisplay('JavaScript', 1, 0, 0, 0);
     updateSkillDisplay('HTML', 1, 0, 0, 0);
     updateSkillDisplay('CSS', 1, 0, 0, 0);
     updateSkillDisplay('Java', 1, 0, 0, 0);
     updateSkillDisplay('SQL', 1, 0, 0, 0);
     return;
  }

  // Group quiz data by subject
  const subjectData = {};
  quizData.forEach(quiz => {
    if (!subjectData[quiz.subject]) {
      subjectData[quiz.subject] = [];
    }
    subjectData[quiz.subject].push(quiz);
  });

// Update each skill display with XP-based level
   const subjects = ['JavaScript', 'HTML', 'CSS', 'Java', 'SQL'];
   subjects.forEach(subject => {
    const quizzes = subjectData[subject] || [];
    const totalXP = calculateTotalXP(quizzes);
    const level = xpToLevel(totalXP);
    const progress = getLevelProgress(totalXP, level);
    const improvement = calculateSkillImprovementForSubject(quizzes);
    
    updateSkillDisplay(subject, level, totalXP, improvement, progress);
  });
}

function updateSkillDisplay(subject, level, totalXP, improvement, progressPercent) {
   const skillMap = {
     'JavaScript': 'js',
     'HTML': 'html',
     'CSS': 'css',
     'Java': 'java',
     'SQL': 'sql'
   };

  const prefix = skillMap[subject];
  if (!prefix) return;

  // Update level
  const levelElement = document.querySelector(`.${prefix}-level`);
  const levelContainer = levelElement ? levelElement.closest('.skill-level') : null;
  if (levelElement && levelContainer) {
    const currentLevel = parseInt(levelElement.textContent, 10);
    if (level > currentLevel) {
      levelContainer.classList.add('level-up');
      setTimeout(() => levelContainer.classList.remove('level-up'), 1000);
    }
    levelElement.textContent = level;
  }

  // Update points (now showing total XP)
  const pointsElement = document.querySelector(`.${prefix}-points`);
  if (pointsElement) pointsElement.textContent = totalXP + ' XP';

  // Update progress bar based on progress to next level
  const progressBar = document.querySelector(`.${prefix}-progress .skill-progress-bar`);
  if (progressBar) {
    progressBar.style.width = `${progressPercent}%`;
  }

  // Update trend
  const trendElement = document.querySelector(`.${prefix}-trend`);
  if (trendElement) {
    const trendIcon = improvement > 0 ? '📈' : improvement < 0 ? '📉' : '➡️';
    trendElement.textContent = `${trendIcon} ${improvement > 0 ? 'Improving' : improvement < 0 ? 'Declining' : 'Stable'}`;
  }

  // Update improvement percentage
  const improvementElement = document.querySelector(`.${prefix}-improvement`);
  if (improvementElement) {
    const improvementText = improvement > 0 ? `+${improvement}%` : `${improvement}%`;
    improvementElement.textContent = improvementText;
    improvementElement.style.color = improvement > 0 ? '#27ae60' : improvement < 0 ? '#e74c3c' : '#95a5a6';
  }
}

function calculateSkillImprovementForSubject(subjectQuizzes) {
  if (subjectQuizzes.length < 2) return 0;

  const recentScores = subjectQuizzes.slice(-3).map(q => q.score);
  const olderScores = subjectQuizzes.slice(0, -3).map(q => q.score);

  if (olderScores.length === 0) return 0;

  const recentAvg = recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length;
  const olderAvg = olderScores.reduce((sum, score) => sum + score, 0) / olderScores.length;

  return Math.round(recentAvg - olderAvg);
}

// Update personal stats with real data
function initializePersonalStats() {
  const quizData = getQuizDataFromStorage();

  if (quizData.length === 0) {
    document.getElementById('studyStreak').textContent = '0';
    document.getElementById('studySessions').textContent = '0 total sessions this month';
    document.getElementById('studyEfficiency').textContent = '0%';
    return;
  }

  // Calculate study streak (consecutive days with quizzes)
  const today = new Date();
  const streak = calculateStudyStreak(quizData);

  // Update study streak
  document.getElementById('studyStreak').textContent = streak;

  // Update study sessions (this month)
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const sessionsThisMonth = quizData.filter(quiz => new Date(quiz.date) >= thisMonth).length;
  document.getElementById('studySessions').textContent = `${sessionsThisMonth} total sessions this month`;

  // Update study efficiency (average score)
  const averageScore = Math.round(quizData.reduce((sum, quiz) => sum + quiz.score, 0) / quizData.length);
  document.getElementById('studyEfficiency').textContent = `${averageScore}%`;
}

function calculateStudyStreak(quizData) {
  if (quizData.length === 0) return 0;

  // Sort by date descending
  const sortedQuizzes = quizData.sort((a, b) => new Date(b.date) - new Date(a.date));

  let streak = 0;
  let currentDate = new Date();

  for (const quiz of sortedQuizzes) {
    const quizDate = new Date(quiz.date);

    // Check if this quiz was taken today or yesterday
    const daysDiff = Math.floor((currentDate - quizDate) / (1000 * 60 * 60 * 24));

    if (daysDiff <= streak) {
      streak++;
      currentDate = quizDate;
    } else {
      break;
    }
  }

  return streak;
}

// Function to refresh charts when new quiz data is available
function refreshProgressChart() {
  console.log('Refreshing progress chart with new data...');
  initializeProgressChart();
  initializeSkillTracking();
  initializePersonalStats();
}
// Logout functionality (placeholder)
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.href="index.html";
});
// Smooth scroll for sidebar links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// Profile picture upload handling for sidebarIcon
const sidebarIcon = document.getElementById('sidebarIcon');
const sidebarIconInput = document.getElementById('sidebarIconInput');
const sidebarIconDropdown = document.getElementById('sidebarIconDropdown');
const replaceImageBtn = document.getElementById('replaceImageBtn');
const removeImageBtn = document.getElementById('removeImageBtn');

// Profile picture upload handling for mobileSidebarIcon
const mobileSidebarIcon = document.getElementById('mobileSidebarIcon');
const mobileSidebarIconInput = document.getElementById('mobileSidebarIconInput');
const mobileSidebarIconDropdown = document.getElementById('mobileSidebarIconDropdown');
const mobileReplaceImageBtn = document.getElementById('mobileReplaceImageBtn');
const mobileRemoveImageBtn = document.getElementById('mobileRemoveImageBtn');

if (sidebarIcon && sidebarIconDropdown && replaceImageBtn && removeImageBtn) {
    sidebarIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebarIconDropdown.classList.toggle('hidden');
    });

    // Prevent the file input from triggering when clicking the icon
    sidebarIconInput.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebarIcon.contains(e.target) && !sidebarIconDropdown.contains(e.target)) {
            sidebarIconDropdown.classList.add('hidden');
        }
    });

    // Prevent dropdown from closing when clicking inside it
    sidebarIconDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    replaceImageBtn.addEventListener('click', () => {
        sidebarIconInput.click();
        sidebarIconDropdown.classList.add('hidden');
    });

    removeImageBtn.addEventListener('click', () => {
        const defaultIcon = 'https://placehold.co/50x50/ffffff/000000?text=UD';
        sidebarIcon.src = defaultIcon;
        if (mobileSidebarIcon) mobileSidebarIcon.src = defaultIcon;
        localStorage.removeItem('sidebarIcon');
        sidebarIconDropdown.classList.add('hidden');
    });


    sidebarIconInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                sidebarIcon.src = e.target.result;
                if (mobileSidebarIcon) mobileSidebarIcon.src = e.target.result;
                localStorage.setItem('sidebarIcon', e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
    });
}

// Logout button handling for mobileLogoutBtn
const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener('click', () => {
        window.location.href = "login.html";
    });
}

if (mobileSidebarIcon && mobileSidebarIconInput && mobileSidebarIconDropdown && mobileReplaceImageBtn && mobileRemoveImageBtn) {
    mobileSidebarIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileSidebarIconDropdown.classList.toggle('hidden');
    });

    // Prevent the file input from triggering when clicking the icon
    mobileSidebarIconInput.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileSidebarIcon.contains(e.target) && !mobileSidebarIconDropdown.contains(e.target)) {
            mobileSidebarIconDropdown.classList.add('hidden');
        }
    });

    // Prevent dropdown from closing when clicking inside it
    mobileSidebarIconDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    mobileReplaceImageBtn.addEventListener('click', () => {
        mobileSidebarIconInput.click();
        mobileSidebarIconDropdown.classList.add('hidden');
    });

    mobileRemoveImageBtn.addEventListener('click', () => {
        const defaultIcon = 'https://placehold.co/50x50/ffffff/000000?text=UD';
        mobileSidebarIcon.src = defaultIcon;
        if (sidebarIcon) sidebarIcon.src = defaultIcon;
        localStorage.removeItem('sidebarIcon');
        mobileSidebarIconDropdown.classList.add('hidden');
    });

    mobileSidebarIconInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                mobileSidebarIcon.src = e.target.result;
                if (sidebarIcon) sidebarIcon.src = e.target.result;
                localStorage.setItem('sidebarIcon', e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
    });
}

// Function to load saved images from localStorage
function loadSavedImages() {
    const savedSidebarIcon = localStorage.getItem('sidebarIcon');
    if (savedSidebarIcon) {
        if (sidebarIcon) sidebarIcon.src = savedSidebarIcon;
        if (mobileSidebarIcon) mobileSidebarIcon.src = savedSidebarIcon;
    }
}

// Function to sync images across responsive breakpoints
function syncImagesAcrossBreakpoints() {
    const savedSidebarIcon = localStorage.getItem('sidebarIcon');
    if (savedSidebarIcon) {
        // Update all icon elements when responsive breakpoint changes
        const allIcons = document.querySelectorAll('#sidebarIcon, #mobileSidebarIcon');
        allIcons.forEach(icon => {
            if (icon) icon.src = savedSidebarIcon;
        });
    }
}

// Listen for window resize to sync images when switching breakpoints
window.addEventListener('resize', syncImagesAcrossBreakpoints);

// Also sync on orientation change for mobile devices
window.addEventListener('orientationchange', () => {
    setTimeout(syncImagesAcrossBreakpoints, 100);
});

// Load saved images on page load
loadSavedImages();

// Account activity tracking
class AccountActivityTracker {
  constructor() {
    this.sessionStartTime = null;
    this.totalActiveTime = 0;
    this.isTracking = false;
    this.activityEvents = [];
    this.loadActivityData();
    this.startTracking();
  }

  loadActivityData() {
    // Load existing activity data from localStorage
    this.totalActiveTime = parseInt(localStorage.getItem('totalActiveTime') || '0');
    this.activityEvents = JSON.parse(localStorage.getItem('activityEvents') || '[]');

    // Update display
    this.updateActiveTimeDisplay();
  }

  startTracking() {
    if (this.isTracking) return;

    this.sessionStartTime = new Date();
    this.isTracking = true;

    // Track user activity events
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach(event => {
      document.addEventListener(event, () => this.recordActivity(), true);
    });

    // Track when page becomes visible/invisible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseTracking();
      } else {
        this.resumeTracking();
      }
    });

    console.log('Account activity tracking started');
  }

  recordActivity() {
    const now = new Date();
    this.activityEvents.push({
      timestamp: now.toISOString(),
      type: 'user_activity',
      sessionTime: this.getCurrentSessionTime()
    });

    // Keep only last 1000 events to prevent localStorage bloat
    if (this.activityEvents.length > 1000) {
      this.activityEvents = this.activityEvents.slice(-1000);
    }
  }

  pauseTracking() {
    if (!this.isTracking || !this.sessionStartTime) return;

    const sessionTime = new Date() - this.sessionStartTime;
    this.totalActiveTime += sessionTime;
    this.saveActivityData();

    this.isTracking = false;
    console.log(`Paused tracking. Session time: ${Math.round(sessionTime / 1000)}s`);
  }

  resumeTracking() {
    if (this.isTracking) return;

    this.sessionStartTime = new Date();
    this.isTracking = true;
    console.log('Resumed activity tracking');
  }

  getCurrentSessionTime() {
    if (!this.sessionStartTime || !this.isTracking) return 0;
    return new Date() - this.sessionStartTime;
  }

  getTotalActiveTime() {
    let total = this.totalActiveTime;
    if (this.isTracking && this.sessionStartTime) {
      total += new Date() - this.sessionStartTime;
    }
    return total;
  }

  saveActivityData() {
    localStorage.setItem('totalActiveTime', this.totalActiveTime.toString());
    localStorage.setItem('activityEvents', JSON.stringify(this.activityEvents));
  }

  updateActiveTimeDisplay() {
    const totalMs = this.getTotalActiveTime();
    const hours = Math.floor(totalMs / (1000 * 60 * 60));
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));

    // Update the study hours display if element exists
    const studyHoursElement = document.getElementById('totalStudyHours');
    if (studyHoursElement) {
      studyHoursElement.textContent = `${hours}h ${minutes}m`;
    }

    // Also update the original studyHours element if it exists
    const originalStudyHoursElement = document.getElementById('studyHours');
    if (originalStudyHoursElement) {
      originalStudyHoursElement.textContent = Math.floor(totalMs / (1000 * 60 * 60));
    }
  }

  getStudyEfficiency() {
    const quizData = getQuizDataFromStorage();
    if (quizData.length === 0) return 0;

    const totalQuizTime = quizData.reduce((sum, quiz) => sum + (quiz.timeTakenMinutes || 0), 0);
    const totalActiveTimeHours = this.getTotalActiveTime() / (1000 * 60 * 60);

    if (totalActiveTimeHours === 0) return 0;

    // Efficiency is quiz time as percentage of active time
    return Math.round((totalQuizTime / totalActiveTimeHours) * 100);
  }

  getWeeklyActivity() {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return this.activityEvents.filter(event => {
      const eventDate = new Date(event.timestamp);
      return eventDate >= weekAgo;
    });
  }
}

// Initialize account activity tracker
let activityTracker = null;

// Function to initialize account activity tracking
function initializeAccountActivity() {
  activityTracker = new AccountActivityTracker();

  // Update display every minute
  setInterval(() => {
    if (activityTracker) {
      activityTracker.updateActiveTimeDisplay();

      // Also update study efficiency if we have quiz data
      const efficiency = activityTracker.getStudyEfficiency();
      const efficiencyElement = document.getElementById('studyEfficiency');
      if (efficiencyElement && efficiency > 0) {
        efficiencyElement.textContent = `${efficiency}%`;
      }
    }
  }, 60000);
}

// Expose refresh function globally for quiz pages to call
window.refreshProgressChart = refreshProgressChart;