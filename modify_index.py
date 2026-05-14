import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Hero edits
content = content.replace(
    '<p class="hero-subtitle animate-in delay-2 mt-sm">\n                    AI/ML Engineer · Frontend Product Developer · Builder of Intelligent Web Systems\n                </p>',
    '<p class="hero-subtitle animate-in delay-2 mt-sm">\n                    NLP Systems · AI-Enabled Web Applications · Frontend Engineering\n                </p>'
)

content = content.replace(
    '<p class="body animate-in delay-2 mt-md hero-text-max">\n                    I am an engineer focused on the intersection of applied artificial intelligence and premium frontend product development. I build robust NLP systems, secure backend architectures, and technically grounded web applications designed for scale and clarity.\n                </p>',
    '<p class="body animate-in delay-2 mt-md hero-text-max">\n                    I build AI-enabled web applications and production-ready NLP systems. Focused on clean frontend architecture, secure APIs, and product-grade engineering.\n                </p>'
)

content = content.replace(
    '''                <!-- Quick-scan stack summary -->
                <div class="hero-stack animate-in delay-3 mt-lg" aria-label="Primary technologies">
                    <span class="stack-tag">Python & PyTorch</span>
                    <span class="stack-tag">Scikit-learn</span>
                    <span class="stack-tag">FastAPI</span>
                    <span class="stack-tag">React & TS</span>
                    <span class="stack-tag">PostgreSQL</span>
                    <span class="stack-tag">Docker</span>
                </div>''',
    '''                <!-- Quick-scan stack summary -->
                <div class="hero-stack animate-in delay-3 mt-lg" aria-label="Primary technologies">
                    <span class="stack-tag">Python & NLP</span>
                    <span class="stack-tag">FastAPI</span>
                    <span class="stack-tag">React & TypeScript</span>
                    <span class="stack-tag">Docker</span>
                </div>'''
)

# Project 1 edits
p1_links_old = '''                                <a href="https://github.com/Tejas-Acharya-C/CustomerFeedbackFileAnalyzer" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="GitHub repository">
                                    <span class="material-symbols-outlined" aria-hidden="true">code</span>
                                    GitHub
                                </a>'''
p1_links_new = '''                                <a href="https://github.com/Tejas-Acharya-C/CustomerFeedbackFileAnalyzer" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="GitHub repository">
                                    <span class="material-symbols-outlined" aria-hidden="true">code</span>
                                    GitHub
                                </a>
                                <a href="https://customer-feedback-demo.vercel.app" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Live Demo">
                                    <span class="material-symbols-outlined" aria-hidden="true">open_in_new</span>
                                    Live Demo
                                </a>'''
content = content.replace(p1_links_old, p1_links_new)

p1_left_old = '''                            <div class="project-section">
                                <h4 class="project-section-title">Overview</h4>
                                <p>An NLP-powered analytics platform that automates sentiment analysis, keyword extraction, and customer feedback categorization from CSV and Excel data streams.</p>
                            </div>
                            <div class="project-section">
                                <h4 class="project-section-title">Problem</h4>
                                <p>Processing large volumes of unstructured customer feedback manually is inefficient and prone to bias. The goal was to build a robust file ingestion workflow that could automatically classify sentiments and extract actionable insights at scale.</p>
                            </div>
                            <div class="project-section">
                                <h4 class="project-section-title">Learnings</h4>
                                <p>Handling large-scale datasets required optimizing the pandas processing pipelines and ensuring the FastAPI backend could asynchronously process file uploads without blocking the main event loop. Connecting the Scikit-learn classification directly to a responsive React dashboard reinforced the value of a clean API contract.</p>
                            </div>'''
p1_left_new = '''                            <div class="project-section">
                                <h4 class="project-section-title">Overview</h4>
                                <p>An NLP-powered analytics platform automating sentiment analysis and categorization for unstructured feedback data streams.</p>
                            </div>
                            <div class="project-section mt-sm">
                                <h4 class="project-section-title">Architecture</h4>
                                <div class="architecture-flow mt-xs">
                                    <span class="arch-node">React UI</span>
                                    <span class="material-symbols-outlined arch-arrow" aria-hidden="true">arrow_downward</span>
                                    <span class="arch-node">FastAPI Layer</span>
                                    <span class="material-symbols-outlined arch-arrow" aria-hidden="true">arrow_downward</span>
                                    <span class="arch-node">NLP Pipeline & Scikit-learn</span>
                                    <span class="material-symbols-outlined arch-arrow" aria-hidden="true">arrow_downward</span>
                                    <span class="arch-node">Analytics Dashboard</span>
                                </div>
                            </div>
                            <div class="project-section mt-sm">
                                <h4 class="project-section-title">Deployment Notes</h4>
                                <ul class="deployment-list mt-xs">
                                    <li>Dockerized deployment</li>
                                    <li>Asynchronous file ingestion</li>
                                    <li>Environment-based configs</li>
                                </ul>
                            </div>'''
content = content.replace(p1_left_old, p1_left_new)

p1_right_old = '''                            <div class="project-section">
                                <h4 class="project-section-title">Architecture & Decisions</h4>
                                <ul class="project-bullets">
                                    <li>Implemented a modular FastAPI backend to manage file ingestion and serve NLP processing pipelines efficiently.</li>
                                    <li>Utilized Scikit-learn for text classification and automated sentiment analysis, structured for extensible dataset handling.</li>
                                    <li>Built a responsive React and Tailwind CSS frontend dashboard to visualize extracted metrics and categorization results in real time.</li>
                                    <li>Maintained strict separation of concerns between data processing layers and API transport.</li>
                                </ul>
                            </div>'''
