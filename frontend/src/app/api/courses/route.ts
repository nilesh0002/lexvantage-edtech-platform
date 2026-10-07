import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    // Convert stringified syllabus back to array for frontend
    const formattedCourses = courses.map(course => ({
      ...course,
      syllabus: JSON.parse(course.syllabus)
    }));
    
    return NextResponse.json(formattedCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newCourse = await prisma.course.create({
      data: {
        name: body.name,
        price: body.price,
        duration: body.duration,
        exam: body.exam,
        syllabus: JSON.stringify(body.syllabus)
      }
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
