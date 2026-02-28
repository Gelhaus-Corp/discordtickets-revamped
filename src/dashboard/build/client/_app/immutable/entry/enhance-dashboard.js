(function(){
  function byPath(regex){return window.location.pathname.match(regex);} 
  document.addEventListener('DOMContentLoaded', async function(){
    try{
      // Category editor enhancement
      var m = byPath(/^\/settings\/([^\/]+?)\/categories\/([^\/]+?)\/?$/);
      if(m){
        var guild = m[1]; var category = m[2];
        var form = document.querySelector('form'); if(!form) return;
        var [catRes, allRes] = await Promise.all([
          fetch('/api/admin/guilds/'+guild+'/categories/'+category, {credentials:'include'}),
          fetch('/api/admin/guilds/'+guild+'/categories', {credentials:'include'})
        ]);
        if(!catRes.ok) return;
        var cat = await catRes.json();
        var all = allRes.ok ? await allRes.json() : [];
        all = all.filter(c=>String(c.id)!==String(cat.id));
        var container = document.createElement('div');
        container.innerHTML = '<div><label class="font-medium">Channel mode<br><select id="dt_channelMode" class="input form-multiselect font-normal"><option value="">(default)</option><option value="CHANNEL">CHANNEL</option><option value="THREAD">THREAD</option><option value="FORUM">FORUM</option></select></label></div>' +
                              '<div><label class="font-medium">Backup category<br><select id="dt_backup" class="input form-multiselect font-normal"><option value="">(none)</option>' + all.map(c=>'<option value="'+c.id+'">'+(c.name||c.id)+'</option>').join('') + '</select></label></div>';
        var labels = Array.from(form.querySelectorAll('label'));
        var totalLabel = labels.find(l=>/Total limit/i.test(l.textContent));
        if(totalLabel && totalLabel.parentNode) totalLabel.parentNode.insertBefore(container, totalLabel.nextSibling);
        var selMode = document.getElementById('dt_channelMode');
        var selBackup = document.getElementById('dt_backup');
        if(selMode) selMode.value = cat.channelMode || '';
        if(selBackup) selBackup.value = cat.backupCategoryId || '';
        form.addEventListener('submit', async function(e){
          e.preventDefault(); e.stopImmediatePropagation();
          try{
            var url = window.location.pathname.includes('/new') ? '/api/admin/guilds/'+guild+'/categories' : '/api/admin/guilds/'+guild+'/categories/'+category;
            var existingRes = await fetch('/api/admin/guilds/'+guild+'/categories/'+category, {credentials:'include'});
            var payload = existingRes.ok ? await existingRes.json() : {};
            payload.channelMode = selMode ? (selMode.value || null) : payload.channelMode;
            payload.backupCategoryId = selBackup && selBackup.value ? Number(selBackup.value) : null;
            var inputs = form.querySelectorAll('input,textarea,select');
            inputs.forEach(function(i){ if(!i.name && !i.id) return; var key = i.name || i.id; if(key==='dt_channelMode' || key==='dt_backup') return; if(i.type==='checkbox') payload[key] = i.checked; else if(i.multiple) payload[key] = Array.from(i.selectedOptions).map(o=>o.value); else payload[key] = i.value; });
            var method = payload && payload.id ? 'PATCH' : 'POST';
            var resp = await fetch(url, {method: method, credentials:'include', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
            if(resp.ok) window.location='./'; else { var txt = await resp.text(); alert('Save failed: '+txt); }
          }catch(err){ console.error(err); alert('Save failed'); }
        }, true);
      }

      // Feedback fallback view
      var m2 = byPath(/^\/settings\/([^\/]+?)\/feedback\/?$/);
      if(m2){ var guild=m2[1]; var main = document.querySelector('main') || document.body; main.innerHTML = '<h1 class="m-4 text-center text-4xl font-bold">Feedback</h1><div id="dt_feedback">Loading…</div>'; try{ var res = await fetch('/api/admin/guilds/'+guild+'/feedback?limit=25&page=1',{credentials:'include'}); if(res.ok){ var body = await res.json(); var html = '<div class="mx-auto max-w-4xl p-4">'; if(body.feedback && body.feedback.length){ html += body.feedback.map(f=>'<div class="p-3 border rounded mb-2"><b>Ticket #'+(f.ticketNumber||f.ticketId)+'</b> — '+(f.rating||'')+'★<div class="small">'+(f.comment?String(f.comment):'')+'</div></div>').join(''); } else html += '<div class="small">No feedback</div>'; html += '</div>'; document.getElementById('dt_feedback').innerHTML = html; } }catch(e){} }
    }catch(e){console.error(e);}
  });
})();
