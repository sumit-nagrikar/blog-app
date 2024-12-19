import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/blog.model";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
const fs = require('fs')

// Database Initialization Middleware
const initializeDB = async () => {
    try {
        if (!global.dbConnected) {
            await ConnectDB();
            global.dbConnected = true; // Flag to avoid multiple connections
            console.log("Database connected.");
        }
    } catch (error) {
        console.error("Database connection error:", error.message);
        throw new Error("Database connection failed.");
    }
};

// Utility to parse form data and validate required fields
const parseAndValidateFormData = async (request) => {
    const formData = await request.formData();
    const image = formData.get("image");
    const authorImg = formData.get("authorImg");
    const author = formData.get("author");

    if (!image || !authorImg || !author) {
        throw new Error("Missing required fields: image, authorImg, or author.");
    }

    return { formData, image, authorImg, author };
};

// Utility to save image and return the URL
const saveImageLocally = async (image) => {
    const timestamp = Date.now();
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const imagePath = `./public/${timestamp}_${image.name}`;
    await writeFile(imagePath, buffer);
    return `/${timestamp}_${image.name}`; // Return the image URL
};

// API endpoint for uploading blogs
export async function POST(request) {
    try {
        // Initialize DB Connection
        await initializeDB();

        // Parse and validate form data
        const { formData, image, authorImg, author } = await parseAndValidateFormData(request);

        // Save image and get URL
        const imageURL = await saveImageLocally(image);

        // Prepare blog data
        const blogData = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            image: imageURL,
            author_img: authorImg,
            author: author,
        };

        // Save blog to DB
        await BlogModel.create(blogData);
        console.log("Blog saved successfully");

        return NextResponse.json({ success: true, msg: "Blog Added" });
    } catch (error) {
        console.error("Error handling POST request:", error.message);
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Internal Server Error",
                error: error.message,
            },
            { status: 500 }
        );
    }
}


// API endpoint for getting blogs
export async function GET(request) {
    // Initialize DB Connection
    await initializeDB();
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    }
    else {
        const blogs = await BlogModel.find({});
        return NextResponse.json({ blogs })
    }
}

//API endpoint to delete blog
export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findById(id);
    fs.unlink(`./public${blog.image}`, () => { })
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog Deleted" })
}
