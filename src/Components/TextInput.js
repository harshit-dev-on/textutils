import React, { useState, useEffect } from 'react';

export default function TextInput() {
  // Initialize state from localStorage so that values persist across unmounts/reloads
  const [text, setText] = useState(() => {
    return localStorage.getItem('savedText') || '';
  });
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState(() => {
    return localStorage.getItem('savedFileName') || 'untitled';
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('savedText', text);
  }, [text]);

  useEffect(() => {
    localStorage.setItem('savedFileName', fileName);
  }, [fileName]);

  const handleUpClick = () => {
    setText(text.toUpperCase());
  };

  const handleLoClick = () => {
    setText(text.toLowerCase());
  };

  const handleClearClick = () => {
    setText('');
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const triggerCopiedState = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const fallbackCopy = (textToCopy) => {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed"; // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      triggerCopiedState();
    } catch (err) {
      alert("Failed to copy text automatically. Please select all and copy manually.");
    }
    document.body.removeChild(textArea);
  };

  const handleCopy = () => {
    const textToCopy = text;
    // navigator.clipboard is only available in secure contexts (HTTPS or localhost)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => triggerCopiedState())
        .catch(() => fallbackCopy(textToCopy));
    } else {
      fallbackCopy(textToCopy);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${fileName || "untitled"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExtraSpaces = () => {
    let newText = text.split('\n').map(line => line.replace(/\s+/g, ' ').trim()).join('\n');
    setText(newText);
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      let msg = new SpeechSynthesisUtterance();
      msg.text = text;
      msg.onend = () => setIsSpeaking(false);
      msg.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(msg);
      setIsSpeaking(true);
    }
  };

  const handleTitleCase = () => {
    let newText = text.replace(/\b\w+/g, (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    setText(newText);
  };

  const handleSentenceCase = () => {
    let newText = text.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (match, separator, char) => {
      return separator + char.toUpperCase();
    });
    setText(newText);
  };

  const handleFindReplace = () => {
    let find = prompt("Enter text to find:");
    if (!find) return;
    let replace = prompt("Enter text to replace with:");
    if (replace === null) return;
    let newText = text.replaceAll(find, replace);
    setText(newText);
  };

  const handleExtractNumbers = () => {
    let numbers = text.match(/\d+/g);
    if (numbers) {
      setText(numbers.join(" "));
    } else {
      alert("No numbers found in the text!");
    }
  };

  const handleBase64Encode = () => {
    try {
      let encoded = btoa(unescape(encodeURIComponent(text)));
      setText(encoded);
    } catch (e) {
      alert("Failed to encode text to Base64!");
    }
  };

  const handleBase64Decode = () => {
    try {
      let decoded = decodeURIComponent(escape(atob(text)));
      setText(decoded);
    } catch (e) {
      alert("Failed to decode Base64! Please make sure input is a valid Base64 string.");
    }
  };

  // Filter empty elements to get accurate word count
  const words = text.split(/\s+/).filter((element) => element.length !== 0).length;

  return (
    <div className="mb-3">
      <h2>Enter the text to analyze</h2>
      <div className="editor-window mb-3">
        <div className="editor-header">
          <div className="d-flex align-items-center">
            <input 
              type="text" 
              className="editor-title-input" 
              value={fileName} 
              onChange={(e) => setFileName(e.target.value.replace(/\./g, ''))} 
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.target.blur();
                }
              }}
              placeholder="untitled"
              title="Click to rename file"
              size={fileName.length || 8}
            /><span className="editor-ext">.txt</span>
          </div>
          <div className="editor-actions">
            {/* Speak Button */}
            <button 
              disabled={text.length === 0} 
              className="header-action-btn" 
              onClick={handleSpeak}
              title={isSpeaking ? "Stop speaking" : "Speak text"}
            >
              {isSpeaking ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              )}
            </button>
            {/* Download Button */}
            <button 
              disabled={text.length === 0} 
              className="header-action-btn" 
              onClick={handleDownload}
              title="Download text file"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
            {/* Copy Button */}
            <button 
              disabled={text.length === 0} 
              className="header-action-btn" 
              onClick={handleCopy}
              title={copied ? "Copied!" : "Copy to clipboard"}
            >
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-success">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
              )}
            </button>
          </div>
        </div>
        <textarea 
          className="form-control editor-textarea" 
          id="exampleFormControlTextarea1" 
          rows="10" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here to analyze..."
        ></textarea>
      </div>

      <div className="my-4">
        <div className="row g-4">
          {/* Group 1: Case Formatting */}
          <div className="col-md-6 col-lg-3">
            <h6 className="mb-3 text-muted text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Case Formatting</h6>
            <div className="d-flex flex-column gap-2">
              <button disabled={text.length === 0} className="btn btn-primary btn-sm text-start" onClick={handleUpClick}>UPPERCASE</button>
              <button disabled={text.length === 0} className="btn btn-primary btn-sm text-start" onClick={handleLoClick}>lowercase</button>
              <button disabled={text.length === 0} className="btn btn-primary btn-sm text-start" onClick={handleSentenceCase}>Sentence Case</button>
              <button disabled={text.length === 0} className="btn btn-primary btn-sm text-start" onClick={handleTitleCase}>Title Case</button>
            </div>
          </div>

          {/* Group 2: Text Processing */}
          <div className="col-md-6 col-lg-3">
            <h6 className="mb-3 text-muted text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Text Processing</h6>
            <div className="d-flex flex-column gap-2">
              <button disabled={text.length === 0} className="btn btn-info btn-sm text-dark text-start" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
              <button disabled={text.length === 0} className="btn btn-info btn-sm text-dark text-start" onClick={handleFindReplace}>Find & Replace</button>
              <button disabled={text.length === 0} className="btn btn-info btn-sm text-dark text-start" onClick={handleExtractNumbers}>Extract Numbers</button>
            </div>
          </div>

          {/* Group 3: Developer Tools */}
          <div className="col-md-6 col-lg-3">
            <h6 className="mb-3 text-muted text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Developer Tools</h6>
            <div className="d-flex flex-column gap-2">
              <button disabled={text.length === 0} className="btn btn-secondary btn-sm text-start" onClick={handleBase64Encode}>Base64 Encode</button>
              <button disabled={text.length === 0} className="btn btn-secondary btn-sm text-start" onClick={handleBase64Decode}>Base64 Decode</button>
            </div>
          </div>

          {/* Group 4: Quick Actions */}
          <div className="col-md-6 col-lg-3">
            <h6 className="mb-3 text-muted text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Quick Actions</h6>
            <div className="d-flex flex-column gap-2">
              <button disabled={text.length === 0} className="btn btn-danger btn-sm text-start" onClick={handleClearClick}>Clear Text</button>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-4">Your text summary</h3>
      <p>{words} words and {text.length} characters</p>
      <p>{(0.008 * words).toFixed(3)} Minutes read</p>
      
      <h3 className="mt-4">Preview</h3>
      <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
    </div>
  )
}
