/*! Civil Engineering Learning Tools · © 2026 Rasmus Mott Frandsen. All rights reserved. Published build; copying, modifying or redistributing this code is not permitted without written permission. Original: https://rasmusmott.github.io/civil-engineering-learning-tools/ */
!function(e){"use strict";var t=e.OD,a=t.ui,s=t.sdof,n=t.sd,i=String.raw,o={m_t:n.DEF.m_t,k_MN:n.DEF.k_MN,zetaPct:1,p0_MN:.2,fL:.1},r=.6,l=i`
<div class="col">
  <div class="eyebrow">Structural dynamics · Lesson 16.2</div>
  <h1>Harmonic loading and resonance</h1>
  <p class="lede">Waves arrive every few seconds. The rotor turns at a steady speed and each blade passes the tower once per revolution. These loads repeat, and a load that repeats can move a structure far more than the same force applied slowly. How much more depends on one ratio: the load frequency against the natural frequency.</p>
  <div class="say">
    <strong>After this lesson you can explain</strong>
    <ul>
      <li>what the dynamic amplification factor is and why it has three regimes;</li>
      <li>why damping decides the response at resonance and hardly matters away from it;</li>
      <li>why turbine designers keep the tower frequency out of the 1P and 3P bands.</li>
    </ul>
  </div>
</div>

<section id="sec-model" class="col">
  <h2>The model</h2>
  <p>Same tower as in lesson 16.1: one mass, one spring, one dashpot. Now a force \(p(t) = p_0 \sin\omega t\) pushes on the top, with amplitude \(p_0\) and circular frequency \(\omega\).</p>
  <div class="math">\[ m\,\ddot u + c\,\dot u + k\,u = p_0 \sin\omega t \]</div>
  <p>The response has two parts. A <strong>transient</strong> rings at the natural frequency and dies away at the rate you measured in 16.1. What remains is the <strong>steady state</strong>: the tower moves at the load frequency, with a fixed amplitude and a fixed delay behind the load.</p>
  <p class="muted small">Left out: real wave and wind loads contain many frequencies at once and act along the whole structure. Lessons 16.6 and 16.7 build that up from this single sine.</p>
</section>

<section id="sec-predict" class="col">
  <h2>Predict first</h2>
  <div id="h-predict"></div>
</section>

<section id="sec-lab" class="wide">
  <h2>Lab: push the tower in rhythm</h2>
  <div class="card lab">
    <div class="lab-side">
      <canvas id="h-tower" aria-label="Animated side view of the tower under a harmonic load"></canvas>
      <div class="muted small" id="h-exag"></div>
    </div>
    <div class="lab-main">
      <canvas id="h-plot" aria-label="Time history of the tower-top displacement"></canvas>
      <div class="muted small">Starts from rest. Dashed: steady-state amplitude. Dotted: what the same force would give if applied slowly, \(p_0/k\).</div>
      <div class="row">
        <button type="button" class="btn" id="h-play">Pause</button>
        <button type="button" class="btn-ghost" id="h-restart">Start again</button>
        <span class="muted small">Playback</span>
        <button type="button" class="btn-ghost small" data-speed="3" aria-pressed="false">3×</button>
        <button type="button" class="btn-ghost small" data-speed="10" aria-pressed="true">10×</button>
        <button type="button" class="btn-ghost small" data-speed="30" aria-pressed="false">30×</button>
        <span id="h-regime" class="pill good" style="margin-left:auto"></span>
      </div>
      <canvas id="h-frf" aria-label="Dynamic amplification factor against load frequency. Click to set the load frequency." style="cursor:crosshair"></canvas>
      <div class="muted small">Amplification against load frequency, on a log scale. Shaded: 1P and 3P rotor bands. Click or drag in the chart to move the load frequency.</div>
      <div class="controls">
        <div class="ctl"><label for="h-f"><span>Load frequency \(f\)</span> <output id="ho-f"></output></label><input type="range" id="h-f" min="0.02" max="0.6" step="0.001"></div>
        <div class="ctl"><label for="h-z"><span>Damping ratio \(\zeta\) <span class="muted small">(log scale)</span></span> <output id="ho-z"></output></label><input type="range" id="h-z" min="0" max="1000" step="1"><div class="scale small muted" aria-hidden="true"><span style="left:0">0</span><span style="left:30.3%">1 %</span><span style="left:60.6%">10 %</span><span style="left:90.9%">100 %</span></div></div>
        <div class="ctl"><label for="h-p"><span>Load amplitude \(p_0\)</span> <output id="ho-p"></output></label><input type="range" id="h-p" min="0.05" max="1" step="0.01"></div>
        <div class="ctl"><label for="h-m"><span>Top mass \(m\)</span> <output id="ho-m"></output></label><input type="range" id="h-m" min="500" max="3000" step="10"></div>
        <div class="ctl"><label for="h-k"><span>Stiffness \(k\)</span> <output id="ho-k"></output></label><input type="range" id="h-k" min="0.5" max="5" step="0.001"></div>
      </div>
      <div class="row">
        <span class="muted small">Load presets</span>
        <button type="button" class="btn-ghost small" data-f="0.0714">Long swell, T = 14 s</button>
        <button type="button" class="btn-ghost small" data-f="0.125">Storm waves, T = 8 s</button>
        <button type="button" class="btn-ghost small" data-f="res">At resonance, f = f<sub>n</sub></button>
        <button type="button" class="btn-ghost small" data-f="0.25">3P at minimum rotor speed</button>
        <button type="button" class="btn-ghost small" id="h-reset">Reset all</button>
      </div>
      <div class="tiles" id="h-tiles"></div>
      <div id="h-warn" class="fb bad" hidden></div>
    </div>
  </div>
  <div class="col" style="margin-top:14px">
    <h3>Try this</h3>
    <ul class="tight">
      <li>Start with the long swell. The tower follows the load almost as if it were static. Now move the frequency up toward \(f_n\) and watch the amplitude and the delay grow.</li>
      <li>Press “At resonance” and let it run. The response builds cycle by cycle. Note how long it takes to reach the dashed line.</li>
      <li>Stay at resonance and change damping from 1 % to 5 %. Then move to the long swell and do the same. Where does damping matter?</li>
      <li>Go well above \(f_n\), to the 3P preset. The tower now moves less than under a static force, and in the opposite direction to the load.</li>
      <li>Change the mass. The curve slides sideways and the same wave lands on a different part of it.</li>
    </ul>
  </div>
</section>

<section id="sec-numbers" class="col">
  <h2>The numbers, step by step</h2>
  <p>Every value in the lab, with the formula, your current slider values substituted, and the result.</p>
  <div class="row" style="margin-bottom:10px"><button type="button" class="btn-ghost small" id="h-why" aria-pressed="false">Hide explanations</button></div>
  <div class="steps" id="h-steps"></div>
</section>

<section id="sec-deriv" class="col">
  <h2>Where the formulas come from</h2>
  <details class="deriv">
    <summary>Show derivation</summary>
    <p>In steady state the tower must move at the load frequency, so try \(u_p = C\sin\omega t + D\cos\omega t\). Put it into the equation of motion and collect the sine and cosine terms separately:</p>
    <div class="math">\[ (k - m\omega^2)\,C - c\,\omega\,D = p_0 \qquad c\,\omega\,C + (k - m\omega^2)\,D = 0 \]</div>
    <p>Divide by \(k\) and use \(r = \omega/\omega_n\), so that \(m\omega^2/k = r^2\) and \(c\,\omega/k = 2\zeta r\):</p>
    <div class="math">\[ C = \frac{p_0}{k}\,\frac{1-r^2}{(1-r^2)^2+(2\zeta r)^2} \qquad D = -\frac{p_0}{k}\,\frac{2\zeta r}{(1-r^2)^2+(2\zeta r)^2} \]</div>
    <p>A sine plus a cosine of the same frequency is one shifted sine, \(u_p = u_0\sin(\omega t-\varphi)\) with \(u_0 = \sqrt{C^2+D^2}\) and \(\tan\varphi = -D/C\):</p>
    <div class="math">\[ u_0 = \frac{p_0}{k}\cdot\frac{1}{\sqrt{(1-r^2)^2+(2\zeta r)^2}} \qquad \tan\varphi = \frac{2\zeta r}{1-r^2} \]</div>
    <p>Read the three terms of the equation of motion as forces that must add up to the load. Below resonance the spring term \(k u\) carries it. Above resonance the inertia term \(m\ddot u\) does. At \(r = 1\) spring and inertia cancel each other exactly, and only the damping force is left to balance the load. That is why \(R_d = 1/(2\zeta)\) there.</p>
    <p>Build-up: the full solution is this steady state plus a free vibration that makes the start conditions right. At resonance, starting from rest, the two combine to an amplitude that grows as \(1 - e^{-\zeta\omega_n t}\), reaching 95 % when \(\zeta\omega_n t = 3\).</p>
    <p class="src muted">Standard result, pure physics and algebra. Treated in full in the works listed under <a href="#" data-goto="sec-refs">References</a> (Chopra, Part I, chapter “Response to Harmonic and Periodic Excitations”).</p>
  </details>
</section>

<section id="sec-ex" class="col">
  <h2>Exercise: a swell that almost matches</h2>
  <div class="card">
    <p>A monopile turbine is parked in a regular swell. Treat the wave load as one sine force at the tower top.</p>
    <table class="data">
      <tr><td>Equivalent load amplitude at the top</td><td class="num">0.15 MN</td></tr>
      <tr><td>Wave period</td><td class="num">7.0 s</td></tr>
      <tr><td>Tower natural frequency</td><td class="num">0.170 Hz</td></tr>
      <tr><td>Stiffness at the top</td><td class="num">1.40 MN/m</td></tr>
      <tr><td>Damping ratio</td><td class="num">1.2 %</td></tr>
    </table>
    <p style="margin-top:12px">Work through it one step at a time. Answers within 1 % count.</p>
    <div id="h-ex"></div>
  </div>
</section>

<section id="sec-quick" class="col">
  <h2>Quick-fire</h2>
  <p>Answer before you calculate.</p>
  <div class="card" id="h-q1" style="margin-bottom:10px"></div>
  <div class="card" id="h-q2" style="margin-bottom:10px"></div>
  <div class="card" id="h-q3"></div>
</section>

<section id="sec-mistakes" class="col">
  <h2>Common mistakes</h2>
  <ul class="tight">
    <li><strong>Frequency ratio upside down.</strong> \(r\) is load over natural: \(f/f_n\), which equals \(T_n/T\). A slow load gives \(r &lt; 1\).</li>
    <li><strong>Damping entered in percent.</strong> The formulas need the fraction. With 1.2 instead of 0.012, the amplification at resonance comes out as 0.42 instead of 42.</li>
    <li><strong>Thinking resonance needs an exact match.</strong> With 1 % damping, a load 10 % off the natural frequency is still amplified about 5 times.</li>
    <li><strong>Forgetting the build-up.</strong> \(R_d\) is a steady-state value. A lightly damped tower needs tens of cycles of a steady load to get there, and real waves rarely stay that regular.</li>
    <li><strong>Using \(R_d\) for a load that is not a sine.</strong> A sudden load or a short pulse follows different rules. For a step load the factor is at most 2.</li>
  </ul>
</section>

<section id="sec-verify" class="col">
  <h2>Verification</h2>
  <p>The calculation core is tested separately from this page. The checks below run in your browser right now on the same code that drives the lab.</p>
  <div class="card"><span id="h-verify" class="pill good"></span>
    <details style="margin-top:8px"><summary class="small">Show every check</summary><div class="checks" id="h-checks"></div></details>
    <p class="muted small" style="margin:10px 0 0">Independent cross-check, done when this version was built (15 Nov 2026): six forced cases, including undamped resonance and an overdamped system, integrated numerically with SciPy (DOP853, no closed-form solution used) agree with the core to 4.5 × 10⁻¹² relative. Not done: comparison with measured data or with an aeroelastic code.</p>
  </div>
</section>

§REFS§

<section id="sec-limits" class="col">
  <h2>Limits of this model</h2>
  <ul class="tight">
    <li>One sine load at one frequency. Real seas and wind are irregular and broad-banded.</li>
    <li>The load acts at the tower top. Wave loads act near the waterline and excite the tower differently.</li>
    <li>Damping is constant. An operating rotor adds aerodynamic damping several times larger than the 1 % of a parked turbine.</li>
    <li>The rotor speed, and with it 1P and 3P, changes with wind speed. The bands shown use 5.0 rpm (checked) and 7.56 rpm (not yet checked against the reference report).</li>
    <li>Mass, stiffness and load values are illustrative.</li>
  </ul>
  <p class="muted small" style="margin-top:12px">This is a learning tool. It is not verified for design and does not replace a standard, a validated code or an engineer’s judgement.</p>
</section>
`;t.lessons["sdof-harmonic"]={title:"Harmonic loading and resonance",mount:function(d){d.innerHTML=l.replace("§REFS§",t.sd.refsSection(["wes","iea15","chopra","ocw20"]));var c,h,u,p,m,f,g=function(e){return document.getElementById(e)},y={m_t:o.m_t,k_MN:o.k_MN,zetaPct:o.zetaPct,p0_MN:o.p0_MN,fL:o.fL,t:0,speed:10,playing:!e.matchMedia("(prefers-reduced-motion: reduce)").matches},w=a.colors(),v=null,b=null,x=a.tex;a.mc(g("h-predict"),{id:"l162-predict",q:"<p>A steady sine load pushes the tower exactly at its natural frequency. Damping is 1 %. Once things have settled, how large is the motion compared with what the same force gives when applied slowly?</p>",options:[{t:"About 2 times",why:"A factor of 2 belongs to a suddenly applied constant load. A load that keeps pushing in rhythm does far more."},{t:"About 10 times",why:"That would need 5 % damping."},{t:"About 50 times",correct:!0,why:i`At resonance the amplification is \(1/(2\zeta) = 1/0.02 = 50\). Only damping limits it.`},{t:"Without limit",why:"Only with zero damping. Any damping sets a ceiling, because the energy removed per cycle grows with amplitude until it matches the energy the load puts in."}]});var _=null;function k(){var e=s.harmonicResponse(c,h.p0,u,0,0,y.t);n.drawTower(g("h-tower"),{u:e.u,pxPerM:46/(f/1.2),L:n.DEF.L,t:y.t,col:w,force:Math.sin(u*y.t),exagEl:g("h-exag")}),function(){var e=a.plot(g("h-plot"),230,{x0:0,x1:p,y0:-f,y1:f,xLabel:"time t [s]",yLabel:"u [m]",col:w}),t=e.ctx;isFinite(h.amp)&&h.amp<f&&[1,-1].forEach(function(s){a.line(t,e.X,e.Y,[0,p],[s*h.amp,s*h.amp],w.sea,1.5,[5,4])}),[1,-1].forEach(function(s){a.line(t,e.X,e.Y,[0,p],[s*h.ust,s*h.ust],w.muted,1,[2,3])}),a.line(t,e.X,e.Y,m.t,m.u,w.ink,1.8);var n=s.harmonicResponse(c,h.p0,u,0,0,y.t).u;a.line(t,e.X,e.Y,[y.t,y.t],[-f,f],w.accent,1),t.fillStyle=w.accent,t.beginPath(),t.arc(e.X(y.t),e.Y(n),5,0,6.3),t.fill()}(),function(){var e=a.prep(g("h-frf"),210),t=e.ctx,i=50,o=12,l=e.w-i-14,d=e.h-o-34,u=Math.log10(.1),p=Math.log10(200),m=function(e){return i+l*e/r},f=function(e){return o+d-d*(Math.log10(Math.min(Math.max(e,.1),200))-u)/(p-u)};_={L:i,pw:l};var v=getComputedStyle(document.documentElement);[["p1","--band1","1P"],["p3","--band3","3P"]].forEach(function(e){var a=n.BANDS[e[0]];t.fillStyle=v.getPropertyValue(e[1]),t.fillRect(m(a[0]),o,m(Math.min(a[1],r))-m(a[0]),d),t.fillStyle=w.muted,t.font='11px "IBM Plex Mono", monospace',t.textAlign="center",t.fillText(e[2],m((a[0]+a[1])/2),23)}),t.font='11px "IBM Plex Mono", monospace',t.lineWidth=1,[.1,1,10,100].forEach(function(e){t.strokeStyle=1===e?w.muted:w.line,t.beginPath(),t.moveTo(i,f(e)),t.lineTo(i+l,f(e)),t.stroke(),t.fillStyle=w.muted,t.textAlign="right",t.fillText(String(e),44,f(e)+4)});for(var b=0;b<=r+1e-9;b+=.1)t.strokeStyle=w.line,t.beginPath(),t.moveTo(m(b),o),t.lineTo(m(b),o+d),t.stroke(),t.fillStyle=w.muted,t.textAlign="center",t.fillText(b.toFixed(1),m(b),o+d+14);t.fillText("load frequency f [Hz]",i+l/2,e.h-4),t.save(),t.translate(12,o+d/2),t.rotate(-Math.PI/2),t.fillText("amplification R_d",0,0),t.restore(),c.fn<r&&(a.line(t,m,function(e){return e},[c.fn,c.fn],[o,o+d],w.muted,1,[4,4]),t.fillStyle=w.muted,t.textAlign="left",t.fillText("f_n",m(c.fn)+4,o+d-6));for(var x=[],k=[],T=1;T<=600;T++){var q=r*T/600;x.push(q),k.push(s.harmonic(c,h.p0,2*Math.PI*q).Rd)}a.line(t,m,f,x,k,w.ink,2),t.fillStyle=w.accent,t.beginPath(),t.arc(m(y.fL),f(h.Rd),6,0,6.3),t.fill()}()}function T(e,t,a){return'<div class="tile"><div class="k">'+e+'</div><div class="v">'+t+'</div><div class="u">'+a+"</div></div>"}var q=function(){return!h.undampedResonance},M="With ζ = 0 and r = 1 there is no steady state: the amplitude grows by π·p₀/k every cycle. Add damping or move the load frequency.",R=a.stepCards(g("h-steps"),[{id:"hs-ust",title:"Static deflection",tex:function(){return i`u_{st} = \frac{p_0}{k} = \frac{`+x(h.p0)+i`\ \text{N}}{`+x(c.k)+i`\ \text{N/m}} = `+x(h.ust)+i`\ \text{m}`},why:function(){return i`<p><strong>Why.</strong> The reference case: what the load amplitude would do if applied so slowly that nothing accelerates. Everything dynamic is measured against it.</p><p><strong>Numerically.</strong> `+y.p0_MN.toFixed(2)+i` MN = \(`+x(h.p0)+i`\) N and `+y.k_MN.toFixed(3)+i` MN/m = \(`+x(c.k)+i`\) N/m. N ÷ N/m = m.</p><p class="src"><strong>Source.</strong> Hooke’s law.</p>`}},{id:"hs-r",title:"Frequency ratio",tex:function(){return i`r = \frac{\omega}{\omega_n} = \frac{f}{f_n} = \frac{`+x(y.fL)+i`\ \text{Hz}}{`+x(c.fn)+i`\ \text{Hz}} = `+x(h.r)},why:i`<p><strong>Why.</strong> The structure does not care about the load frequency itself, only how it compares with its own. \(r \ll 1\): the load is slow for this structure. \(r \gg 1\): the load reverses before the mass has had time to move.</p><p><strong>Numerically.</strong> A ratio, so Hz over Hz or rad/s over rad/s, never mixed. \(f_n = \tfrac{1}{2\pi}\sqrt{k/m}\) from lesson 16.1.</p><p class="src"><strong>Source.</strong> Definition.</p>`},{id:"hs-rd",title:"Dynamic amplification factor",show:q,hiddenMsg:M,tex:function(){return i`R_d = \frac{1}{\sqrt{(1-r^2)^2+(2\zeta r)^2}} = \frac{1}{\sqrt{(1-`+x(h.r)+i`^2)^2+(2\cdot `+x(c.zeta)+i`\cdot `+x(h.r)+i`)^2}} = \frac{1}{\sqrt{`+x(h.a*h.a,3)+" + "+x(h.b*h.b,3)+i`}} = `+x(h.Rd)},why:function(){var e=h.a*h.a>h.b*h.b;return i`<p><strong>Why.</strong> Two terms under the root. The first, \((1-r^2)^2\), is the spring and inertia forces working against each other. The second, \((2\zeta r)^2\), is damping. Right now the `+(e?"first term is the larger one, so damping has little say":"damping term is the larger one, so damping decides the response")+i`.</p><p><strong>Three regimes.</strong> \(r \to 0\): \(R_d \to 1\), static. \(r = 1\): \(R_d = 1/(2\zeta)\). \(r \to \infty\): \(R_d \to 1/r^2\), smaller than static.</p><p class="src"><strong>Source.</strong> Steady-state solution of the equation of motion. See the derivation below.</p>`}},{id:"hs-amp",title:"Steady-state amplitude",show:q,hiddenMsg:M,tex:function(){return i`u_0 = u_{st}\,R_d = `+x(h.ust)+i`\cdot `+x(h.Rd)+" = "+x(h.amp)+i`\ \text{m}`},why:i`<p><strong>Why.</strong> Static deflection times amplification. Stresses in the tower scale with this displacement, so \(R_d\) multiplies them as well.</p><p class="src"><strong>Source.</strong> Definition of \(R_d\).</p>`},{id:"hs-phi",title:"Delay behind the load",show:q,hiddenMsg:M,tex:function(){return i`\varphi = \arctan\frac{2\zeta r}{1-r^2} = \arctan\frac{`+x(h.b,3)+"}{"+x(h.a,3)+i`} = `+x(180*h.phi/Math.PI,3)+i`^\circ`},why:i`<p><strong>Why.</strong> Below resonance the tower moves with the load (near 0°). At resonance it lags a quarter cycle (90°): the load is then in step with the velocity and feeds energy in over the whole cycle. Above resonance it moves against the load (toward 180°).</p><p><strong>Numerically.</strong> When \(1-r^2\) is negative the angle lies between 90° and 180°. A calculator’s arctan gives a negative angle there; add 180°.</p><p class="src"><strong>Source.</strong> Steady-state solution. See the derivation below.</p>`},{id:"hs-res",title:"If the load sat exactly at resonance",show:function(){return c.zeta>0},hiddenMsg:"With zero damping the response at resonance has no ceiling.",tex:function(){return i`R_d(r{=}1) = \frac{1}{2\zeta} = \frac{1}{2\cdot `+x(c.zeta)+"} = "+x(h.RdAtResonance)+i` \qquad t_{95} = \frac{3}{\zeta\,\omega_n} = \frac{3}{`+x(c.zeta)+i`\cdot `+x(c.wn)+"} = "+x(h.tBuild95,3)+i`\ \text{s}`},why:function(){return i`<p><strong>Why.</strong> At \(r = 1\) spring and inertia cancel, and damping alone balances the load. Halve the damping and the response doubles.</p><p><strong>Build-up.</strong> From rest the amplitude grows as \(1-e^{-\zeta\omega_n t}\). Reaching 95 % takes `+a.num(h.tBuild95,3)+i` s here, about `+a.num(h.tBuild95/c.Tn,2)+i` cycles. The same decay rate that made the tower ring for minutes in lesson 16.1 now sets how long a load must stay in rhythm.</p><p class="src"><strong>Source.</strong> Standard result. The exact peak sits slightly below \(r=1\), at \(r=\sqrt{1-2\zeta^2}\), with a value that differs from \(1/(2\zeta)\) in the fourth digit for light damping.</p>`}}]);function z(e){!function(){c=s.properties({m:1e3*y.m_t,k:1e6*y.k_MN,zeta:y.zetaPct/100}),u=2*Math.PI*y.fL,h=s.harmonic(c,1e6*y.p0_MN,u),p=Math.min(Math.max(12/y.fL,c.zeta>0?4/(c.zeta*c.wn):1/0),40*c.Tn);var e=1600,t=new Array(e+1),a=new Array(e+1);f=0;for(var n=0;n<=e;n++)t[n]=p*n/e,a[n]=s.harmonicResponse(c,h.p0,u,0,0,t[n]).u,f=Math.max(f,Math.abs(a[n]));f=1.2*Math.max(f,h.ust,.01),m={t:t,u:a}}(),e&&(y.t=0),function(){g("ho-f").textContent=y.fL.toFixed(3)+" Hz ("+a.num(1/y.fL,3)+" s)",g("ho-z").textContent=(0===y.zetaPct?"0":a.num(y.zetaPct,2))+" %",g("ho-p").textContent=y.p0_MN.toFixed(2)+" MN",g("ho-m").textContent=y.m_t+" t",g("ho-k").textContent=y.k_MN.toFixed(3)+" MN/m",g("h-f").value=y.fL,g("h-z").value=a.logPos(y.zetaPct,.1,200),g("h-p").value=y.p0_MN,g("h-m").value=y.m_t,g("h-k").value=y.k_MN;var e=!isFinite(h.Rd);g("h-tiles").innerHTML=T("Frequency ratio r = f / f<sub>n</sub>",a.num(h.r,3),"f<sub>n</sub> = "+a.num(c.fn,3)+" Hz")+T("Amplification R<sub>d</sub>",e?"∞":a.num(h.Rd,3),"dynamic ÷ static")+T("Static deflection p<sub>0</sub>/k",a.num(h.ust,3),"m")+T("Steady-state amplitude",e?"grows without limit":a.num(h.amp,3),e?"":"m")+T("Delay behind the load φ",e?"90":a.num(180*h.phi/Math.PI,3),"degrees")+T("Time to reach 95 % at resonance",isFinite(h.tBuild95)?a.num(h.tBuild95,3):"never settles",isFinite(h.tBuild95)?"s":"");var t=Math.abs(h.r-1)<.1||h.Rd>.5*h.RdAtResonance&&h.Rd>3,s=g("h-regime");s.className="pill "+(t?"bad":"good"),s.textContent=t?"Near resonance: damping controls":h.r<1?"Below resonance: stiffness controls":"Above resonance: inertia controls";var n=g("h-warn"),i=c.warnings.slice();h.undampedResonance&&i.push("Zero damping exactly at resonance: there is no steady state. The amplitude grows by π·p₀/k every cycle."),n.hidden=0===i.length,n.textContent=i.join(" ")}(),k(),clearTimeout(v),v=setTimeout(R,140)}[["h-f","fL"],["h-p","p0_MN"],["h-m","m_t"],["h-k","k_MN"]].forEach(function(e){g(e[0]).addEventListener("input",function(t){y[e[1]]=parseFloat(t.target.value),z(!0)})}),g("h-z").addEventListener("input",function(e){y.zetaPct=a.logVal(parseFloat(e.target.value),.1,200),z(!0)}),d.querySelectorAll("[data-f]").forEach(function(e){e.addEventListener("click",function(){var t=e.getAttribute("data-f");y.fL="res"===t?c.fn:parseFloat(t),z(!0)})}),d.querySelectorAll("[data-speed]").forEach(function(e){e.addEventListener("click",function(){y.speed=parseFloat(e.getAttribute("data-speed")),d.querySelectorAll("[data-speed]").forEach(function(t){t.setAttribute("aria-pressed",t===e?"true":"false")})})}),g("h-play").textContent=y.playing?"Pause":"Play",g("h-play").addEventListener("click",function(){y.playing=!y.playing,g("h-play").textContent=y.playing?"Pause":"Play"}),g("h-restart").addEventListener("click",function(){y.t=0,k()}),g("h-reset").addEventListener("click",function(){Object.keys(o).forEach(function(e){y[e]=o[e]}),z(!0)}),g("h-why").addEventListener("click",function(){var e=g("h-steps").classList.toggle("hide-why");g("h-why").setAttribute("aria-pressed",e?"true":"false"),g("h-why").textContent=e?"Show explanations":"Hide explanations"});var A=!1,S=g("h-frf");function P(e){if(_){var t=e.clientX-S.getBoundingClientRect().left;y.fL=Math.min(r,Math.max(.02,Math.round(600*(t-_.L)/_.pw)/1e3)),z(!0)}}function L(){document.body.contains(S)&&(w=a.colors(),k())}S.addEventListener("pointerdown",function(e){A=!0,S.setPointerCapture(e.pointerId),P(e)}),S.addEventListener("pointermove",function(e){A&&P(e)}),S.addEventListener("pointerup",function(){A=!1}),e.addEventListener("resize",L),e.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",L),new MutationObserver(L).observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]});var N,E,F,W,C=(E=(N=14e5)/Math.pow(2*Math.PI*.17,2),F=s.properties({m:E,k:N,zeta:.012}),{ust:(W=s.harmonic(F,15e4,2*Math.PI/7)).ust,r:W.r,Rd:W.Rd,amp:W.amp,RdRes:W.RdAtResonance,ampRes:W.ust*W.RdAtResonance,amp5:W.ust/.1}),D=a.near,H=a.num;a.exercise(g("h-ex"),{id:"l162-ex1",givens:[{sym:"p0",label:"p<sub>0</sub>",value:15e4,unit:"N",name:"Load amplitude, 0.15 MN"},{sym:"T",label:"T",value:7,unit:"s",name:"Wave period"},{sym:"fn",label:"f<sub>n</sub>",value:.17,unit:"Hz",name:"Tower natural frequency"},{sym:"k",label:"k",value:14e5,unit:"N/m",name:"Stiffness at the top, 1.40 MN/m"},{sym:"zeta",label:"ζ",value:.012,unit:"–",name:"Damping ratio, 1.2 %"}],steps:[{id:"ust",sym:"ust",label:"u<sub>st</sub>",prompt:i`How far would the load amplitude move the top if it were applied slowly? Find \(u_{st}\).`,unit:"m",answer:C.ust,tol:.01,hints:["No dynamics yet: one force, one spring.",i`\(u_{st} = p_0/k\). With the chips: <code>p0/k</code>.`],ref:{id:"hs-ust",label:"Step 1: static deflection"},diagnose:function(e){return D(e,1e3*C.ust,.01)?"that is in millimetres. The SI answer is in metres.":D(e,1/C.ust,.01)?"that is k/p₀. Turn the fraction over.":null},solution:i`\(u_{st} = 1.5\times10^5/1.4\times10^6 = `+H(C.ust)+i`\) m.`},{id:"r",sym:"r",label:"r",type:"pick",prompt:i`What is the frequency ratio \(r\)?`,unit:"–",answer:C.r,options:[{tex:i`r = f_n\,T`,why:i`That is \(f_n/f\), natural over load. The load frequency goes on top, so a load slower than the tower gives \(r\) below 1.`},{tex:i`r = \dfrac{1}{T\,f_n}`,correct:!0},{tex:i`r = \dfrac{2\pi}{T\,f_n}`,why:"That divides rad/s by Hz. Use the same unit top and bottom."}],ref:{id:"hs-r",label:"Step 2: frequency ratio"},solution:i`The load frequency is \(f = 1/T = `+H(1/7)+i`\) Hz, and \(r = f/f_n\).`,after:"The swell is about 16 % slower than the tower."},{id:"rd",sym:"Rd",label:"R<sub>d</sub>",prompt:i`What is the dynamic amplification factor \(R_d\)?`,unit:"–",answer:C.Rd,tol:.015,hints:[i`You need \(r\) and \(\zeta\).`,i`\(R_d = \dfrac{1}{\sqrt{(1-r^2)^2+(2\zeta r)^2}}\). With the chips: <code>1/sqrt((1-r^2)^2+(2*zeta*r)^2)</code>.`],ref:{id:"hs-rd",label:"Step 3: dynamic amplification factor"},diagnose:function(e){return D(e,1/(1-C.r),.015)?"r has to be squared inside the bracket.":D(e,C.RdRes,.015)?"that is the value at resonance, 1/(2ζ). This load is not at resonance.":D(e,1/Math.sqrt(Math.pow(1-C.r*C.r,2)+Math.pow(2.4*C.r,2)),.015)?"damping went in as 1.2. The fraction is 0.012.":null},solution:i`\(1-r^2 = `+H(1-C.r*C.r)+i`\), \(2\zeta r = `+H(.024*C.r,3)+i`\), so \(R_d = 1/\sqrt{`+H(Math.pow(1-C.r*C.r,2),3)+" + "+H(Math.pow(.024*C.r,2),3)+"} = "+H(C.Rd)+i`\).`,after:"Notice how small the damping term was. This far from resonance, leaving damping out changes the answer by 0.2 %."},{id:"amp",sym:"amp",label:"u<sub>0</sub>",prompt:"What is the steady-state amplitude of the tower top?",unit:"m",answer:C.amp,tol:.015,hints:["Combine the two previous results.",i`\(u_0 = u_{st}\,R_d\). With the chips: <code>ust*Rd</code>.`],ref:{id:"hs-amp",label:"Step 4: steady-state amplitude"},diagnose:function(e){return D(e,C.Rd,.015)?"that is the factor. Multiply it by the static deflection.":D(e,C.ust,.01)?"that is the static deflection. Multiply by the amplification.":null},solution:i`\(u_0 = `+H(C.ust)+i`\cdot `+H(C.Rd)+" = "+H(C.amp)+i`\) m.`},{id:"res",sym:"ures",label:"u<sub>res</sub>",type:"pick",prompt:"The swell shortens until its period equals the tower’s natural period. What steady-state amplitude does the same load now give?",unit:"m",answer:C.ampRes,options:[{tex:i`u_0 = \dfrac{u_{st}}{\zeta}`,why:i`The factor at resonance is \(1/(2\zeta)\), not \(1/\zeta\).`},{tex:i`u_0 = 2\zeta\,u_{st}`,why:"That would make the motion smaller than static. At resonance it is much larger."},{tex:i`u_0 = \dfrac{u_{st}}{2\zeta}`,correct:!0}],ref:{id:"hs-res",label:"Step 6: at resonance"},solution:i`At \(r = 1\) the first term under the root vanishes and \(R_d = 1/(2\cdot 0.012) = `+H(C.RdRes)+i`\).`,after:"More than twelve times the off-resonance response, from a one-second change in wave period. In a real sea it would take minutes of perfectly regular waves to get there."},{id:"d5",sym:"u5",label:"u<sub>5%</sub>",prompt:"A tower damper raises the damping ratio to 0.05. What is the amplitude at resonance now?",unit:"m",answer:C.amp5,tol:.01,hints:["Only one number in the previous step changes.",i`\(u_0 = \dfrac{u_{st}}{2\zeta}\) with \(\zeta = 0.05\). With the chips: <code>ust/(2*0.05)</code>.`],ref:{id:"hs-res",label:"Step 6: at resonance"},diagnose:function(e){return D(e,10,.01)?"that is the factor 1/(2ζ). Multiply by the static deflection.":D(e,C.ust/10,.01)?"damping went in as 5. The fraction is 0.05.":D(e,C.ampRes,.01)?"that still uses the old damping of 0.012. Type 0.05 instead of the ζ chip.":null},solution:i`\(u_0 = `+H(C.ust)+i`/(2\cdot 0.05) = `+H(C.amp5)+i`\) m.`,after:"About a quarter of the value with 1.2 % damping. Away from resonance the same damper would change almost nothing, which is why dampers are tuned to the tower frequency."}]}),a.mc(g("h-q1"),{id:"l162-q1",q:"<p><strong>1.</strong> A load varies ten times faster than the natural frequency. Compared with the same force applied statically, the motion is…</p>",options:[{t:"Much larger",why:"Fast is not the same as resonant. The mass cannot follow a load that reverses this quickly."},{t:"About the same",why:"That holds for slow loads, far below the natural frequency."},{t:"About a hundred times smaller",correct:!0,why:i`Far above resonance \(R_d \approx 1/r^2 = 1/100\). The inertia of the mass carries the load and the spring hardly notices.`}]}),a.mc(g("h-q2"),{id:"l162-q2",q:"<p><strong>2.</strong> A tower is being driven at resonance. Which change reduces the motion most?</p>",options:[{t:"Doubling the damping",correct:!0,why:i`At resonance \(R_d = 1/(2\zeta)\): twice the damping, half the motion. Changing stiffness or mass also helps, but only because it moves the structure away from resonance.`},{t:"Adding 10 % stiffness, with the load frequency following",why:"If the load stays at the new natural frequency, the amplification is still 1/(2ζ). Only the static deflection drops, by 9 %."},{t:"Halving the mass, with the load frequency following",why:"Still at resonance, still 1/(2ζ) times the same static deflection."}]}),a.mc(g("h-q3"),{id:"l162-q3",q:"<p><strong>3.</strong> At resonance, how does the motion sit relative to the load?</p>",options:[{t:"In step with the load",why:"That is the slow, quasi-static case."},{t:"A quarter cycle behind",correct:!0,why:"Displacement lags by 90°, which puts the load in step with the velocity. The load then does positive work during the whole cycle, the most efficient way to pump energy in."},{t:"Opposite to the load",why:"That is the case far above resonance."}]});var I=t.selfcheck.sdofHarmonic().concat(t.selfcheck.sdofFree()),B=I.filter(function(e){return e.pass}).length,O=g("h-verify");O.className="pill "+(B===I.length?"good":"bad"),O.textContent=B+" of "+I.length+" checks pass",g("h-checks").innerHTML=I.map(function(e){return'<div class="c"><span class="'+(e.pass?'ok">PASS':'no">FAIL')+'</span><span class="rung">'+e.rung+"</span><span>"+e.name+(e.detail?' <span class="muted">('+e.detail+")</span>":"")+"</span></div>"}).join(""),z(!0),a.typeset(d),e.requestAnimationFrame(function t(a){document.body.contains(S)&&(null!==b&&y.playing&&(y.t+=Math.min(.1,(a-b)/1e3)*y.speed,y.t>p&&(y.t=0),k()),b=a,e.requestAnimationFrame(t))})},progressPrefix:"l162-",progressTotal:10}}("undefined"!=typeof globalThis?globalThis:this);
