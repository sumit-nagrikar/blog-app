import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/email.model";
import { NextResponse } from "next/server";

const LoadDB = async () => {
    await ConnectDB();
}
LoadDB();

// API endpoint for saving new email to database
export async function POST(request) {
    const formData = await request.formData();
    const emailData = {
        email: `${formData.get('email')}`,
        date: new Date() // Adding the current date here
    }
    await EmailModel.create(emailData);
    return NextResponse.json({ success: true, msg: "Email Subscribed!" })
}

//API endpoint to get all emails
export async function GET(request) {
    const emails = await EmailModel.find({});
    return NextResponse.json({ emails });
}

// API endpoint to delete email

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id"); // Get id from query params
    if (!id) {
        return NextResponse.json({ success: false, msg: "ID is required" });
    }

    try {
        const deletedEmail = await EmailModel.findByIdAndDelete(id); // Delete the email by ID
        if (deletedEmail) {
            return NextResponse.json({ success: true, msg: "Email Deleted" });
        } else {
            return NextResponse.json({ success: false, msg: "Email not found" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Error deleting email", error: error.message });
    }
}
