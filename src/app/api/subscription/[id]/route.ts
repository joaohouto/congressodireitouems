import { database } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const subscription = await database.subscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      return new NextResponse("Subscription not found", { status: 404 });
    }

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("[SUBSCRIPTION_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { id: subscriptionId, ...values } = await req.json();

  try {
    const subscription = await database.subscription.update({
      where: { id },
      data: values,
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("[SUBSCRIPTION_PUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await database.subscription.delete({
      where: { id },
    });

    return new NextResponse("Subscription deleted", { status: 200 });
  } catch (error) {
    console.error("[SUBSCRIPTION_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
