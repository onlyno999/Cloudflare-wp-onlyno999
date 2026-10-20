let 変換='vl', 変換貳='ess', 標識='://';
import { connect as 接続 } from 'cloudflare:sockets';
let 識別子='d342d11e-d424-4583-b36e-524ab1f0afa4';
let 代理網='wok.woxxxxxx.nyc.mn';
let 代理端=443;
let 優選址='https://bestcf.pages.dev/wetest/ipv4.txt,https://raw.githubusercontent.com/Senflare/Senflare-IP/refs/heads/main/Senflare-Pro.txt';

async function 偽裝頁() {
  return new Response('Hello World!', { status: 200, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

const 知能網 = ['openai.com','chatgpt.com','oaistatic.com','oaiusercontent.com','anthropic.com','claude.ai','gemini.google.com','generativelanguage.googleapis.com','ai.google.dev','x.ai','grok.com','copilot.microsoft.com','sydney.bing.com','perplexity.ai','poe.com'];

function 判定知能(領域) {
  if (!領域 || typeof 領域 !== 'string') return false;
  const 下 = 領域.toLowerCase();
  return 知能網.some(鍵 => 下.includes(鍵));
}

async function 解析六(領域) {
  if (!領域 || /^(?:\d{1,3}\.){3}\d{1,3}$/.test(領域) || 領域.includes(':')) return 領域;
  try {
    const 答 = await fetch(`https://1.1.1.1/dns-query?name=${encodeURIComponent(領域)}&type=AAAA`, { headers: { 'accept': 'application/dns-json' }, cf: { cacheTtl: 300 } });
    if (!答.ok) return 領域;
    const 據 = await 答.json();
    const 錄 = 據.Answer?.filter(甲 => 甲.type === 28);
    if (錄 && 錄.length > 0) {
      const 址 = 錄[Math.floor(Math.random() * 錄.length)].data;
      return 址.startsWith('[') ? 址 : `[${址}]`;
    }
  } catch (錯) {}
  return 領域;
}

if (!確認標識(識別子)) throw new Error('uuid is not valid');

export default {
  async fetch(求, 境, 脈) {
    try {
      識別子 = 境.UUID || 識別子;
      if (境.PROXYIP) 代理網 = 境.PROXYIP.trim();
      let 隱 = false, 嘲 = "哎呀你找到了我，但是我就是不给你看，气不气，嘿嘿嘿"; 
      if (境.HIDE !== undefined) 隱 = 境.HIDE === 'true';
      else if (境.HIDE_SUBSCRIPTION !== undefined) 隱 = 境.HIDE_SUBSCRIPTION === 'true';
      else if (境.隐藏 !== undefined) 隱 = 境.隐藏 === 'true';
      if (境.SARCASM_MESSAGE !== undefined) 嘲 = 境.SARCASM_MESSAGE;
      else if (境.嘲讽语 !== undefined) 嘲 = 境.嘲讽语;

      const 昇 = 求.headers.get('Upgrade');
      if (!昇 || 昇 !== 'websocket') {
        const 址 = new URL(求.url);
        switch (址.pathname) {
          case '/': return 偽裝頁(); 
          case `/${識別子}`: {
            if (隱) return new Response(嘲, { status: 200, headers: { "Content-Type": "text/plain;charset=utf-8" } });
            else return new Response(`${await 取配(識別子, 求.headers.get('Host'))}`, { status: 200, headers: { "Content-Type": "text/plain;charset=utf-8" } });
          }
          default:
            if (址.pathname.startsWith('/proxyip=')) {
              try {
                const 時 = decodeURIComponent(址.pathname.substring(9)).trim();
                if (時) { 代理網 = 時; return new Response(`臨時成功切換: ${代理網}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }); }
              } catch (錯) {}
            }
            return new Response('Not found', { status: 404 });
        }
      } else {
        const 址 = new URL(求.url);
        let 徑 = null;
        if (址.pathname.startsWith('/proxyip=')) try { 徑 = decodeURIComponent(址.pathname.substring(9)).trim(); } catch (錯) {}
        return await 協定處理(求, 徑 || 址.searchParams.get('proxyip') || 代理網);
      }
    } catch (錯) { return new Response(錯.toString()); }
  },
};

function 析址(串) {
    if (!串) return null;
    串 = 串.trim();
    if (串.startsWith('socks://') || 串.startsWith('socks5://')) {
        try {
            const 址 = new URL(串.replace(/^socks:\/\//, 'socks5://'));
            return { type: 'socks5', host: 址.hostname, port: parseInt(址.port) || 1080, username: 址.username ? decodeURIComponent(址.username) : '', password: 址.password ? decodeURIComponent(址.password) : '' };
        } catch (錯) { return null; }
    }
    if (串.startsWith('http://') || 串.startsWith('https://')) {
        try {
            const 址 = new URL(串);
            return { type: 'http', host: 址.hostname, port: parseInt(址.port) || (串.startsWith('https://') ? 443 : 80), username: 址.username ? decodeURIComponent(址.username) : '', password: 址.password ? decodeURIComponent(址.password) : '' };
        } catch (錯) { return null; }
    }
    if (串.startsWith('[')) {
        const 括 = 串.indexOf(']');
        if (括 > 0) {
            const 機 = 串.substring(1, 括), 餘 = 串.substring(括 + 1);
            if (餘.startsWith(':')) { const 端 = parseInt(餘.substring(1), 10); if (!isNaN(端) && 端 > 0 && 端 <= 65535) return { type: 'direct', host: 機, port: 端 }; }
            return { type: 'direct', host: 機, port: 443 };
        }
    }
    const 冒 = 串.lastIndexOf(':');
    if (冒 > 0) {
        const 機 = 串.substring(0, 冒), 端 = parseInt(串.substring(冒 + 1), 10);
        if (!isNaN(端) && 端 > 0 && 端 <= 65535) return { type: 'direct', host: 機, port: 端 };
    }
    return { type: 'direct', host: 串, port: 443 };
}

async function 接靴下(配, 機, 端, 始) {
    const { host: 宿, port: 門, username: 名, password: 密 } = 配, 網 = 接続({ hostname: 宿, port: 門 }), 寫 = 網.writable.getWriter(), 讀 = 網.readable.getReader();
    try {
        await 寫.write(名 && 密 ? new Uint8Array([0x05, 0x02, 0x00, 0x02]) : new Uint8Array([0x05, 0x01, 0x00]));
        const 答 = await 讀.read();
        if (答.done || 答.value.byteLength < 2) throw new Error('S5敗');
        const 法 = new Uint8Array(答.value)[1];
        if (法 === 0x02) {
            const 名元 = new TextEncoder().encode(名), 密元 = new TextEncoder().encode(密), 認 = new Uint8Array(3 + 名元.length + 密元.length);
            認[0] = 0x01; 認[1] = 名元.length; 認.set(名元, 2); 認[2 + 名元.length] = 密元.length; 認.set(密元, 3 + 名元.length);
            await 寫.write(認);
            const 認答 = await 讀.read();
            if (認答.done || new Uint8Array(認答.value)[1] !== 0x00) throw new Error('S5認敗');
        }
        const 機元 = new TextEncoder().encode(機), 連 = new Uint8Array(7 + 機元.length);
        連[0] = 0x05; 連[1] = 0x01; 連[2] = 0x00; 連[3] = 0x03; 連[4] = 機元.length; 連.set(機元, 5); new DataView(連.buffer).setUint16(5 + 機元.length, 端, false);
        await 寫.write(連);
        const 連答 = await 讀.read();
        if (連答.done || new Uint8Array(連答.value)[1] !== 0x00) throw new Error('S5連敗');
        await 寫.write(始); 寫.releaseLock(); 讀.releaseLock(); return 網;
    } catch (錯) { 寫.releaseLock(); 讀.releaseLock(); 網.close(); throw 錯; }
}

async function 接網頁(配, 機, 端, 始) {
    const { host: 宿, port: 門, username: 名, password: 密 } = 配, 網 = 接続({ hostname: 宿, port: 門 }), 寫 = 網.writable.getWriter(), 讀 = 網.readable.getReader();
    try {
        let 求 = `CONNECT ${機}:${端} HTTP/1.1\r\nHost: ${機}:${端}\r\n`;
        if (名 && 密) 求 += `Proxy-Authorization: Basic ${btoa(`${名}:${密}`)}\r\n`;
        await 寫.write(new TextEncoder().encode(求 + `User-Agent: Mozilla/5.0\r\nConnection: keep-alive\r\n\r\n`));
        let 衝 = new Uint8Array(0), 頭 = -1;
        while (頭 === -1 && 衝.length < 8192) {
            const { done: 完, value: 值 } = await 讀.read();
            if (完) throw new Error('斷');
            const 新 = new Uint8Array(衝.length + 值.length); 新.set(衝); 新.set(值, 衝.length); 衝 = 新;
            for (let i = 0; i < 衝.length - 3; i++) if (衝[i] === 0x0d && 衝[i + 1] === 0x0a && 衝[i + 2] === 0x0d && 衝[i + 3] === 0x0a) { 頭 = i + 4; break; }
        }
        const 態 = parseInt(new TextDecoder().decode(衝.slice(0, 頭)).split('\r\n')[0].match(/HTTP\/\d\.\d\s+(\d+)/)?.[1] || '0');
        if (態 < 200 || 態 >= 300) throw new Error('HTTP敗');
        await 寫.write(始); 寫.releaseLock(); 讀.releaseLock(); return 網;
    } catch (錯) { try{寫.releaseLock();}catch(e){} try{讀.releaseLock();}catch(e){} 網.close(); throw 錯; }
}

async function 協定處理(求, 運配) {
	const 雙 = new WebSocketPair(), 客 = 雙[0], 伺 = 雙[1]; 伺.accept();
	let 殼 = { value: null }, 查 = false;
	造流(伺, 求.headers.get('sec-websocket-protocol') || '').pipeTo(new WritableStream({
		async write(塊) {
			if (查) return await 解名(塊, 伺, null);
			if (殼.value) { const 寫 = 殼.value.writable.getWriter(); await 寫.write(塊); 寫.releaseLock(); return; }
			const { 錯, 息, 類, 端, 址, 引, 本, Ｕ } = 處頭(塊, 識別子);
			if (錯) { 關(伺); throw new Error(息); }
			if (Ｕ) { if (端 === 53) 查 = true; else { 關(伺); throw new Error('UDP僅DNS'); } }
			const 回 = new Uint8Array([本[0], 0]), 始 = 塊.slice(引);
			if (查) return 解名(始, 伺, 回);
			await 處出(殼, 類, 址, 端, 始, 伺, 回, 運配);
		}
	})).catch(() => {});
	return new Response(null, { status: 101, webSocket: 客 });
}

async function 處出(殼, 類, 址, 端, 始, 伺, 回, 運配) {
	async function 直(地, 門, 據) {
		const 宿 = 類 === 2 && 判定知能(地) ? await 解析六(地) : 地, 網 = 接続({ hostname: 宿, port: 門 });
		殼.value = 網; const 寫 = 網.writable.getWriter(); await 寫.write(據); 寫.releaseLock(); return 網;
	}
	async function 轉(配, 據) {
		const 網 = 配.type === 'socks5' ? await 接靴下(配, 址, 端, 據) : (配.type === 'http' || 配.type === 'https' ? await 接網頁(配, 址, 端, 據) : await 直(配.host, 配.port, 據));
		殼.value = 網; return 網;
	}
	const 析 = 析址(運配), 強 = 析 && (析.type === 'socks5' || 析.type === 'http');
	async function 退() {
		try {
			const 備 = 強 ? await 直(址, 端, 始) : (析 ? await 轉(析, 始) : null);
			if (備) { 備.closed.catch(()=>{}).finally(()=>關(伺)); 連流(備, 伺, 回, null); }
		} catch (錯) { 關(伺); }
	}
	try {
		const 網 = 強 ? await 轉(析, 始) : await 直(址, 端, 始);
		網.closed.catch(()=>{}).finally(()=>關(伺)); 連流(網, 伺, 回, 退);
	} catch (錯) { await 退(); }
}

function 造流(伺, 早) {
	let 銷 = false;
	return new ReadableStream({
		start(控) {
			伺.addEventListener('message', (事) => { if (!銷) 控.enqueue(事.data); });
			伺.addEventListener('close', () => { 關(伺); if (!銷) 控.close(); });
			伺.addEventListener('error', (錯) => 控.error(錯));
			const { 早據, 錯 } = 解基(早); if (錯) 控.error(錯); else if (早據) 控.enqueue(早據);
		},
		cancel() { 銷 = true; 關(伺); }
	});
}

function 處頭(衝, 識) {
	if (衝.byteLength < 24) return { 錯: true, 息: '無效' };
	const 本 = new Uint8Array(衝.slice(0, 1)), 命 = new Uint8Array(衝.slice(18 + new Uint8Array(衝.slice(17, 18))[0], 18 + new Uint8Array(衝.slice(17, 18))[0] + 1))[0];
	if (字化(new Uint8Array(衝.slice(1, 17))) !== 識) return { 錯: true, 息: '非用' };
	const 引 = 18 + new Uint8Array(衝.slice(17, 18))[0] + 1, 端 = new DataView(衝.slice(引, 引 + 2)).getUint16(0), 類 = new Uint8Array(衝.slice(引 + 2, 引 + 3))[0];
	let 長 = 0, 值引 = 引 + 3, 值 = '';
	if (類 === 1) { 長 = 4; 值 = new Uint8Array(衝.slice(值引, 值引 + 長)).join('.'); }
	else if (類 === 2) { 長 = new Uint8Array(衝.slice(值引, 值引 + 1))[0]; 值引++; 值 = new TextDecoder().decode(衝.slice(值引, 值引 + 長)); }
	else if (類 === 3) { 長 = 16; const 視 = new DataView(衝.slice(值引, 值引 + 長)), 六 = []; for (let i = 0; i < 8; i++) 六.push(視.getUint16(i * 2).toString(16)); 值 = 六.join(':'); }
	return { 錯: false, 址: 值, 類, 端, 引: 值引 + 長, 本, Ｕ: 命 === 2 };
}

async function 連流(遠, 伺, 回, 試) {
	let 頭 = 回, 入 = false;
	await 遠.readable.pipeTo(new WritableStream({
		async write(塊) { 入 = true; if (頭) { 伺.send(await new Blob([頭, 塊]).arrayBuffer()); 頭 = null; } else 伺.send(塊); }
	})).catch(() => 關(伺));
	if (!入 && 試) 試();
}

function 解基(串) { try { return { 早據: Uint8Array.from(atob(串.replace(/-/g, '+').replace(/_/g, '/')), 符 => 符.charCodeAt(0)).buffer, 錯: null }; } catch (錯) { return { 錯 }; } }
function 確認標識(識) { return /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(識); }
function 關(網) { try { if (網.readyState === 1 || 網.readyState === 2) 網.close(); } catch (錯) {} }
const 轉十 = Array.from({ length: 256 }, (_, i) => (i + 256).toString(16).slice(1));
function 字化(陣) { return (轉十[陣[0]]+轉十[陣[1]]+轉十[陣[2]]+轉十[陣[3]]+"-"+轉十[陣[4]]+轉十[陣[5]]+"-"+轉十[陣[6]]+轉十[陣[7]]+"-"+轉十[陣[8]]+轉十[陣[9]]+"-"+轉十[陣[10]]+轉十[陣[11]]+轉十[陣[12]]+轉十[陣[13]]+轉十[陣[14]]+轉十[陣[15]]).toLowerCase(); }

async function 解名(塊, 伺, 回) {
	try {
		let 頭 = 回; const 網 = 接続({ hostname: '8.8.8.8', port: 53 }), 寫 = 網.writable.getWriter();
		await 寫.write(塊); 寫.releaseLock();
		await 網.readable.pipeTo(new WritableStream({
			async write(段) { if (頭) { 伺.send(await new Blob([頭, 段]).arrayBuffer()); 頭 = null; } else 伺.send(段); }
		}));
	} catch (錯) {}
}

async function 取配(識, 機) {
    let 結 = [`${変換}${変換貳}${標識}${識}@${機}:443?encryption=none&security=tls&sni=${機}&fp=randomized&type=ws&host=${機}&path=%2F%3Fed%3D2048#${encodeURIComponent(機)}`];
    if (優選址) {
        for (const 源 of 優選址.split(',').map(s => s.trim()).filter(Boolean)) {
            if (/^https?:\/\//i.test(源)) {
                try {
                    const 答 = await fetch(源, { cf: { cacheTtl: 300 } });
                    if (答.ok) for (let 行 of (await 答.text()).split('\n').map(l => l.trim()).filter(Boolean)) {
                        let 址 = 行, 門 = 443, 註 = 機; if (址.includes('#')) [址, 註] = 址.split('#').map(s=>s.trim());
                        const 配 = 址.match(/:(\d+)$/); if (配 && !址.startsWith('[')) { 門 = 配[1]; 址 = 址.replace(/:\d+$/, ''); }
                        結.push(`${変換}${変換貳}${標識}${識}@${址.includes(':') && !址.startsWith('[') ? `[${址}]` : 址}:${門}?encryption=none&security=tls&sni=${機}&fp=randomized&type=ws&host=${機}&path=%2F%3Fed%3D2048#${encodeURIComponent(註)}`);
                    }
                } catch (錯) {}
            } else {
                let 址 = 源, 門 = 443; const 配 = 址.match(/:(\d+)$/); if (配 && !址.startsWith('[')) { 門 = 配[1]; 址 = 址.replace(/:\d+$/, ''); }
                結.push(`${変換}${変換貳}${標識}${識}@${址.includes(':') && !址.startsWith('[') ? `[${址}]` : 址}:${門}?encryption=none&security=tls&sni=${機}&fp=randomized&type=ws&host=${機}&path=%2F%3Fed%3D2048#${encodeURIComponent(機 + " 優選")}`);
            }
        }
    }
    return btoa(結.join('\n'));
}
