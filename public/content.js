// Create and inject the subtitle viewer
const createSubtitleViewer = () => {
  const viewer = document.createElement('div');
  viewer.id = 'subtitle-viewer';
  viewer.innerHTML = `
    <div class="subtitle-container">
      <div class="controls">
        <input type="file" id="srt-file" accept=".srt" />
        <button id="speak-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v12M6 12h12"/></svg>
        </button>
      </div>
      <div id="subtitle-text"></div>
    </div>
  `;
  document.body.appendChild(viewer);
  
  // Initialize subtitle handling
  initializeSubtitleHandling();
};

// Parse SRT file content
const parseSRT = (content) => {
  const subtitles = [];
  const blocks = content.trim().split('\n\n');
  
  blocks.forEach(block => {
    const lines = block.split('\n');
    if (lines.length >= 3) {
      const timeMatch = lines[1].match(/(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/);
      if (timeMatch) {
        subtitles.push({
          start: timeMatch[1],
          end: timeMatch[2],
          text: lines.slice(2).join(' ')
        });
      }
    }
  });
  
  return subtitles;
};

// Initialize subtitle handling
const initializeSubtitleHandling = () => {
  const fileInput = document.getElementById('srt-file');
  const subtitleText = document.getElementById('subtitle-text');
  const speakButton = document.getElementById('speak-button');
  
  let subtitles = [];
  let currentSubtitle = null;
  
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        subtitles = parseSRT(e.target.result);
        if (subtitles.length > 0) {
          displaySubtitle(subtitles[0]);
        }
      };
      reader.readAsText(file);
    }
  });
  
  speakButton.addEventListener('click', () => {
    if (currentSubtitle) {
      speak(currentSubtitle.text);
    }
  });
  
  const displaySubtitle = (subtitle) => {
    currentSubtitle = subtitle;
    subtitleText.textContent = subtitle.text;
  };
  
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', createSubtitleViewer);