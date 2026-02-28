import './utils-FiC4zhrQ.js';

async function load({ fetch, params }) {
  const fetchOptions = { credentials: "include" };
  try {
    const ticketsRes = await fetch(`/api/admin/guilds/${params.guild}/tickets?limit=100`, fetchOptions);
    const tickets = ticketsRes.ok ? await ticketsRes.json() : [];
    const transcripts = Array.isArray(tickets) ? tickets.filter((t) => t.transcript) : [];
    return {
      transcripts,
      totalTranscripts: transcripts.length
    };
  } catch (err) {
    console.error("Failed to load transcripts:", err);
    return {
      transcripts: [],
      totalTranscripts: 0
    };
  }
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 24;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-YdevZ35h.js')).default;
const universal_id = "src/routes/settings/[guild]/transcripts/+page.js";
const imports = ["_app/immutable/nodes/24.D3uAdzGI.js","_app/immutable/chunks/B17Q6ahh.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/_fu6EM7d.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DbFbsu9R.js","_app/immutable/chunks/BkvMZOlF.js","_app/immutable/chunks/Caq5s-y_.js","_app/immutable/chunks/CdfWQzPM.js","_app/immutable/chunks/BZKIRd09.js","_app/immutable/chunks/B_DfNNzh.js","_app/immutable/chunks/CG3JaKlL.js","_app/immutable/chunks/DD97wVFk.js","_app/immutable/chunks/CzA9-LZ0.js","_app/immutable/chunks/B4e910Rm.js","_app/immutable/chunks/DDudHFlX.js","_app/immutable/chunks/Bhd2hp12.js","_app/immutable/chunks/nwo5WiIq.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/chunks/BD2RfKcQ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=24-CeIHunNo.js.map
