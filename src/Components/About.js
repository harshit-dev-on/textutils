import React from 'react';

export default function About() {
    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">About TextUtils</h1>
                <p className="lead text-muted">A minimalist, premium, and feature-rich text utility platform.</p>
            </div>

            <div className="row g-4">
                {/* Card 1: What is TextUtils */}
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm border-secondary-subtle">
                        <div className="card-body p-4">
                            <h4 className="card-title fw-semibold mb-3">Analyze Your Text</h4>
                            <p className="card-text text-muted">
                                TextUtils is an interactive web-based text analysis tool designed to help you manipulate, inspect, and format text seamlessly. Whether you need to count words, estimate reading time, clean up extra spacing, or analyze characters, TextUtils has you covered.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 2: Features */}
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm border-secondary-subtle">
                        <div className="card-body p-4">
                            <h4 className="card-title fw-semibold mb-3">Key Features</h4>
                            <ul className="text-muted ps-3">
                                <li className="mb-2"><strong>Case Formatting:</strong> Convert text to UPPERCASE, lowercase, Title Case, or Sentence Case instantly.</li>
                                <li className="mb-2"><strong>Text Cleansing:</strong> Easily strip out duplicate white spaces and clean formatting.</li>
                                <li className="mb-2"><strong>Speech Synthesis:</strong> Listen to your text read aloud with our high-quality TTS engine.</li>
                                <li className="mb-2"><strong>Developer Tools:</strong> Encode and decode Base64 strings or parse digits quickly.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Card 3: Free to Use */}
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm border-secondary-subtle">
                        <div className="card-body p-4">
                            <h4 className="card-title fw-semibold mb-3">Free &amp; Secure</h4>
                            <p className="card-text text-muted">
                                TextUtils is completely free to use. All operations are run locally in your web browser—no data is sent to external servers or databases. Your text remains private and secure on your local machine.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 4: Compatibility */}
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm border-secondary-subtle">
                        <div className="card-body p-4">
                            <h4 className="card-title fw-semibold mb-3">Browser Compatibility</h4>
                            <p className="card-text text-muted">
                                Built with modern React and Bootstrap, this application is fully responsive. It works flawlessly across all devices and web browsers, including Chrome, Safari, Firefox, Opera, and Microsoft Edge, with complete support for mobile screens and dark mode.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
