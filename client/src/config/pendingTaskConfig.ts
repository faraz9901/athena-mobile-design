
//All Project Actions 

// FLOW1: Tender Failed
// Project Created -> Tender Failed -> Wait until EMD Refund Received -> Notify User 
// -> Show in workflow "Refund Received?" 
//     -> Yes -> Project Status Updated as Refunded
//     -> No -> Show "Create Mail for EMD Refund" 

// FLOW2: Tender Secured

// FLOW2.1: Negotiations Successful

// Project Created -> Tender Secured -> Upload Bid Comparative Statement -> Upload Negotiation Letters  
//      -> Negotiation Successful? -> Yes -> Upload LOA,Work Order/Agreement, Work Estimate -> Enter Performance Security Details -> Upload Performance Security Document(if any) -> Upload Project Drawings -> Review Extracted Data (start end date ,dlp period, final alloted amount,) -> Project Ready for execution -> Daily Progress Tracking -> Daily Expense Report Upload -> Send Whatsapp Summary to all partner at EOD -> Running Bill Recieved ? -> If yes take input as "Running Bill Amount" and "Deducted Security Amount" -> Show Button "Can you complete the project on Time?" -> if No ( Show "Create Mail for Delay" -> Generate Delay Justification Email -> Updated End Date )-> Project Completed -> Generate Email to receive final payment from client -> Payment Received? -> upload recived payment doc -> Ask user if deducted security amount is received or not -> If not received then create a email template to ask for release of deducted security amount , if received skip this step -> Calculate Taxes -> System notifies to settle taxes ->User mark the taxes paid -> calculate profit -> mark project as done -> On DLP period  completion and after 1 month after prompt user to write a letter to release the performance security and send it to the client -> END

// FLOW2.2: Negotiations Failed

// Project Created -> Tender Secured -> Upload Bid Comparative Statement -> Upload Negotiation Letters  
//      -> Negotiation Successful? ->No -> Update status to tender lost  -> Wait until EMD Refund Received -> Notify User 
// -> Show in workflow "Refund Received?" 
//     -> Yes -> Project Status Updated as Refunded
//     -> No -> Show "Create Mail for EMD Refund" 

