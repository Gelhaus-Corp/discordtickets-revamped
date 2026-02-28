const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'src', 'routes', 'api', 'admin', 'guilds', '[guild]', 'tickets', '[ticket]', 'transcript.js');
let s = fs.readFileSync(p, 'utf8');
const oldRequire = "const { generateHtmlTranscript } = require('../../../../../../lib/tickets/transcript-html');";
const newRequire = "const { generateHtmlTranscript } = require(path.join(process.cwd(), 'src', 'lib', 'tickets', 'transcript-html'));";
if (s.indexOf(oldRequire) !== -1) s = s.replace(oldRequire, newRequire);

const findPattern = /\t\t\/\/ Validate ticket belongs to guild[\s\S]*?where: \{ id: ticketId \},\n\t\t\);\n/;
if (findPattern.test(s)) {
    const replacement = `\t\t// Validate ticket belongs to guild\n\t\tlet ticket;\n\t\ttry {\n\t\t\tticket = await client.prisma.ticket.findUnique({\n\t\t\t\tselect: {\n\t\t\t\t\tguildId: true,\n\t\t\t\t\thtmlTranscript: true,\n\t\t\t\t\tid: true,\n\t\t\t\t\tnumber: true,\n\t\t\t\t\topen: true,\n\t\t\t\t},\n\t\t\t\twhere: { id: ticketId },\n\t\t\t});\n\t\t} catch (err) {\n\t\t\t// If DB schema is older (missing `htmlTranscript`), retry with a reduced select\n\t\t\tif (err && (err.code === 'P2022' || /does not exist/.test(String(err.message)))) {\n\t\t\t\tticket = await client.prisma.ticket.findUnique({ select: { guildId: true, id: true, number: true, open: true }, where: { id: ticketId } });\n\t\t\t} else throw err;\n\t\t}\n`;
    s = s.replace(findPattern, replacement);
}
fs.writeFileSync(p, s, 'utf8');
console.log('patched', p);
