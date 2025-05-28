import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const upcomingMatches = await prisma.match.findMany({
      where: {
        date: {
          gte: new Date()
        }
      },
      orderBy: {
        date: 'asc'
      },
      include: {
        homeTeam: true,
        awayTeam: true
      }
    })

    return NextResponse.json({
      data: upcomingMatches.map(match => ({
        id: match.id,
        date: match.date,
        time: match.time,
        homeTeam: {
          id: match.homeTeam.id,
          name: match.homeTeam.name,
          logoUrl: match.homeTeam.logoUrl
        },
        awayTeam: {
          id: match.awayTeam.id,
          name: match.awayTeam.name,
          logoUrl: match.awayTeam.logoUrl
        },
        stadium: match.place,
        ticketsAvailable: match.status === 'UPCOMING'
      }))
    })
  } catch (error) {
    console.error('Error fetching upcoming matches:', error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des matchs à venir" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      homeTeamId,
      awayTeamId,
      place,
      date,
      time,
      status = "À venir"
    } = body

    if (!homeTeamId || !awayTeamId || !place || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate a unique id for the match (since id is required and not auto-generated)
    const id = crypto.randomUUID();

    const match = await prisma.match.create({
      data: {
        id,
        homeTeamId,
        awayTeamId,
        place,
        date: new Date(date),
        time,
        status
      }
    })

    return NextResponse.json({ data: match }, { status: 201 })
  } catch (error) {
    console.error("Error creating match:", error)
    return NextResponse.json({ error: "Erreur lors de la création du match" }, { status: 500 })
  }
}