export const PENDING_TASK_CONFIG = {

    /* -----------------------
       DRAFT / TENDER CREATION
    ------------------------ */

    upload_tender_docs: {
        title: "Upload Tender Documents",
        fields: [
            { type: "file", label: "SBD Document", accept: ".pdf" },
            { type: "file", label: "BOQ Document", accept: ".pdf" },
            { type: "file", label: "Tender Notice", accept: ".pdf" }
        ]
    },

    review_extracted_data: {
        title: "Review Extracted Tender Data",
        fields: [
            { type: "text", label: "Name of Work" },
            { type: "text", label: "Location of Work" },
            { type: "text", label: "Tendering Authority Name" },
            { type: "text", label: "Department Name" },
            { type: "number", label: "Total Work Amount" },
            { type: "date", label: "Bid Submission Date" },
            { type: "number", label: "EMD Amount" }
        ]
    },

    /* -----------------------
       TENDER RESULT
    ------------------------ */

    tender_secured: {
        title: "Tender Secured Confirmation",
        fields: []
    },

    tender_failed: {
        title: "Tender Failed",
        fields: [
            { type: "date", label: "Expected EMD Refund Date" }
        ]
    },

    /* -----------------------
       EMD REFUND FLOW (Common for Failed Tender & Failed Negotiation)
    ------------------------ */

    verify_emd_refund: {
        title: "Verify EMD Refund",
        fields: [
            {
                type: "decision",
                label: "Refund Received?",
                options: ["Yes", "No"]
            },
            {
                type: "info_action",
                label: "Create Mail for EMD Refund",
                condition: { field: "Refund Received?", value: "No" },
                actionLabel: "Generate Email",
                link: "generate_emd_refund_email"
            }
        ]
    },

    generate_emd_refund_email: {
        title: "Generate EMD Refund Follow-up Email",
        fields: [
            { type: "textarea", label: "Email Content (Editable)" }
        ]
    },

    /* -----------------------
       NEGOTIATION FLOW
    ------------------------ */

    upload_bid_comparative: {
        title: "Upload Bid Comparative Statement",
        fields: [
            { type: "file", label: "Bid Comparative Statement", accept: ".pdf" }
        ]
    },

    upload_negotiation_letters: {
        title: "Upload Negotiation Letters",
        fields: [
            { type: "file", label: "Negotiation Letter", accept: ".pdf" }
        ]
    },

    negotiation_decision: {
        title: "Negotiation Outcome",
        fields: [
            {
                type: "decision",
                label: "Negotiation Successful?",
                options: ["Yes", "No"]
            }
        ]
    },

    /* -----------------------
       POST TENDER – SECURED (If Negotiation Yes)
    ------------------------ */

    upload_loa_work_order: {
        title: "Upload LOA / Work Order",
        fields: [
            { type: "file", label: "LOA", accept: ".pdf" },
            { type: "file", label: "Work Order/Agreement", accept: ".pdf" },
            { type: "file", label: "Work Estimate", accept: ".pdf, .xls, .xlsx" }
        ]
    },

    performance_security_details: {
        title: "Performance Security Details",
        fields: [
            { type: "number", label: "Performance Security Amount" },
            { type: "date", label: "Submission Date" },
            { type: "date", label: "Start Date" },
            { type: "date", label: "End Date" }
        ]
    },

    upload_performance_security: {
        title: "Upload Performance Security Document",
        fields: [
            { type: "file", label: "Performance Security Document", accept: ".pdf" }
        ]
    },

    upload_project_drawings: {
        title: "Upload Project Drawings",
        fields: [
            { type: "file", label: "Project Drawings", multiple: true }
        ]
    },

    review_final_data: {
        title: "Review Final Project Data",
        fields: [
            { type: "date", label: "Project Start Date" },
            { type: "date", label: "Project End Date" },
            { type: "text", label: "DLP Period (Months)" },
            { type: "number", label: "Final Allotted Amount" }
        ]
    },

    project_ready_for_execution: {
        title: "Project Ready for Execution",
        fields: [
            { type: "info", label: "Project is now moved to Execution stage." }
        ]
    },

    /* -----------------------
       ACTIVE PROJECT
    ------------------------ */

    daily_progress_tracking: {
        title: "Daily Progress Tracking",
        fields: [
            // Placeholder for specific daily inputs if needed here, otherwise handled separately
            { type: "file", label: "Daily Expense ", optional: false }
        ]
    },

    // daily_expense_report: {
    //     title: "Daily Expense Report",
    //     fields: [
    //         { type: "file", label: "Expense Vouchers", multiple: true }
    //     ]
    // },

    send_whatsapp_summary: {
        title: "Send WhatsApp Summary",
        fields: [
            { type: "info_action", label: "Send Summary to Partners", actionLabel: "Send WhatsApp" }
        ]
    },

    running_bill_received: {
        title: "Running Bill Received",
        fields: [
            { type: "number", label: "Running Bill Amount" },
            { type: "number", label: "Deducted Security Amount" }
        ]
    },

    check_project_timeline: {
        title: "Check Project Timeline",
        fields: [
            {
                type: "decision",
                label: "Can you complete the project on Time?",
                options: ["Yes", "No"]
            },
            {
                type: "info_action",
                label: "Create Mail for Delay",
                condition: { field: "Can you complete the project on Time?", value: "No" },
                actionLabel: "Generate Delay Justification Email"
            }
        ]
    },

    generate_delay_justification: {
        title: "Generate Delay Justification Email",
        fields: [
            { type: "textarea", label: "Reason for Delay" },
            { type: "date", label: "Updated End Date" }
        ]
    },

    /* -----------------------
       PROJECT COMPLETION
    ------------------------ */

    project_completed_check: {
        title: "Project Completed",
        fields: [
            { type: "info_action", label: "Request Final Payment", actionLabel: "Generate Final Payment Email", link: "generate_final_payment_email" }
        ]
    },

    generate_final_payment_email: {
        title: "Generate Final Payment Request",
        fields: [
            { type: "textarea", label: "Email Content to Client" }
        ]
    },

    payment_received_check: {
        title: "Final Payment Received?",
        fields: [
            { type: "file", label: "Received Payment Document" },
            {
                type: "decision",
                label: "Deducted Security Amount Received?",
                options: ["Yes", "No"]
            },
            {
                type: "info_action",
                label: "Request Security Release",
                condition: { field: "Deducted Security Amount Received?", value: "No" },
                actionLabel: "Create Security Release Email",
                link: "create_security_release_email"
            }
        ]
    },

    create_security_release_email: {
        title: "Security Release Request",
        fields: [
            { type: "textarea", label: "Email Content to Client" }
        ]
    },

    /* -----------------------
       TAXES & PROFITS
    ------------------------ */

    calculate_taxes: {
        title: "Calculate Taxes",
        fields: [
            { type: "info", label: "System will calculate taxes based on income." },
            { type: "number", label: "Tax Amount to Pay" }
        ]
    },

    mark_taxes_paid: {
        title: "Settle Taxes",
        fields: [
            { type: "decision", label: "Taxes Paid?", options: ["Yes"] }
        ]
    },

    calculate_profit: {
        title: "Final Profit Calculation",
        fields: [
            { type: "info", label: "Profit = Total Income - Expenses - Taxes" },
            { type: "number", label: "Calculated Profit", readOnly: true }
        ]
    },

    mark_project_done: {
        title: "Mark Project Done",
        fields: [
            { type: "decision", label: "Close Project?", options: ["Yes"] }
        ]
    },

    /* -----------------------
       DLP PERIOD
    ------------------------ */

    release_performance_security_letter: {
        title: "Release Performance Security",
        fields: [
            { type: "info", label: "DLP Period Completed." },
            { type: "info_action", label: "Write Letter to Client", actionLabel: "Generate Letter" }
        ]
    },

    download_final_report: {
        title: "Download Final Report",
        fields: [
            { type: "info", label: "Project Closed successfully." },
            { type: "info_action", label: "Download Report", actionLabel: "Download PDF" }
        ]
    }

};
