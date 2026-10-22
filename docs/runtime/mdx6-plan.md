# MDX deployment compatibility prerequisite

Separate bounded dependency plan on fix/next-mdx-remote-6. Vercel rejected current 5.0.0 with VULNERABLE_NEXTMDXREMOTE_VERSION; pin next-mdx-remote 6.0.0 and regenerate only required dependency lock entries. Keep Next/React stack and article API intact unless actual compatibility requires an adjustment. Retain both upstream JS-blocking defaults. No content/auth/DB changes.

Primary sources: [upstream 6.0.0 release](https://github.com/hashicorp/next-mdx-remote/releases/tag/v6.0.0), [versioned upstream README](https://github.com/hashicorp/next-mdx-remote/blob/v6.0.0/README.md). RSC still supports MDXRemote source/options and rehype plugins; 6.0.0 defaults blockJS and blockDangerousJS to true.

Validation: rich article rendering fixture with emphasis/list/link/fenced highlighted code; JS expression suppression; full actual archive build on combined brand source; lint/type checks. Keep synthetic fixtures safe. Parent reviews concrete diff and security-related dependency change before restaging. No bypass of Vercel gate.
