import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, BarChart3, Check, ChevronLeft, ChevronRight, Compass, Globe, Megaphone, Quote, Search, Target, TrendingUp, X } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region src/components/site/Nav.tsx
var links = [
	{
		href: "#philosophy",
		label: "Philosophy"
	},
	{
		href: "#services",
		label: "Services"
	},
	{
		href: "#process",
		label: "Process"
	},
	{
		href: "#work",
		label: "Work"
	},
	{
		href: "#contact",
		label: "Contact"
	}
];
function Nav() {
	const { scrollY } = useScroll();
	const blur = useTransform(scrollY, [0, 120], [6, 16]);
	const bg = useTransform(scrollY, [0, 120], ["rgba(247,250,248,0.4)", "rgba(247,250,248,0.85)"]);
	const [open, setOpen] = useState(false);
	return /* @__PURE__ */ jsxs(motion.header, {
		style: {
			backdropFilter: blur.get() ? `blur(${blur.get()}px)` : void 0,
			background: bg
		},
		className: "fixed top-0 inset-x-0 z-50 border-b border-line/60",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "container-tight flex items-center justify-between py-4",
			children: [
				/* @__PURE__ */ jsxs("a", {
					href: "#top",
					className: "flex items-center gap-2.5 group",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "relative grid place-items-center w-9 h-9 rounded-full bg-ink text-background",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-display text-lg leading-none",
							children: "g"
						}), /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full pulse-ring border border-accent/60" })]
					}), /* @__PURE__ */ jsxs("div", {
						className: "leading-tight",
						children: [/* @__PURE__ */ jsx("div", {
							className: "font-display text-base text-ink",
							children: "Growth Studio"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
							children: "est. 2022"
						})]
					})]
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5",
					children: links.map((l) => /* @__PURE__ */ jsx("a", {
						href: l.href,
						className: "px-3.5 py-1.5 text-sm text-ink-soft rounded-full hover:bg-mint/60 transition-colors",
						children: l.label
					}, l.href))
				}),
				/* @__PURE__ */ jsxs("a", {
					href: "#contact",
					className: "btn-primary hidden md:inline-flex !py-2.5 !px-5 text-sm",
					children: ["Book a call ", /* @__PURE__ */ jsx("span", {
						"aria-hidden": true,
						children: "→"
					})]
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: () => setOpen(!open),
					className: "md:hidden p-2 -mr-2",
					"aria-label": "Menu",
					children: /* @__PURE__ */ jsxs("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ jsx("span", { className: "block w-6 h-px bg-ink" }), /* @__PURE__ */ jsx("span", { className: "block w-6 h-px bg-ink" })]
					})
				})
			]
		}), open && /* @__PURE__ */ jsx("div", {
			className: "md:hidden border-t border-line bg-background/95",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-tight py-4 flex flex-col gap-1",
				children: [links.map((l) => /* @__PURE__ */ jsx("a", {
					href: l.href,
					onClick: () => setOpen(false),
					className: "py-3 text-ink-soft border-b border-line/60",
					children: l.label
				}, l.href)), /* @__PURE__ */ jsx("a", {
					href: "#contact",
					onClick: () => setOpen(false),
					className: "btn-primary mt-3 text-sm",
					children: "Book a call"
				})]
			})
		})]
	});
}
//#endregion
//#region src/components/site/Hero.tsx
function FloatingCard({ className = "", delay = 0, children, parallax = 20, mx, my }) {
	const tx = useTransform(mx, (v) => v * parallax);
	const ty = useTransform(my, (v) => v * parallax);
	return /* @__PURE__ */ jsx(motion.div, {
		style: {
			x: tx,
			y: ty
		},
		initial: {
			opacity: 0,
			y: 30,
			scale: .95
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		transition: {
			delay,
			duration: .9,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: `absolute glass rounded-2xl shadow-elev p-4 ${className}`,
		children
	});
}
function Hero() {
	const ref = useRef(null);
	const mx = useMotionValue(0);
	const my = useMotionValue(0);
	const smx = useSpring(mx, {
		stiffness: 50,
		damping: 20
	});
	const smy = useSpring(my, {
		stiffness: 50,
		damping: 20
	});
	useEffect(() => {
		const onMove = (e) => {
			const el = ref.current;
			if (!el) return;
			const r = el.getBoundingClientRect();
			mx.set(((e.clientX - r.left) / r.width - .5) * 2);
			my.set(((e.clientY - r.top) / r.height - .5) * 2);
		};
		window.addEventListener("mousemove", onMove);
		return () => window.removeEventListener("mousemove", onMove);
	}, [mx, my]);
	return /* @__PURE__ */ jsxs("section", {
		id: "top",
		ref,
		className: "relative min-h-[100svh] overflow-hidden pt-32 pb-16",
		style: { background: "var(--gradient-hero)" },
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "pointer-events-none absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full blur-3xl opacity-60",
				style: { background: "radial-gradient(circle at 30% 30%, #B7E6CE 0%, transparent 60%)" }
			}),
			/* @__PURE__ */ jsx("div", {
				className: "pointer-events-none absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-50",
				style: { background: "radial-gradient(circle at 70% 70%, #DFF4E8 0%, transparent 60%)" }
			}),
			/* @__PURE__ */ jsx("div", {
				className: "pointer-events-none absolute inset-0 opacity-[0.04]",
				style: {
					backgroundImage: "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
					backgroundSize: "80px 80px"
				}
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "container-tight relative",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .6 },
					className: "chip mb-8",
					children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent animate-pulse" }), "Available for Q3 — 2 spots left"]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsxs("h1", {
							className: "headline-xl text-balance text-ink",
							children: [
								"Not Just ",
								/* @__PURE__ */ jsx("em", {
									className: "italic font-light text-muted-foreground",
									children: "Marketing."
								}),
								/* @__PURE__ */ jsx("br", {}),
								"I Build",
								" ",
								/* @__PURE__ */ jsxs("span", {
									className: "relative inline-block",
									children: [/* @__PURE__ */ jsx("span", {
										className: "relative z-10",
										children: "Growth Journeys."
									}), /* @__PURE__ */ jsx(motion.span, {
										initial: { scaleX: 0 },
										animate: { scaleX: 1 },
										transition: {
											delay: .8,
											duration: .9,
											ease: [
												.22,
												1,
												.36,
												1
											]
										},
										className: "absolute left-0 right-0 bottom-1 h-3 bg-mint origin-left -z-0 rounded"
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs(motion.p, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								delay: .3,
								duration: .7
							},
							className: "mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed",
							children: [
								"Helping businesses become ",
								/* @__PURE__ */ jsx("span", {
									className: "text-ink",
									children: "visible"
								}),
								",",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "text-ink",
									children: "trusted"
								}),
								", and ",
								/* @__PURE__ */ jsx("span", {
									className: "text-ink",
									children: "chosen"
								}),
								" through websites, SEO, content, and performance marketing."
							]
						}),
						/* @__PURE__ */ jsxs(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								delay: .5,
								duration: .7
							},
							className: "mt-10 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ jsxs("a", {
								href: "#work",
								className: "btn-primary",
								children: ["See growth stories ", /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-4 h-4" })]
							}), /* @__PURE__ */ jsx("a", {
								href: "#contact",
								className: "btn-ghost",
								children: "Book a call"
							})]
						}),
						/* @__PURE__ */ jsx(motion.div, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: {
								delay: .8,
								duration: .8
							},
							className: "mt-16 grid grid-cols-3 max-w-md gap-6",
							children: [
								{
									n: "3.5+",
									l: "Years building"
								},
								{
									n: "15+",
									l: "Brands scaled"
								},
								{
									n: "99%",
									l: "Client retention"
								}
							].map((s) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "num text-2xl md:text-3xl font-medium text-ink",
								children: s.n
							}), /* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground mt-1 leading-snug",
								children: s.l
							})] }, s.l))
						})
					] }), /* @__PURE__ */ jsxs("div", {
						className: "relative h-[520px] hidden lg:block",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "absolute inset-0 grid place-items-center",
								children: /* @__PURE__ */ jsxs("div", {
									className: "relative w-[420px] h-[420px] rounded-full border border-line",
									children: [
										/* @__PURE__ */ jsx("div", { className: "absolute inset-6 rounded-full border border-line/70" }),
										/* @__PURE__ */ jsx("div", { className: "absolute inset-16 rounded-full border border-line/40" }),
										/* @__PURE__ */ jsx("div", {
											className: "absolute inset-0 orbit",
											children: /* @__PURE__ */ jsx("span", { className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent shadow-glow" })
										}),
										/* @__PURE__ */ jsx("div", {
											className: "absolute inset-6 orbit",
											style: {
												animationDirection: "reverse",
												animationDuration: "22s"
											},
											children: /* @__PURE__ */ jsx("span", { className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ink" })
										})
									]
								})
							}),
							/* @__PURE__ */ jsxs(FloatingCard, {
								mx: smx,
								my: smy,
								delay: .6,
								parallax: -30,
								className: "top-2 left-0 w-56",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 text-xs text-muted-foreground mb-2",
										children: [/* @__PURE__ */ jsx(Search, { className: "w-3.5 h-3.5" }), " Organic search"]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "num text-2xl text-ink",
										children: "35x"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-3 flex items-end gap-1 h-10",
										children: [
											20,
											28,
											22,
											40,
											36,
											58,
											72,
											92
										].map((h, i) => /* @__PURE__ */ jsx("div", {
											className: "w-2 rounded-sm bg-gradient-to-t from-mint to-accent",
											style: { height: `${h}%` }
										}, i))
									})
								]
							}),
							/* @__PURE__ */ jsxs(FloatingCard, {
								mx: smx,
								my: smy,
								delay: .8,
								parallax: 25,
								className: "top-12 right-0 w-60",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between mb-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-xs text-muted-foreground",
											children: "Conversions"
										}), /* @__PURE__ */ jsx("span", {
											className: "chip !py-0.5 !px-2 text-[10px]",
											children: "Live"
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "num text-2xl text-ink",
										children: "2,841"
									}),
									/* @__PURE__ */ jsxs("svg", {
										viewBox: "0 0 200 60",
										className: "w-full mt-2",
										children: [
											/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
												id: "g1",
												x1: "0",
												x2: "0",
												y1: "0",
												y2: "1",
												children: [/* @__PURE__ */ jsx("stop", {
													offset: "0%",
													stopColor: "#7CC7A5",
													stopOpacity: "0.5"
												}), /* @__PURE__ */ jsx("stop", {
													offset: "100%",
													stopColor: "#7CC7A5",
													stopOpacity: "0"
												})]
											}) }),
											/* @__PURE__ */ jsx("path", {
												d: "M0,50 L20,42 L40,46 L60,30 L80,34 L100,22 L120,26 L140,14 L160,18 L180,8 L200,4 L200,60 L0,60 Z",
												fill: "url(#g1)"
											}),
											/* @__PURE__ */ jsx("path", {
												d: "M0,50 L20,42 L40,46 L60,30 L80,34 L100,22 L120,26 L140,14 L160,18 L180,8 L200,4",
												fill: "none",
												stroke: "#0E1412",
												strokeWidth: "1.4"
											})
										]
									})
								]
							}),
							/* @__PURE__ */ jsxs(FloatingCard, {
								mx: smx,
								my: smy,
								delay: 1,
								parallax: -20,
								className: "bottom-12 left-6 w-52",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ jsx(BarChart3, { className: "w-3.5 h-3.5" }), " Monthly leads"]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "num text-2xl text-ink mt-1",
										children: "+60%"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-2 h-1.5 rounded-full bg-muted overflow-hidden",
										children: /* @__PURE__ */ jsx(motion.div, {
											initial: { width: 0 },
											animate: { width: "82%" },
											transition: {
												delay: 1.4,
												duration: 1.2
											},
											className: "h-full bg-ink rounded-full"
										})
									})
								]
							}),
							/* @__PURE__ */ jsx(FloatingCard, {
								mx: smx,
								my: smy,
								delay: 1.4,
								parallax: -15,
								className: "top-44 left-1/2 -translate-x-1/2 w-40",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 text-xs",
									children: [/* @__PURE__ */ jsx(TrendingUp, { className: "w-3.5 h-3.5 text-accent" }), /* @__PURE__ */ jsx("span", {
										className: "text-ink-soft",
										children: "CAC ↓ 38%"
									})]
								})
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "relative mt-20 border-y border-line/70 py-5 overflow-hidden",
				children: /* @__PURE__ */ jsx("div", {
					className: "marquee-track flex gap-16 whitespace-nowrap text-sm text-muted-foreground",
					children: Array.from({ length: 2 }).map((_, i) => /* @__PURE__ */ jsx("div", {
						className: "flex gap-16 items-center",
						children: [
							"Akshaya Medical Centre ",
							"Ayoham Dining",
							"Gainz Cafe",
							"Inversa Technosoft",
							"Nandaki Ayur",
							"Akshaya Medical Centre",
							"Ayoham Dining"
						].map((b, j) => /* @__PURE__ */ jsx("span", {
							className: "font-display text-xl text-ink/70 tracking-tight",
							children: b
						}, j))
					}, i))
				})
			})
		]
	});
}
//#endregion
//#region src/components/site/Philosophy.tsx
var before = [
	"Digitally absent",
	"No impressions or leads",
	"Inconsistent growth"
];
var after = [
	"Overall visibility",
	"Consistent leads",
	"Scalable / exponential growth"
];
function Philosophy() {
	return /* @__PURE__ */ jsx("section", {
		id: "philosophy",
		className: "section-pad relative",
		children: /* @__PURE__ */ jsx("div", {
			className: "container-tight",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid lg:grid-cols-[1fr_1.2fr] gap-16",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("div", {
						className: "eyebrow mb-5",
						children: "The philosophy"
					}),
					/* @__PURE__ */ jsxs("h2", {
						className: "headline-lg text-balance",
						children: [
							"Your business already has potential. ",
							/* @__PURE__ */ jsx("em", {
								className: "italic text-muted-foreground",
								children: "I build the road"
							}),
							" to reach it."
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 text-muted-foreground max-w-md leading-relaxed",
						children: "Growth isn't a tactic — it's a sequence. Every brand I work with moves from invisible to chosen through a deliberate set of moves across web, search, and story."
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [/* @__PURE__ */ jsx("div", { className: "absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-line to-transparent" }), /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-8 lg:gap-12",
						children: [/* @__PURE__ */ jsx(Column, {
							label: "Before",
							tone: "muted",
							items: before
						}), /* @__PURE__ */ jsx(Column, {
							label: "After",
							tone: "accent",
							items: after
						})]
					})]
				})]
			})
		})
	});
}
function Column({ label, items, tone }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
		className: `eyebrow mb-6 ${tone === "accent" ? "text-ink" : ""}`,
		children: label
	}), /* @__PURE__ */ jsx("div", {
		className: "space-y-3",
		children: items.map((it, i) => /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				x: tone === "accent" ? 20 : -20
			},
			whileInView: {
				opacity: 1,
				x: 0
			},
			viewport: {
				once: true,
				margin: "-80px"
			},
			transition: {
				delay: i * .12,
				duration: .7,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: `p-5 rounded-2xl border ${tone === "accent" ? "bg-gradient-to-br from-mint/70 to-white shadow-soft border-accent/20" : "bg-muted/40 border-line text-muted-foreground"}`,
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 rounded-full ${tone === "accent" ? "bg-accent" : "bg-muted-foreground/50"}` }), /* @__PURE__ */ jsx("span", {
					className: tone === "accent" ? "text-ink font-medium" : "",
					children: it
				})]
			})
		}, it))
	})] });
}
//#endregion
//#region src/components/site/Services.tsx
var services = [
	{
		icon: Globe,
		title: "Website Development",
		desc: "Conversion-focused websites that load fast, rank, and sell.",
		metric: "+62%",
		label: "avg. conv. lift"
	},
	{
		icon: Search,
		title: "SEO",
		desc: "Technical, content, and local SEO engineered for sustained organic growth.",
		metric: "3.4×",
		label: "organic traffic"
	},
	{
		icon: Target,
		title: "Google & Meta Ads",
		desc: "Performance campaigns tuned to ROAS, not vanity impressions.",
		metric: "↓38%",
		label: "cost per lead"
	},
	{
		icon: Megaphone,
		title: "Social Media Growth",
		desc: "Content systems that build authority and a loyal audience.",
		metric: "122K",
		label: "monthly reach"
	},
	{
		icon: Compass,
		title: "Brand Strategy",
		desc: "Positioning, narrative, and identity that make you the obvious choice.",
		metric: "1",
		label: "category of one"
	}
];
function Services() {
	return /* @__PURE__ */ jsx("section", {
		id: "services",
		className: "section-pad bg-background relative",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-tight",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-end justify-between gap-8 mb-14 flex-wrap",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "eyebrow mb-4",
					children: "What I do"
				}), /* @__PURE__ */ jsxs("h2", {
					className: "headline-lg max-w-2xl",
					children: ["Five disciplines. ", /* @__PURE__ */ jsx("em", {
						className: "italic text-muted-foreground",
						children: "One growth system."
					})]
				})] }), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground max-w-sm",
					children: "Each service compounds the next. Run them in sequence and growth stops being a guess."
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5",
				children: [services.map((s, i) => /* @__PURE__ */ jsxs(motion.article, {
					initial: {
						opacity: 0,
						y: 24
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-60px"
					},
					transition: {
						delay: i % 3 * .08,
						duration: .7,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "group relative overflow-hidden rounded-3xl border border-line bg-card p-7 hover:shadow-elev transition-shadow",
					children: [
						/* @__PURE__ */ jsx("div", { className: "absolute -top-20 -right-20 w-48 h-48 rounded-full bg-mint/0 group-hover:bg-mint/60 transition-colors duration-500 blur-2xl" }),
						/* @__PURE__ */ jsxs("div", {
							className: "relative flex items-start justify-between",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-12 h-12 rounded-2xl bg-mint/70 grid place-items-center group-hover:rotate-6 transition-transform duration-500",
								children: /* @__PURE__ */ jsx(s.icon, { className: "w-5 h-5 text-ink" })
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-right",
								children: [/* @__PURE__ */ jsx("div", {
									className: "num text-xl text-ink",
									children: s.metric
								}), /* @__PURE__ */ jsx("div", {
									className: "text-[10px] uppercase tracking-widest text-muted-foreground",
									children: s.label
								})]
							})]
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "font-display text-2xl mt-6 text-ink",
							children: s.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 text-sm text-muted-foreground leading-relaxed",
							children: s.desc
						}),
						/* @__PURE__ */ jsx("div", { className: "mt-6 h-px bg-gradient-to-r from-line via-line to-transparent" }),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4 text-xs text-ink-soft flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
							children: ["Explore capability ", /* @__PURE__ */ jsx("span", {
								"aria-hidden": true,
								children: "→"
							})]
						})
					]
				}, s.title)), /* @__PURE__ */ jsx("div", {
					className: "rounded-3xl border border-dashed border-line p-7 grid place-items-center text-center bg-gradient-to-br from-mint/40 to-transparent",
					children: /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("div", {
							className: "font-display text-2xl text-ink",
							children: "Need all of it?"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground mt-2 max-w-[14rem]",
							children: "Run as a managed growth partnership."
						}),
						/* @__PURE__ */ jsx("a", {
							href: "#contact",
							className: "btn-primary mt-5 !py-2.5 !px-5 text-sm",
							children: "Talk to me"
						})
					] })
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/site/Process.tsx
var steps = [
	{
		k: "01",
		t: "Discover",
		s: "Audit",
		d: "Deep dive into your business, market, funnel, and competitors. Find the leak; find the lever.",
		margin: "md:mt-24"
	},
	{
		k: "02",
		t: "Map",
		s: "Strategy",
		d: "Translate insight into a 90-day roadmap with channels, content, and milestones.",
		margin: "md:mt-[30px]"
	},
	{
		k: "03",
		t: "Build",
		s: "Execution",
		d: "Ship the website, campaigns, content, and tracking — fast and to a high bar.",
		margin: "md:mt-48"
	},
	{
		k: "04",
		t: "Scale",
		s: "Optimization",
		d: "Measure weekly. Double down on what compounds. Cut what doesn't. Repeat.",
		margin: "md:mt-16"
	}
];
function Process() {
	return /* @__PURE__ */ jsx("section", {
		id: "process",
		className: "section-pad relative overflow-hidden",
		style: { background: "linear-gradient(180deg, var(--background), #F0F8F3 60%, var(--background))" },
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-tight relative",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "max-w-2xl mb-24 md:mb-44 mx-auto text-center relative z-20",
				children: [/* @__PURE__ */ jsx("div", {
					className: "eyebrow mb-4",
					children: "The process"
				}), /* @__PURE__ */ jsxs("h2", {
					className: "headline-lg",
					children: ["A four-act journey from ", /* @__PURE__ */ jsx("em", {
						className: "italic text-muted-foreground",
						children: "audit to scale."
					})]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative w-full",
				children: [/* @__PURE__ */ jsx("div", {
					className: "hidden md:block absolute top-0 left-0 w-full h-[250px] z-10 pointer-events-none",
					children: /* @__PURE__ */ jsx("svg", {
						className: "w-full h-full overflow-visible",
						preserveAspectRatio: "none",
						viewBox: "0 0 1000 250",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg",
						children: /* @__PURE__ */ jsx("path", {
							d: "M 125,124 C 245,124 255,28 375,28 C 500,28 500,220 625,220 C 750,220 750,92 875,92",
							stroke: "#94a3b8",
							strokeWidth: "2.5",
							strokeDasharray: "8 8",
							vectorEffect: "non-scaling-stroke"
						})
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-6 relative z-20",
					children: steps.map((st, i) => {
						const isTextAbove = i === 1 || i === 3;
						return /* @__PURE__ */ jsxs(motion.div, {
							initial: {
								opacity: 0,
								y: 30
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: true,
								margin: "-80px"
							},
							transition: {
								delay: i * .12,
								duration: .7,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: `relative flex flex-col items-center text-center md:items-start md:text-left ${st.margin} ${isTextAbove ? "flex-col-reverse justify-end" : ""}`,
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-14 h-14 rounded-full bg-[#3d5a73] flex items-center justify-center mb-6 z-30 border-[6px] border-[#F2F9F5] shadow-sm relative shrink-0",
								children: /* @__PURE__ */ jsx("span", {
									className: "text-white text-lg font-medium tracking-widest",
									children: st.k
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: `relative z-20 ${isTextAbove ? "mb-6 md:mb-0 md:absolute md:bottom-full md:left-0 md:right-0 md:pb-6" : ""}`,
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "font-display text-3xl text-ink",
										children: st.t
									}),
									/* @__PURE__ */ jsx("div", {
										className: "eyebrow mt-1 mb-3",
										children: st.s
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm text-muted-foreground leading-relaxed",
										children: st.d
									})
								]
							})]
						}, st.k);
					})
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/site/CaseStudies.tsx
var cases = [
	{
		name: "Akshaya Medical Centre",
		tag: "Healthcare · Local growth",
		start: "A trusted clinic with strong word-of-mouth but invisible online — no leads from search, weak GMB presence.",
		action: "Built a high-intent local SEO engine, redesigned the website around appointments, and produced patient-education content that ranked.",
		result: [
			{
				k: "Instagram views",
				v: "52K+"
			},
			{
				k: "Monthly reach",
				v: "122K"
			},
			{
				k: "Qualified leads",
				v: "89"
			},
			{
				k: "GMB views",
				v: "5.5K"
			},
			{
				k: "Direction requests",
				v: "+422%"
			}
		],
		next: "Launching a paid acquisition layer for specialty consultations."
	},
	{
		name: "Ayoham Dining",
		tag: "F&B · Revenue scaling",
		start: "Beautiful restaurant, low monthly revenue, no consistent channel for bookings.",
		action: "Repositioned the brand, ran a content-first Meta strategy, and built a reservation funnel that actually converts.",
		result: [
			{
				k: "Monthly revenue",
				v: "₹1.9L → ₹3L"
			},
			{
				k: "Content views",
				v: "363K"
			},
			{
				k: "Lift",
				v: "+58%"
			}
		],
		next: "Expanding to a second outlet with the same playbook."
	},
	{
		name: "Gainz Cafe",
		tag: "F&B · Community-led growth",
		start: "Niche fitness cafe with a loyal but small audience. Sales had plateaued.",
		action: "Built a community-driven content engine and a loyalty-led offer system that turned regulars into evangelists.",
		result: [{
			k: "Sales growth",
			v: "+60%"
		}, {
			k: "Repeat rate",
			v: "+34%"
		}],
		next: "Productizing meal-plans as a subscription."
	},
	{
		name: "Inversa Technosoft",
		tag: "B2B SaaS · Web transformation",
		start: "Outdated site that didn't reflect the team's technical depth. Low trust, low inbound.",
		action: "Complete brand & website rebuild with a story-driven structure and technical SEO foundation.",
		result: [{
			k: "Inbound demos",
			v: "+3.2×"
		}, {
			k: "Bounce",
			v: "-41%"
		}],
		next: "Launching content for enterprise buyer journey."
	},
	{
		name: "Nandaki Ayur",
		tag: "Wellness · Brand + SEO",
		start: "Authentic Ayurveda practice with no digital identity to match its craft.",
		action: "Designed a brand system rooted in calm authority. Stood up SEO + content engine for treatment pages.",
		result: [{
			k: "Organic traffic",
			v: "4.6×"
		}, {
			k: "Treatment enquiries",
			v: "+212%"
		}],
		next: "Productizing wellness retreats with paid amplification."
	}
];
function Counter({ value }) {
	const ref = useRef(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-50px"
	});
	const [display, setDisplay] = useState(value);
	useEffect(() => {
		if (!inView) return;
		const match = value.match(/^([^\d]*)(\d[\d,]*)([\s\S]*)$/);
		if (!match) {
			setDisplay(value);
			return;
		}
		const [, pre, num, post] = match;
		const target = parseInt(num.replace(/,/g, ""), 10);
		if (Number.isNaN(target)) {
			setDisplay(value);
			return;
		}
		const start = performance.now();
		const dur = 1200;
		let raf = 0;
		const tick = (t) => {
			const p = Math.min(1, (t - start) / dur);
			const eased = 1 - Math.pow(1 - p, 3);
			setDisplay(`${pre}${Math.round(target * eased).toLocaleString()}${post}`);
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [inView, value]);
	return /* @__PURE__ */ jsx("span", {
		ref,
		children: display
	});
}
function CaseStudies() {
	return /* @__PURE__ */ jsxs("section", {
		id: "work",
		className: "section-pad relative bg-ink text-background overflow-hidden",
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute inset-0 opacity-[0.05]",
			style: { backgroundImage: "radial-gradient(circle at 20% 10%, #7CC7A5 0%, transparent 40%), radial-gradient(circle at 80% 90%, #DFF4E8 0%, transparent 40%)" }
		}), /* @__PURE__ */ jsxs("div", {
			className: "container-tight relative",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-end justify-between flex-wrap gap-6 mb-16",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "eyebrow !text-mint mb-4",
						children: "Client transformations"
					}), /* @__PURE__ */ jsxs("h2", {
						className: "headline-lg text-background max-w-2xl",
						children: [
							"Real businesses. ",
							/* @__PURE__ */ jsx("em", {
								className: "italic text-mint/80",
								children: "Real numbers."
							}),
							" Real stories."
						]
					})] }), /* @__PURE__ */ jsx("p", {
						className: "text-background/60 max-w-sm",
						children: "Five featured journeys — each measured, documented, and still compounding today."
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "space-y-6",
					children: cases.map((c, i) => /* @__PURE__ */ jsx(motion.article, {
						initial: {
							opacity: 0,
							y: 30
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: {
							once: true,
							margin: "-100px"
						},
						transition: {
							duration: .8,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "group rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-colors p-6 md:p-10 backdrop-blur",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-14",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("div", {
									className: "text-xs uppercase tracking-[0.22em] text-mint/70",
									children: c.tag
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "font-display text-3xl md:text-4xl mt-3 text-background",
									children: c.name
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "num text-xs text-background/40 mt-4",
									children: ["CASE · 0", i + 1]
								})
							] }), /* @__PURE__ */ jsxs("div", {
								className: "space-y-5",
								children: [
									/* @__PURE__ */ jsx(Row, {
										label: "Start",
										text: c.start
									}),
									/* @__PURE__ */ jsx(Row, {
										label: "Action",
										text: c.action
									}),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "eyebrow !text-mint/80 mb-3",
										children: "Result"
									}), /* @__PURE__ */ jsx("div", {
										className: "grid grid-cols-2 md:grid-cols-3 gap-3",
										children: c.result.map((r) => /* @__PURE__ */ jsxs("div", {
											className: "rounded-xl border border-white/10 bg-black/30 p-4",
											children: [/* @__PURE__ */ jsx("div", {
												className: "num text-2xl text-background",
												children: /* @__PURE__ */ jsx(Counter, { value: r.v })
											}), /* @__PURE__ */ jsx("div", {
												className: "text-[10px] uppercase tracking-widest text-background/50 mt-1",
												children: r.k
											})]
										}, r.k))
									})] }),
									/* @__PURE__ */ jsx(Row, {
										label: "Next",
										text: c.next
									})
								]
							})]
						})
					}, c.name))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-14 text-center",
					children: /* @__PURE__ */ jsxs("a", {
						href: "#contact",
						className: "inline-flex items-center gap-2 text-mint/90 hover:text-mint border-b border-mint/40 pb-1",
						children: ["Want a story like these? Let's talk ", /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-4 h-4" })]
					})
				})
			]
		})]
	});
}
function Row({ label, text }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-[80px_1fr] gap-4 items-start",
		children: [/* @__PURE__ */ jsx("div", {
			className: "eyebrow !text-mint/80",
			children: label
		}), /* @__PURE__ */ jsx("p", {
			className: "text-background/80 leading-relaxed",
			children: text
		})]
	});
}
//#endregion
//#region src/components/site/Dashboard.tsx
var traffic = [
	{
		m: "Nov",
		v: 500
	},
	{
		m: "Dec",
		v: 1200
	},
	{
		m: "Jan",
		v: 2100
	},
	{
		m: "Feb",
		v: 3100
	},
	{
		m: "Mar",
		v: 4200
	},
	{
		m: "Apr",
		v: 5023
	},
	{
		m: "May",
		v: 6234
	},
	{
		m: "Jun",
		v: 8412
	}
];
var leads = [
	{
		m: "Nov",
		v: 18
	},
	{
		m: "Dec",
		v: 26
	},
	{
		m: "Jan",
		v: 38
	},
	{
		m: "Feb",
		v: 55
	},
	{
		m: "Mar",
		v: 78
	},
	{
		m: "Apr",
		v: 104
	},
	{
		m: "May",
		v: 142
	},
	{
		m: "Jun",
		v: 179
	}
];
var reach = [
	{
		m: "W1",
		v: 22
	},
	{
		m: "W2",
		v: 38
	},
	{
		m: "W3",
		v: 31
	},
	{
		m: "W4",
		v: 52
	},
	{
		m: "W5",
		v: 64
	},
	{
		m: "W6",
		v: 78
	},
	{
		m: "W7",
		v: 92
	}
];
var CustomTooltip = ({ active, payload, label }) => {
	const value = payload?.[0]?.value;
	const displayValue = typeof value === "number" ? value.toLocaleString() : value ?? "—";
	if (active && payload && payload.length) return /* @__PURE__ */ jsxs("div", {
		style: {
			background: "#0E1412",
			padding: "10px 14px",
			borderRadius: "12px",
			color: "#F7FAF8",
			fontSize: "13px",
			boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
		},
		children: [/* @__PURE__ */ jsx("div", {
			style: {
				color: "#7CC7A5",
				marginBottom: "4px",
				fontWeight: 600,
				textTransform: "uppercase",
				fontSize: "11px",
				letterSpacing: "0.05em"
			},
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: "num",
			style: {
				fontSize: "16px",
				fontWeight: 500
			},
			children: displayValue
		})]
	});
	return null;
};
function Dashboard() {
	return /* @__PURE__ */ jsx("section", {
		className: "section-pad",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-tight",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-end justify-between flex-wrap gap-6 mb-12",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "eyebrow mb-4",
					children: "Live performance"
				}), /* @__PURE__ */ jsxs("h2", {
					className: "headline-lg max-w-2xl",
					children: ["Growth, ", /* @__PURE__ */ jsx("em", {
						className: "italic text-muted-foreground",
						children: "visible."
					})]
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 chip",
					children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent animate-pulse" }), "Aggregated · Last 8 months"]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid lg:grid-cols-[1.4fr_1fr] gap-5",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 24
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { duration: .7 },
					className: "rounded-3xl glass shadow-elev p-7",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-baseline justify-between mb-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "eyebrow",
							children: "Organic traffic"
						}), /* @__PURE__ */ jsx("div", {
							className: "num text-4xl text-ink mt-1",
							children: "8,412"
						})] }), /* @__PURE__ */ jsx("span", {
							className: "num text-sm text-accent",
							children: "+312% YoY"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "h-64 -mx-2",
						children: /* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ jsxs(AreaChart, {
								data: traffic,
								children: [
									/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
										id: "gT",
										x1: "0",
										x2: "0",
										y1: "0",
										y2: "1",
										children: [/* @__PURE__ */ jsx("stop", {
											offset: "0%",
											stopColor: "#7CC7A5",
											stopOpacity: "0.55"
										}), /* @__PURE__ */ jsx("stop", {
											offset: "100%",
											stopColor: "#7CC7A5",
											stopOpacity: "0"
										})]
									}) }),
									/* @__PURE__ */ jsx(CartesianGrid, {
										stroke: "rgba(14,20,18,0.06)",
										vertical: false
									}),
									/* @__PURE__ */ jsx(XAxis, {
										dataKey: "m",
										axisLine: false,
										tickLine: false,
										tick: {
											fill: "#5B6661",
											fontSize: 11
										}
									}),
									/* @__PURE__ */ jsx(YAxis, { hide: true }),
									/* @__PURE__ */ jsx(Tooltip, {
										content: /* @__PURE__ */ jsx(CustomTooltip, {}),
										cursor: {
											stroke: "rgba(124, 199, 165, 0.4)",
											strokeWidth: 1,
											strokeDasharray: "4 4"
										}
									}),
									/* @__PURE__ */ jsx(Area, {
										type: "monotone",
										dataKey: "v",
										stroke: "#0E1412",
										strokeWidth: 2,
										fill: "url(#gT)",
										activeDot: {
											r: 6,
											fill: "#0E1412",
											stroke: "#7CC7A5",
											strokeWidth: 2
										}
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid gap-5",
					children: [/* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 24
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .7,
							delay: .1
						},
						className: "rounded-3xl bg-ink text-background p-6",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "eyebrow !text-mint/70",
								children: "Engagement"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "num text-3xl mt-1",
								children: "8.4%"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-xs opacity-60 mt-1",
								children: "vs 1.9% industry avg"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "h-20 mt-3",
								children: /* @__PURE__ */ jsx(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ jsx(LineChart, {
										data: reach,
										children: /* @__PURE__ */ jsx(Line, {
											type: "monotone",
											dataKey: "v",
											stroke: "#7CC7A5",
											strokeWidth: 2,
											dot: false
										})
									})
								})
							})
						]
					}), /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 24
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .7,
							delay: .2
						},
						className: "rounded-3xl glass p-6",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "eyebrow",
								children: "Qualified leads"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "num text-3xl text-ink mt-1",
								children: "179 / mo"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "h-20 mt-3",
								children: /* @__PURE__ */ jsx(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ jsxs(BarChart, {
										data: leads,
										children: [/* @__PURE__ */ jsx(Tooltip, {
											content: /* @__PURE__ */ jsx(CustomTooltip, {}),
											cursor: { fill: "rgba(14,20,18,0.04)" }
										}), /* @__PURE__ */ jsx(Bar, {
											dataKey: "v",
											fill: "#0E1412",
											radius: [
												3,
												3,
												0,
												0
											]
										})]
									})
								})
							})
						]
					})]
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/site/Compare.tsx
var rows = [
	{
		k: "Strategy",
		a: "Tactical, channel-by-channel",
		b: "End-to-end growth roadmap"
	},
	{
		k: "Support",
		a: "Slow, ticket-based",
		b: "Direct line, same-day replies"
	},
	{
		k: "Reports",
		a: "Vanity metrics",
		b: "Pipeline, CAC, LTV, ROAS"
	},
	{
		k: "Optimization",
		a: "Set and forget",
		b: "Weekly review & iterate"
	},
	{
		k: "Execution",
		a: "Hand-off, you figure it out",
		b: "Owned end-to-end, shipped fast"
	}
];
function Compare() {
	return /* @__PURE__ */ jsx("section", {
		className: "section-pad bg-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-tight",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "max-w-2xl mb-14",
				children: [/* @__PURE__ */ jsx("div", {
					className: "eyebrow mb-4",
					children: "Why clients choose us"
				}), /* @__PURE__ */ jsxs("h2", {
					className: "headline-lg",
					children: ["Not a freelancer. ", /* @__PURE__ */ jsx("em", {
						className: "italic text-muted-foreground",
						children: "A growth partner."
					})]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "rounded-3xl border border-line overflow-hidden bg-card shadow-soft",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-[1fr_1fr_1.2fr] text-xs uppercase tracking-widest text-muted-foreground bg-muted/40 border-b border-line",
					children: [
						/* @__PURE__ */ jsx("div", { className: "p-5" }),
						/* @__PURE__ */ jsx("div", {
							className: "p-5 border-l border-line",
							children: "Typical freelancer"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "p-5 border-l border-line bg-gradient-to-r from-mint/40 to-mint/60 text-ink",
							children: "Growth partner"
						})
					]
				}), rows.map((r, i) => /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						delay: i * .05,
						duration: .5
					},
					className: "grid grid-cols-[1fr_1fr_1.2fr] border-b border-line last:border-0 items-stretch",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "p-5 font-display text-xl text-ink",
							children: r.k
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "p-5 border-l border-line text-sm text-muted-foreground flex items-start gap-2",
							children: [
								/* @__PURE__ */ jsx(X, { className: "w-4 h-4 mt-0.5 shrink-0 opacity-50" }),
								" ",
								r.a
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "p-5 border-l border-line text-sm text-ink flex items-start gap-2 bg-mint/10",
							children: [
								/* @__PURE__ */ jsx(Check, { className: "w-4 h-4 mt-0.5 shrink-0 text-accent" }),
								" ",
								r.b
							]
						})
					]
				}, r.k))]
			})]
		})
	});
}
//#endregion
//#region src/components/site/Testimonials.tsx
var items = [
	{
		quote: "He didn't just build us a website — he gave us a way to grow. Six months in, we're booking more patients than ever.",
		name: "Dr. Pavana",
		role: "Akshaya Medical Centre"
	},
	{
		quote: "Our revenue moved from ₹1.9L to ₹3L in two months. The content strategy alone changed how the city sees us.",
		name: "Mrs. Pavithra",
		role: "Ayoham Dining"
	},
	{
		quote: "Strategic, sharp, and genuinely invested. Feels less like a vendor and more like a co-founder.",
		name: "Inversa Technosoft",
		role: "Leadership"
	}
];
function Testimonials() {
	const [i, setI] = useState(0);
	const t = items[i];
	return /* @__PURE__ */ jsx("section", {
		className: "section-pad relative overflow-hidden",
		style: { background: "linear-gradient(180deg, var(--background), #F0F8F3)" },
		children: /* @__PURE__ */ jsxs("div", {
			className: "container-tight",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-end justify-between gap-6 mb-12 flex-wrap",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "eyebrow mb-4",
						children: "In their words"
					}), /* @__PURE__ */ jsxs("h2", {
						className: "headline-lg",
						children: ["Founders, in ", /* @__PURE__ */ jsx("em", {
							className: "italic text-muted-foreground",
							children: "their own words."
						})]
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => setI((i - 1 + items.length) % items.length),
							className: "w-10 h-10 rounded-full border border-line bg-card grid place-items-center hover:bg-mint/40",
							children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" })
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setI((i + 1) % items.length),
							className: "w-10 h-10 rounded-full border border-line bg-card grid place-items-center hover:bg-mint/40",
							children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
						})]
					})]
				}),
				/* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .6 },
					className: "rounded-3xl glass shadow-elev p-8 md:p-14 max-w-4xl",
					children: [
						/* @__PURE__ */ jsx(Quote, { className: "w-10 h-10 text-accent/60" }),
						/* @__PURE__ */ jsxs("p", {
							className: "font-display text-3xl md:text-4xl leading-tight mt-6 text-ink text-balance",
							children: [
								"\"",
								t.quote,
								"\""
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 flex items-center gap-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-12 h-12 rounded-full bg-gradient-to-br from-mint to-accent grid place-items-center font-display text-ink text-lg",
								children: t.name.charAt(0)
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-ink font-medium",
								children: t.name
							}), /* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground",
								children: t.role
							})] })]
						})
					]
				}, i),
				/* @__PURE__ */ jsx("div", {
					className: "flex gap-2 mt-6",
					children: items.map((_, idx) => /* @__PURE__ */ jsx("button", {
						onClick: () => setI(idx),
						className: `h-1 rounded-full transition-all ${idx === i ? "w-10 bg-ink" : "w-4 bg-line"}`
					}, idx))
				})
			]
		})
	});
}
//#endregion
//#region src/components/site/CTA.tsx
function CTA() {
	const particles = Array.from({ length: 48 }, (_, i) => ({
		x: i * 37 % 100,
		y: i * 53 % 100,
		s: i * 13 % 4 + 1,
		d: i * 7 % 6 + 4,
		delay: i % 10 * .3
	}));
	return /* @__PURE__ */ jsxs("section", {
		id: "contact",
		className: "section-pad relative overflow-hidden bg-ink text-background",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "absolute inset-0",
			children: [/* @__PURE__ */ jsx("div", {
				className: "absolute -top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-40",
				style: { background: "radial-gradient(circle, #7CC7A5 0%, transparent 60%)" }
			}), particles.map((p, i) => /* @__PURE__ */ jsx(motion.span, {
				initial: { opacity: 0 },
				animate: {
					opacity: [
						0,
						.7,
						0
					],
					y: [-20, -120]
				},
				transition: {
					duration: p.d,
					repeat: Infinity,
					delay: p.delay,
					ease: "easeInOut"
				},
				className: "absolute rounded-full bg-mint",
				style: {
					left: `${p.x}%`,
					top: `${p.y}%`,
					width: p.s,
					height: p.s
				}
			}, i))]
		}), /* @__PURE__ */ jsxs("div", {
			className: "container-tight relative text-center",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "chip mx-auto !bg-white/10 !text-mint !border-white/10",
					children: "Open for new partnerships"
				}),
				/* @__PURE__ */ jsxs("h2", {
					className: "headline-xl mt-8 text-background text-balance",
					children: ["Your growth story ", /* @__PURE__ */ jsx("em", {
						className: "italic text-mint",
						children: "could be next."
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-6 text-background/70 max-w-xl mx-auto text-lg",
					children: "Every business starts somewhere. The brands above were once exactly where you are. Let's map the road from here."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-10 flex flex-wrap gap-3 justify-center",
					children: [/* @__PURE__ */ jsxs("a", {
						href: "mailto:hari@growthstudio.com",
						className: "btn-primary !bg-mint !text-ink hover:!bg-white",
						children: ["Start your journey ", /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-4 h-4" })]
					}), /* @__PURE__ */ jsx("a", {
						href: "#work",
						className: "btn-ghost !bg-white/5 !border-white/15 !text-background hover:!bg-white/10",
						children: "View case studies"
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/site/Footer.tsx
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "border-t border-line bg-background",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "container-tight py-14 grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ jsx("span", {
						className: "grid place-items-center w-9 h-9 rounded-full bg-ink text-background font-display",
						children: "g"
					}), /* @__PURE__ */ jsx("div", {
						className: "font-display text-lg text-ink",
						children: "Growth Studio"
					})]
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-4 text-sm text-muted-foreground max-w-xs",
					children: "A one-person growth practice for businesses that want measurable outcomes, not deliverables."
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("div", {
						className: "eyebrow mb-3",
						children: "Contact"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "mailto:hari@growthstudio.com",
						className: "block text-sm text-ink hover:text-accent",
						children: "hari@growthstudio.com"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "tel:+919344260752",
						className: "block text-sm text-ink mt-1.5 hover:text-accent",
						children: "+91 9344260752"
					})
				] }),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("div", {
						className: "eyebrow mb-3",
						children: "Location"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-sm text-ink",
						children: "Bengaluru, India"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-sm text-muted-foreground",
						children: "Working globally · Remote-first"
					})
				] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "eyebrow mb-3",
					children: "Elsewhere"
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-1.5 text-sm",
					children: [
						/* @__PURE__ */ jsx("a", {
							className: "block text-ink hover:text-accent",
							href: "#",
							children: "Instagram"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "block text-ink hover:text-accent",
							href: "#",
							children: "LinkedIn"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "block text-ink hover:text-accent",
							href: "#",
							children: "X / Twitter"
						})
					]
				})] })
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "border-t border-line",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-tight py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Growth Studio. All rights reserved."
				] }), /* @__PURE__ */ jsx("div", {
					className: "italic font-display text-sm text-ink",
					children: "Built with growth in mind."
				})]
			})
		})]
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function Index() {
	return /* @__PURE__ */ jsxs("main", {
		className: "bg-background text-foreground",
		children: [
			/* @__PURE__ */ jsx(Nav, {}),
			/* @__PURE__ */ jsx(Hero, {}),
			/* @__PURE__ */ jsx(Philosophy, {}),
			/* @__PURE__ */ jsx(Services, {}),
			/* @__PURE__ */ jsx(Process, {}),
			/* @__PURE__ */ jsx(CaseStudies, {}),
			/* @__PURE__ */ jsx(Dashboard, {}),
			/* @__PURE__ */ jsx(Compare, {}),
			/* @__PURE__ */ jsx(Testimonials, {}),
			/* @__PURE__ */ jsx(CTA, {}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
export { Index as component };
