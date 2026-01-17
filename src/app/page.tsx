"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components";
import { COLORS, SPACING } from "@/config/theme";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: COLORS.background }}>
      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.primary,
          color: COLORS.white,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ zIndex: 1, maxWidth: "600px", padding: SPACING.lg }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 700,
              marginBottom: SPACING.lg,
            }}
          >
            Kahoot Clone
          </h1>
          <p
            style={{
              fontSize: "24px",
              marginBottom: SPACING.xxxl,
              fontWeight: 400,
            }}
          >
            Online Quiz Game Platform
          </p>
          <div
            style={{
              display: "flex",
              gap: SPACING.md,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/dashboard">
              <Button variant="secondary" size="lg">
                Dashboard
              </Button>
            </Link>
            <Link href="/join-game">
              <Button variant="outline" size="lg">
                Join Game
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: SPACING.xxxl,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            fontWeight: 600,
            textAlign: "center",
            marginBottom: SPACING.xxxl,
            color: COLORS.text,
          }}
        >
          Features
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: SPACING.xl,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.white,
              padding: SPACING.lg,
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: SPACING.md }}>
              [note]
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: SPACING.md,
                color: COLORS.text,
              }}
            >
              Create Quizzes
            </h3>
            <p style={{ color: COLORS.textSecondary, fontSize: "14px" }}>
              Build custom quizzes with your own questions
            </p>
          </div>

          <div
            style={{
              backgroundColor: COLORS.white,
              padding: SPACING.lg,
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: SPACING.md }}>
              [game]
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: SPACING.md,
                color: COLORS.text,
              }}
            >
              Live Games
            </h3>
            <p style={{ color: COLORS.textSecondary, fontSize: "14px" }}>
              Play real-time games with friends and compete
            </p>
          </div>

          <div
            style={{
              backgroundColor: COLORS.white,
              padding: SPACING.lg,
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: SPACING.md }}>
              [trophy]
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: SPACING.md,
                color: COLORS.text,
              }}
            >
              Leaderboards
            </h3>
            <p style={{ color: COLORS.textSecondary, fontSize: "14px" }}>
              Track top 3 winners on the podium
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: COLORS.secondary,
          color: COLORS.white,
          padding: SPACING.xxxl,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            fontWeight: 600,
            marginBottom: SPACING.lg,
          }}
        >
          Start Playing Today!
        </h2>
        <Link href="/dashboard">
          <Button
            size="lg"
            style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
          >
            Get Started
          </Button>
        </Link>
      </section>

      <footer
        style={{
          backgroundColor: COLORS.text,
          color: COLORS.white,
          padding: SPACING.lg,
          textAlign: "center",
        }}
      >
        <p>2024 Kahoot Clone. All rights reserved.</p>
      </footer>
    </div>
  );
}
