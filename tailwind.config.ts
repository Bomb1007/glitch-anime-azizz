
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// Custom colors for our hacker theme
				hacker: {
					dark: "#121212",
					darker: "#0A0A0A",
					light: "#222222",
					green: "#00FF41",
					cyan: "#00FFFF",
					grey: "#333333",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				sans: ["Inter var", "Inter", ...fontFamily.sans],
				mono: ["Fira Code VF", "Fira Code", ...fontFamily.mono],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				typing: {
					"0%": { width: "0" },
					"100%": { width: "100%" },
				},
				blink: {
					"0%, 100%": { borderColor: "transparent" },
					"50%": { borderColor: "hsl(var(--primary))" },
				},
				glitch: {
					"0%, 100%": { transform: "translate(0)" },
					"20%": { transform: "translate(-2px, 2px)" },
					"40%": { transform: "translate(-2px, -2px)" },
					"60%": { transform: "translate(2px, 2px)" },
					"80%": { transform: "translate(2px, -2px)" },
				},
				flicker: {
					"0%, 100%": { opacity: "1" },
					"33%": { opacity: "0.9" },
					"66%": { opacity: "0.97" },
				},
				neonPulse: {
					"0%, 100%": {
						boxShadow: "0 0 5px #00FF41, 0 0 10px #00FF41, 0 0 20px #00FF41",
					},
					"50%": {
						boxShadow: "0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 30px #00FF41",
					},
				},
				fadeIn: {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				slideIn: {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0)" },
				},
				scaleIn: {
					"0%": { transform: "scale(0.8)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				typing: "typing 3.5s steps(40, end)",
				"cursor-blink": "blink 1s step-end infinite",
				glitch: "glitch 0.5s ease infinite",
				"glitch-hover": "glitch 0.3s ease",
				flicker: "flicker 0.1s ease-in-out infinite",
				"neon-pulse": "neonPulse 1.5s infinite",
				"fade-in": "fadeIn 0.7s ease-out forwards",
				"slide-in": "slideIn 0.5s ease-out forwards",
				"scale-in": "scaleIn 0.5s ease-out forwards",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