p1_right_new = '''                            <div class="project-section">
                                <h4 class="project-section-title">Engineering Details</h4>
                                <ul class="project-bullets mt-xs">
                                    <li>Modular FastAPI backend for efficient non-blocking file ingestion.</li>
                                    <li>Scikit-learn text classification structured for extensible dataset handling.</li>
                                    <li>Responsive React dashboard for real-time metric visualization.</li>
                                    <li>Strict separation of concerns between processing and API transport.</li>
                                </ul>
                            </div>'''
content = content.replace(p1_right_old, p1_right_new)

# Project 2 edits
p2_links_old = '''                                <a href="https://github.com/Tejas-Acharya-C/Obsidian-Secure" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="GitHub repository">
                                    <span class="material-symbols-outlined" aria-hidden="true">code</span>
                                    GitHub
                                </a>'''
p2_links_new = '''                                <a href="https://github.com/Tejas-Acharya-C/Obsidian-Secure" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="GitHub repository">
                                    <span class="material-symbols-outlined" aria-hidden="true">code</span>
                                    GitHub
                                </a>
                                <a href="https://obsidian-secure-demo.vercel.app" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Live Demo">
                                    <span class="material-symbols-outlined" aria-hidden="true">open_in_new</span>
                                    Live Demo
                                </a>'''
content = content.replace(p2_links_old, p2_links_new)

p2_left_old = '''                            <div class="project-section">
                                <h4 class="project-section-title">Overview</h4>
                                <p>A secure full-stack application demonstrating robust authentication, authorization, and modular deployment via Docker containers.</p>
                            </div>
                            <div class="project-section">
                                <h4 class="project-section-title">Problem</h4>
                                <p>Modern web applications require strict access controls and standardized deployment environments. The objective was to design a system with role-based access control (RBAC), protected REST APIs, and a consistent, isolated infrastructure.</p>
                            </div>
                            <div class="project-section">
                                <h4 class="project-section-title">Learnings</h4>
                                <p>Implementing JWT-based RBAC highlighted the complexities of token lifecycle management. Designing validation middleware enforced strict input sanitization, while Dockerizing the full stack ensured total parity between development and production environments.</p>
                            </div>'''
p2_left_new = '''                            <div class="project-section">
                                <h4 class="project-section-title">Overview</h4>
                                <p>A secure full-stack application demonstrating robust RBAC, protected APIs, and modular container deployment.</p>
                            </div>
                            <div class="project-section mt-sm">
                                <h4 class="project-section-title">Architecture</h4>
                                <div class="architecture-flow mt-xs">
                                    <span class="arch-node">React UI</span>
                                    <span class="material-symbols-outlined arch-arrow" aria-hidden="true">arrow_downward</span>
                                    <span class="arch-node">JWT Authentication</span>
                                    <span class="material-symbols-outlined arch-arrow" aria-hidden="true">arrow_downward</span>
                                    <span class="arch-node">FastAPI REST APIs</span>
                                    <span class="material-symbols-outlined arch-arrow" aria-hidden="true">arrow_downward</span>
                                    <span class="arch-node">MongoDB & Docker</span>
                                </div>
                            </div>
                            <div class="project-section mt-sm">
                                <h4 class="project-section-title">Deployment Notes</h4>
                                <ul class="deployment-list mt-xs">
                                    <li>Modular containerized services</li>
                                    <li>API validation middleware</li>
                                    <li>JWT lifecycle handling</li>
                                </ul>
                            </div>'''
content = content.replace(p2_left_old, p2_left_new)

p2_right_old = '''                            <div class="project-section">
                                <h4 class="project-section-title">Architecture & Decisions</h4>
                                <ul class="project-bullets">
                                    <li>Designed a scalable backend structure utilizing FastAPI for performant REST APIs and MongoDB for flexible data persistence.</li>
                                    <li>Implemented JWT authentication and custom validation middleware for secure endpoint access.</li>
                                    <li>Established clear backend/frontend separation, enabling the React application to consume APIs agnostically.</li>
                                    <li>Orchestrated the entire stack using Docker, guaranteeing deployment consistency.</li>
                                </ul>
                            </div>'''
p2_right_new = '''                            <div class="project-section">
                                <h4 class="project-section-title">Engineering Details</h4>
                                <ul class="project-bullets mt-xs">
                                    <li>Scalable FastAPI backend structure with MongoDB for flexible persistence.</li>
                                    <li>JWT authentication with custom validation middleware.</li>
                                    <li>Agnostic API consumption layer in React.</li>
                                    <li>Full-stack Docker orchestration for guaranteed parity.</li>
                                </ul>
                            </div>'''
content = content.replace(p2_right_old, p2_right_new)

# Footer edits
footer_old = '''            <div>
                <p class="footer-copy">Tejas Acharya C · AI/ML & Frontend Engineer</p>
                <p class="dim footer-sub mt-xs">Built with precision. Engineered for scale.</p>
            </div>'''
footer_new = '''            <div>
                <p class="footer-copy">Tejas Acharya C</p>
                <p class="dim footer-sub mt-xs">AI/ML & Frontend Engineer<br>Bengaluru, India</p>
            </div>'''
content = content.replace(footer_old, footer_new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
