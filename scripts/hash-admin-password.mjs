import bcrypt from "bcryptjs";

function readHidden(prompt) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY || !process.stdout.isTTY) return reject(new Error("Run this command in an interactive terminal."));
    let value = "";
    process.stdout.write(prompt);
    process.stdin.setRawMode(true);
    process.stdin.setEncoding("utf8");
    process.stdin.resume();
    const cleanup = () => { process.stdin.setRawMode(false); process.stdin.pause(); process.stdin.removeListener("data", onData); };
    const onData = (character) => {
      if (character === "\u0003") { cleanup(); process.stdout.write("\n"); reject(new Error("Cancelled.")); return; }
      if (character === "\r" || character === "\n") { cleanup(); process.stdout.write("\n"); resolve(value); return; }
      if (character === "\u007f" || character === "\b") { if (value) { value = value.slice(0, -1); process.stdout.write("\b \b"); } return; }
      if (character >= " ") { value += character; process.stdout.write("*"); }
    };
    process.stdin.on("data", onData);
  });
}

try {
  const password = await readHidden("New admin password: ");
  const confirmation = await readHidden("Confirm password: ");
  if (password.length < 12) throw new Error("Use at least 12 characters.");
  if (password !== confirmation) throw new Error("Passwords did not match.");
  console.log("\nADMIN_PASSWORD_HASH=");
  console.log(await bcrypt.hash(password, 12));
  console.log("\nCopy only the hash into the private Vercel environment variable.");
} catch (error) {
  console.error(error instanceof Error ? error.message : "Unable to create the password hash.");
  process.exitCode = 1;
}
