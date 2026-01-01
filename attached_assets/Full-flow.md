# 📱 App Full Functional Flow (Developer-Readable)

This document describes the **end-to-end functional flow** of the mobile application in a **linear, implementation-ready format** that developers can directly use without relying on PDFs or diagrams.

---

## 1. App Install & Authentication Flow

### 1.1 App Launch

* User installs and opens the app
* Show **Splash Screen**
* System checks: `isUserLoggedIn`

---

### 1.2 Login / Signup Flow

#### Step 1: Mobile Number Input

* Input: `mobile_number`
* Action: **Send OTP**
* API: `POST /auth/send-otp`

#### Step 2: OTP Verification

* Input: `otp_6_digits`
* Action: **Verify OTP**
* API: `POST /auth/verify-otp`
* If success → continue
* If failure → show error

#### Step 3: Choose Login Method (Backend Checks If user email verified, if not show this otherwise skip this step)

* Google Login
* Email Login

#### Step 4A: Google Login

* Google OAuth flow
* On success → `LoginSuccess`

#### Step 4B: Email Login

* Input: `email`
* Send verification code
* Input: `email_verification_code`
* Verify code → `LoginSuccess`

---

### 1.3 Login Success

* Save authentication token
* Check: `isOnboardingCompleted`

  * If `false` → Start onboarding
  * If `true` → Navigate to Home Dashboard

---

## 2. Onboarding Flow

### 2.1 Occupation Selection

User selects one:

* Government Contractor
* Non-Government Contractor
* Consultant
* Architect
* Interior Designer
* Freelancer

Save: `occupation_type`

---

### 2.2 Ownership Type

* Single Owner
* Partnership

Save: `ownership_type`

---

### 2.3 Partnership Details (Conditional)

*Visible only if ownership type = Partnership*

#### Share Type

* Fixed Share
* Flexible Share

#### Partner Details

For each partner:

* Partner Name
* Share Percentage

Validation:

* Total share must equal **100%**

---

### 2.4 Firm Type

* Partnership Firm
* LLP
* Private Limited
* Any Other

If **Any Other** → input custom firm type

---

### 2.5 Firm Details

Inputs:

* Firm Name
* Address
* GSTIN
* PAN
* EPFO (optional)
* ESIC (optional)
* TAN (optional)

---

### 2.6 Enlistment Departments

User can add multiple departments.

For each department:

* Department Name (select or custom)
* Expiry Date

Examples:

* PWD
* Water Resources
* MES (GOI)
* Local Bodies
* Panchayat Raj
* Any Other

On completion:

* Set `onboardingCompleted = true`

---

## 3. Home Dashboard

### 3.1 Dashboard Layout

**Top Section**

* Greeting
* Profile Avatar
* Notification Icon

**Stat Cards**

* Active Projects
* Overdue Tasks
* Monthly Expenses

**Recent Activity Feed**

* Task updates
* Expense added
* Document uploaded
* Team messages

**Floating Action Button (FAB)**

* Create Project
* Add Task
* Add Expense
* Scan Document

---

## 4. Project Creation Flow

### 4.1 Create New Project

* Action: **Create Project**

---

### 4.2 Upload Tender Documents

Upload files with categories:

* SBD
* BOQ
* Tender Notice

Trigger:

* OCR / AI data extraction

---

### 4.3 System Data Extraction

System extracts (auto-filled, editable):

* Name of Work
* Location of Work
* Tender Authority Name
* Tender Authority Address
* Department Name
* Type of Work
* Tender ID
* Total Work Amount
* Work Duration
* Bid Submission Date
* EMD Amount
* EMD Refund Date
* Tender Start Date
* Tender End Date

---

### 4.4 Review Extracted Data

User can:

* Edit extracted fields
* Input additional values:

  * Tentative Amount
  * Applicable Taxes

---

### 4.5 Project Share Type

* Fixed Share
* Partnership Share

If partnership:

* Partner Name
* Share Percentage

---

### 4.6 Submit Project

Actions:

* **Submit Project**
* **Save as Draft**

---

### 4.7 Project Status

* Draft
* Tender Submitted

---

## 5. Tender Status Flow

### 5.1 Tender Actions

* Tender Secured
* Tender Failed

---

### 5.2 Tender Failed Flow

* Update status → `Tender Failed`
* Project workflow closed
* Wait until EMD refund date
* Notify user to verify EMD refund

If refunded:

* Mark EMD as refunded

If not refunded:

* Send reminders
* Escalation follow-ups

---

### 5.3 Tender Secured Flow

* Update project status → `Active`

Optional uploads:

* Bid Comparative Statement
* Negotiation Letters

---

### 5.4 Negotiation Outcome

If negotiation failed:

* Status → Tender Lost
* Follow EMD refund flow

If negotiation successful:

* Continue to execution stage

---

## 6. Post-Tender Documentation

Required uploads:

* Letter of Acceptance (LOA)
* Performance Security Deposit Amount
* Performance Security Refund Date
* Performance Security Documents
* Work Agreement / Work Order
* Work Estimate
* Project Drawings

Additional inputs:

* Final Allotted Amount
* Defect Liability Period (DLP)
* DLP Maturity Date (auto-calculated, editable)
* Official Project Start Date
* Official Project End Date

Status → **Project Ready for Execution**

---

## 7. Project Execution Flow

### 7.1 Daily Progress Tracking

Daily cycle:

* WhatsApp reminder sent
* Upload daily site photos
* OCR extracts expense/payment data
* Project ledger auto-updated
* WhatsApp summary sent

Repeat until completion

---

### 7.2 Running Bill Tracking

Prompt user:

* Any running bill received?

If YES:

* Input running bill amount
* Input deducted security amount
* Upload payment document

---

## 8. Project Completion & Finance

### 8.1 Project Completion

* Mark project as completed
* Update end date (if delayed)
* Generate delay email template (if required)

---

### 8.2 Tax Settlement

System:

* Calculates applicable taxes
* Notifies user

User:

* Marks taxes as paid

---

### 8.3 Final Profit Calculation

System:

* Calculates final profit
* Displays profit to user
* Distributes profit among partners (if applicable)

---

### 8.4 Security Deposit Refund

* Notify user
* Generate refund email template
* Track refund received

---

## 9. End of Workflow

* Project status → **Closed**
* All payments settled
* Documents archived
* Workflow completed
