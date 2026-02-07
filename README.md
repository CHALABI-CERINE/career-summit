# 🎓 Career Summit

A comprehensive web platform for career development events, featuring registration, speaker profiles, and event management with Google Apps Script integration.

## 🌟 Overview

Career Summit is a full-featured event website designed for career fairs, professional development summits, and networking events. It includes interactive forms, speaker showcases, and automated data management.

## ✨ Key Features

- **Event Registration**: Streamlined registration process
- **Speaker Profiles**: Showcase event speakers and their expertise
- **Google Sheets Integration**: Automatic data collection via Google Apps Script
- **Responsive Design**: Optimized for all devices
- **Interactive UI**: Engaging user experience with dynamic content
- **Custom Domain**: Hosted on custom domain via CNAME

## 🏗️ Project Structure

```
career-summit/
├── index.html                      # Main event page (84KB)
├── script.js                       # Frontend interactivity (27KB)
├── style.css                       # Custom styling (8KB)
├── google-apps-script_Version4.js  # Backend integration (13KB)
├── CNAME                           # Custom domain configuration
└── img/                            # Event images and assets
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend Integration**: Google Apps Script
- **Hosting**: GitHub Pages with custom domain
- **Data Storage**: Google Sheets
- **Language Distribution**: 70.1% HTML, 20.4% JavaScript, 9.5% CSS

## 🚀 Getting Started

### Local Development

```bash
# Clone the repository
git clone https://github.com/CHALABI-CERINE/career-summit.git
cd career-summit

# Open in browser
# Use a local server for best results
python -m http.server 8000
# Visit http://localhost:8000
```

### Google Apps Script Setup

1. Create a new Google Sheet for data collection
2. Open **Extensions** > **Apps Script**
3. Copy the code from `google-apps-script_Version4.js`
4. Deploy as a web app
5. Update the script URL in `script.js`

## 📋 Features in Detail

### Registration System
- Multi-step form with validation
- Real-time data submission
- Confirmation emails (via Apps Script)
- Data stored in Google Sheets

### Event Management
- Speaker bios and schedules
- Agenda and timeline
- Venue information
- Interactive maps

### Responsive Design
- Mobile-optimized layout
- Touch-friendly navigation
- Fast loading times
- Accessibility features

## 🌐 Deployment

The site is configured for GitHub Pages with a custom domain:

```
# CNAME file contains your custom domain
yourcareer-summit.com
```

To deploy:
1. Push to the `main` branch
2. Enable GitHub Pages in repository settings
3. Configure your custom domain DNS

## 🎨 Customization

### Styling
Edit `style.css` to match your event branding:
- Colors and themes
- Typography
- Layout and spacing
- Animations

### Content
Update `index.html` with:
- Event details
- Speaker information
- Registration fields
- Sponsorship logos

### Backend
Modify `google-apps-script_Version4.js` to:
- Change data validation rules
- Add email notifications
- Customize spreadsheet structure
- Add analytics tracking

## 📊 Data Management

Registration data is automatically collected and organized in Google Sheets, including:
- Participant information
- Registration timestamps
- Event preferences
- Contact details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## 👤 Author

**CHALABI CERINE MARIA**

## 📄 License

This project is open source and available for educational purposes.

---

🎯 **Empowering careers, one summit at a time!**
