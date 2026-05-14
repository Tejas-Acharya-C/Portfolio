import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Insert GitHub Activity after Projects section (before <section id="about")
github_section = """        <!-- ── GitHub Activity ────────────────────────────────────── -->
        <section id="github" class="container" aria-labelledby="github-heading" style="margin-top: 6rem; margin-bottom: 6rem;">
            <div class="section-heading">
                <p class="text-label reveal">Engineering Consistency</p>
                <h2 class="h2 mt-sm reveal stagger-1" id="github-heading">GitHub Activity & Contributions</h2>
                <p class="body mt-sm reveal stagger-2">Continuous integration and activity reflecting consistent engineering output.</p>
            </div>
            
            <div class="github-grid mt-lg reveal stagger-3 bento-grid-project">
                <div class="project-left">
                    <h3 class="h3">Pinned Repositories</h3>
                    <ul class="impact-list mt-sm">
                        <li><strong>CustomerFeedbackFileAnalyzer:</strong> NLP-powered data ingestion and analytics via FastAPI.</li>
                        <li><strong>Obsidian-Secure:</strong> Secure RBAC REST API and modular Docker orchestration.</li>
                        <li><strong>SpendSense:</strong> AI-powered expense categorization via Telegram.</li>
                    </ul>
                </div>
                <div class="project-right">
                    <h3 class="h3">Recent Focus</h3>
                    <p class="body mt-sm">Actively building scalable inference APIs, designing product-grade React interfaces, and contributing to frontend engineering best practices.</p>
                    <a href="https://github.com/Tejas-Acharya-C" target="_blank" rel="noopener noreferrer" class="btn btn-outline-light mt-md" style="display:inline-flex; align-items:center;">
                        <span class="material-symbols-outlined btn-icon" aria-hidden="true" style="margin-right: 8px;">code</span>
                        View GitHub Profile
                    </a>
                </div>
            </div>
        </section>

"""

# Insert GitHub section right before the About section
content = content.replace('        <!-- ── About ─────────────────────────────────────────────── -->', github_section + '        <!-- ── About ─────────────────────────────────────────────── -->')

# 2. Modify About Sidebar
about_sidebar_old = """                    <!-- Certifications -->
                    <div class="sidebar-card reveal-right stagger-2 mt-md">
                        <h3 class="sidebar-card-title">Certifications</h3>
                        <ul class="looking-list mt-sm">
                            <li>Oracle Cloud Infrastructure 2025 Certified Gen AI Professional</li>
                            <li>Oracle AI Vector Search Certified Professional</li>
                            <li>Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate</li>
                            <li>Data Analysis Using Python (Google / Coursera)</li>
                        </ul>
                    </div>

                    <!-- Hackathons & Awards -->
                    <div class="sidebar-card reveal-right stagger-3 mt-md">
                        <h3 class="sidebar-card-title">Achievements</h3>
                        <ul class="looking-list mt-sm">
                            <li><strong>2nd Prize</strong> — VISIONX Hackathon</li>
                        </ul>
                    </div>"""

about_sidebar_new = """                    <!-- Currently Exploring -->
                    <div class="sidebar-card reveal-right stagger-2 mt-md">
                        <h3 class="sidebar-card-title">Currently Exploring</h3>
                        <div class="stack-tags-row mt-sm">
                            <span class="stack-tag tag-secondary">RAG Pipelines</span>
                            <span class="stack-tag tag-secondary">Vector Search</span>
                            <span class="stack-tag tag-secondary">LLM Orchestration</span>
                            <span class="stack-tag tag-secondary">Scalable Inference APIs</span>
                        </div>
                    </div>

                    <!-- Certifications & Achievements -->
                    <div class="sidebar-card reveal-right stagger-3 mt-md" style="opacity: 0.85;">
                        <h3 class="sidebar-card-title">Certifications</h3>
                        <ul class="looking-list mt-sm" style="font-size: 0.9rem;">
                            <li>Oracle Cloud Infrastructure 2025 Certified Gen AI Professional</li>
                            <li>Oracle AI Vector Search Certified Professional</li>
                            <li>Data Analysis Using Python (Google)</li>
                        </ul>
                        <h3 class="sidebar-card-title mt-md">Achievements</h3>
                        <ul class="looking-list mt-xs" style="font-size: 0.9rem;">
                            <li><strong>2nd Prize</strong> — VISIONX Hackathon</li>
                        </ul>
                    </div>"""
content = content.replace(about_sidebar_old, about_sidebar_new)

# 3. Add Engineering Principles in About Main
about_main_edu = """                    <!-- Education -->
                    <div class="edu-block reveal mt-lg">"""

engineering_principles = """                    <!-- Engineering Principles -->
                    <div class="principles-block reveal mt-lg">
                        <h3 class="h3">Engineering Principles</h3>
                        <ul class="impact-list mt-sm">
                            <li><strong>Clear API Boundaries:</strong> Strict separation of concerns between data processing and transport.</li>
                            <li><strong>Maintainable Frontend Systems:</strong> Modular CSS, robust components, and accessibility by default.</li>
                            <li><strong>Practical AI Integration:</strong> Focused on real-world utility over AI theater.</li>
                            <li><strong>Scalable Architecture:</strong> Container-first deployment and flexible persistence layers.</li>
                        </ul>
                    </div>

"""
content = content.replace(about_main_edu, engineering_principles + about_main_edu)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
