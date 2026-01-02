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

    // submit_tender: {
    //     title: "Submit Tender",
    //     fields: [
    //         { type: "checkbox", label: "All details verified" }
    //     ]
    // },

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
       EMD REFUND FLOW
    ------------------------ */

    verify_emd_refund: {
        title: "Verify EMD Refund",
        fields: [
            { type: "radio", label: "Refund Received?", options: ["Yes", "No"] },
            { type: "file", label: "Refund Proof (if received)", optional: true }
        ]
    },

    generate_emd_refund_email: {
        title: "Generate EMD Refund Follow-up Email",
        fields: [
            { type: "textarea", label: "Email Content (Editable)" }
        ]
    },

    /* -----------------------
       POST TENDER – SECURED
    ------------------------ */

    upload_loa: {
        title: "Upload Letter of Acceptance / Work Order",
        fields: [
            { type: "file", label: "LOA ", accept: ".pdf" },
            { type: "file", label: "Work Order/Agreement" },
            { type: "file", label: "Work Estimate" }
        ]
    },

    security_deposit_details: {
        title: "Performance Security Deposit",
        fields: [
            { type: "number", label: "Deposit Amount" },
            { type: "date", label: "Expected Refund Date" },
            { type: "file", label: "Deposit Documents", optional: true }
        ]
    },

    /* -----------------------
       PROJECT EXECUTION SETUP
    ------------------------ */

    upload_drawings: {
        title: "Upload Project Drawings",
        fields: [
            { type: "file", label: "Drawings", multiple: true }
        ]
    },

    set_project_dates: {
        title: "Set Official Project Dates",
        fields: [
            { type: "date", label: "Project Start Date" },
            { type: "date", label: "Project End Date" }
        ]
    },

    /* -----------------------
       ACTIVE PROJECT
    ------------------------ */

    upload_daily_photos: {
        title: "Upload Daily Progress/Expenses Files",
        fields: [
            { type: "file", label: "Progress/Expense Files", multiple: true, accept: ".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx" }
        ]
    },

    running_bill_received: {
        title: "Running Bill Received",
        fields: [
            { type: "number", label: "Bill Amount Received" },
            { type: "number", label: "Security Deducted Amount" },
            { type: "file", label: "Payment Proof", optional: true }
        ]
    },

    send_whatsapp_summary: {
        title: "Send WhatsApp Progress Summary",
        fields: []
    },

    /* -----------------------
       PROJECT COMPLETION
    ------------------------ */

    mark_project_completed: {
        title: "Mark Project as Completed",
        fields: [
            { type: "date", label: "Actual Completion Date" }
        ]
    },

    generate_delay_email: {
        title: "Generate Delay Justification Email",
        fields: [
            { type: "textarea", label: "Delay Explanation" }
        ]
    },

    /* -----------------------
       TAX & PROFIT
    ------------------------ */

    calculate_taxes: {
        title: "Calculate Applicable Taxes",
        fields: [
            { type: "number", label: "GST Amount" },
            { type: "number", label: "TDS Amount" }
        ]
    },

    mark_taxes_paid: {
        title: "Confirm Taxes Paid",
        fields: [
            { type: "checkbox", label: "Taxes Paid" }
        ]
    },

    final_profit: {
        title: "Final Profit Calculation",
        fields: [
            { type: "number", label: "Final Profit (Auto-calculated)" }
        ]
    },

    /* -----------------------
       CLOSURE
    ------------------------ */

    close_project: {
        title: "Close Project Workflow",
        fields: []
    }
};
