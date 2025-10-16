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
    difficulty: result.difficulty
  }));
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
        borderColor: '#0077cc',
        backgroundColor: 'rgba(0,119,204,0.1)',
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

// Initialize skill tracking with real data
function initializeSkillTracking() {
  const quizData = getQuizDataFromStorage();

  if (quizData.length === 0) {
    // Set default values for new users
    updateSkillDisplay('JavaScript', 1, 0, 0);
    updateSkillDisplay('HTML', 1, 0, 0);
    updateSkillDisplay('CSS', 1, 0, 0);
    updateSkillDisplay('Java', 1, 0, 0);
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

  // Update each skill display
  updateSkillDisplay('JavaScript',
    scoreToSkill(subjectData.JavaScript ? subjectData.JavaScript[subjectData.JavaScript.length - 1].score : 0),
    subjectData.JavaScript ? subjectData.JavaScript.length * 10 : 0,
    calculateSkillImprovementForSubject(subjectData.JavaScript || [])
  );
  updateSkillDisplay('HTML',
    scoreToSkill(subjectData.HTML ? subjectData.HTML[subjectData.HTML.length - 1].score : 0),
    subjectData.HTML ? subjectData.HTML.length * 10 : 0,
    calculateSkillImprovementForSubject(subjectData.HTML || [])
  );
  updateSkillDisplay('CSS',
    scoreToSkill(subjectData.CSS ? subjectData.CSS[subjectData.CSS.length - 1].score : 0),
    subjectData.CSS ? subjectData.CSS.length * 10 : 0,
    calculateSkillImprovementForSubject(subjectData.CSS || [])
  );
  updateSkillDisplay('Java',
    scoreToSkill(subjectData.Java ? subjectData.Java[subjectData.Java.length - 1].score : 0),
    subjectData.Java ? subjectData.Java.length * 10 : 0,
    calculateSkillImprovementForSubject(subjectData.Java || [])
  );
}

function updateSkillDisplay(subject, level, points, improvement) {
  const skillMap = {
    'JavaScript': 'js',
    'HTML': 'html',
    'CSS': 'css',
    'Java': 'java'
  };

  const prefix = skillMap[subject];
  if (!prefix) return;

  // Update level
  const levelElement = document.querySelector(`.${prefix}-level`);
  if (levelElement) levelElement.textContent = level;

  // Update points
  const pointsElement = document.querySelector(`.${prefix}-points`);
  if (pointsElement) pointsElement.textContent = points;

  // Update progress bar
  const progressElement = document.querySelector(`.${prefix}-progress`);
  if (progressElement) {
    const progressBar = progressElement.querySelector('.skill-progress-bar');
    if (progressBar) {
      const width = Math.min((points / 100) * 100, 100); // Max 100%
      progressBar.style.width = `${width}%`;
    }
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

    // Color coding
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

sidebarIcon.addEventListener('click', () => {
    sidebarIconInput.click();
});

sidebarIconInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            sidebarIcon.src = e.target.result;
            localStorage.setItem('sidebarIcon', e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a valid image file.');
    }
});

// Logout button handling for mobileLogoutBtn
const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener('click', () => {
        window.location.href = "login.html";
    });
}

// Profile picture upload handling for mobileSidebarIcon
const mobileSidebarIcon = document.getElementById('mobileSidebarIcon');
const mobileSidebarIconInput = document.getElementById('mobileSidebarIconInput');

if (mobileSidebarIcon && mobileSidebarIconInput) {
    mobileSidebarIcon.addEventListener('click', () => {
        mobileSidebarIconInput.click();
    });

    mobileSidebarIconInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                mobileSidebarIcon.src = e.target.result;
                localStorage.setItem('mobileSidebarIcon', e.target.result);
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
        sidebarIcon.src = savedSidebarIcon;
    }
    const savedMobileSidebarIcon = localStorage.getItem('mobileSidebarIcon');
    if (savedMobileSidebarIcon) {
        mobileSidebarIcon.src = savedMobileSidebarIcon;
    }
}

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