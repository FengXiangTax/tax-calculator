{\rtf1\ansi\ansicpg936\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset134 PingFangSC-Regular;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // 
\f1 \'cb\'b0\'c2\'ca\'b1\'ed
\f0 \
const taxBrackets = [\
    \{limit: 36000, rate: 0.03, quick: 0\},\
    \{limit: 144000, rate: 0.10, quick: 2520\},\
    \{limit: 300000, rate: 0.20, quick: 16920\},\
    \{limit: 420000, rate: 0.25, quick: 31920\},\
    \{limit: 660000, rate: 0.30, quick: 52920\},\
    \{limit: 960000, rate: 0.35, quick: 85920\},\
    \{limit: Infinity, rate: 0.45, quick: 181920\}\
];\
\
const monthlyBasicDeduction = 5000;\
\
// 
\f1 \'b4\'e6\'b4\'a2\'b8\'f7\'d4\'c2\'b7\'dd\'ca\'d5\'c8\'eb\'ca\'fd\'be\'dd
\f0 \
let monthIncomes = Array(12).fill(0);\
\
// 
\f1 \'b3\'f5\'ca\'bc\'bb\'af\'d4\'c2\'b7\'dd\'d1\'a1\'d4\'f1\'c6\'f7
\f0 \
const monthsGrid = document.getElementById('monthsGrid');\
for(let i = 1; i <= 12; i++) \{\
    const div = document.createElement('div');\
    div.className = 'month';\
    div.dataset.month = i;\
    div.textContent = i + '
\f1 \'d4\'c2
\f0 ';\
    div.onclick = () => div.classList.toggle('active');\
    monthsGrid.appendChild(div);\
\}\
\
// 
\f1 \'c4\'ac\'c8\'cf\'d1\'a1\'d6\'d0\'cb\'f9\'d3\'d0\'d4\'c2\'b7\'dd
\f0 \
window.onload = function() \{\
    document.querySelectorAll('.month').forEach(m => m.classList.add('active'));\
    // 
\f1 \'b3\'f5\'ca\'bc\'bb\'af\'d4\'c2\'b7\'dd\'ca\'d5\'c8\'eb\'ca\'e4\'c8\'eb\'bf\'f2
\f0 \
    initMonthInputs();\
\};\
\
const defaultInput = document.getElementById('defaultIncome');\
\
// 
\f1 \'b3\'f5\'ca\'bc\'bb\'af\'d4\'c2\'b7\'dd\'ca\'d5\'c8\'eb\'ca\'e4\'c8\'eb\'bf\'f2
\f0 \
function initMonthInputs() \{\
    const container = document.getElementById('monthInputsContainer');\
    container.innerHTML = '';\
    \
    for(let i = 1; i <= 12; i++) \{\
        const monthDiv = document.createElement('div');\
        monthDiv.className = 'month-input';\
        \
        const label = document.createElement('label');\
        label.textContent = i + '
\f1 \'d4\'c2\'ca\'d5\'c8\'eb
\f0 ';\
        label.htmlFor = `monthIncome$\{i\}`;\
        \
        const input = document.createElement('input');\
        input.type = 'number';\
        input.id = `monthIncome$\{i\}`;\
        input.min = '0';\
        input.value = monthIncomes[i-1] || '';\
        input.placeholder = '
\f1 \'ca\'e4\'c8\'eb\'bd\'f0\'b6\'ee
\f0 ';\
        // 
\f1 \'cc\'ed\'bc\'d3\'ca\'e4\'c8\'eb\'ca\'c2\'bc\'fe\'bc\'e0\'cc\'fd\'a3\'ac\'ca\'b5\'ca\'b1\'b8\'fc\'d0\'c2\'d4\'c2\'b7\'dd\'d1\'a1\'d6\'d0\'d7\'b4\'cc\'ac
\f0 \
        input.addEventListener('input', function() \{\
            updateMonthSelection(i, this.value);\
        \});\
        \
        monthDiv.appendChild(label);\
        monthDiv.appendChild(input);\
        container.appendChild(monthDiv);\
    \}\
\}\
\
// 
\f1 \'ca\'b5\'ca\'b1\'b8\'fc\'d0\'c2\'d4\'c2\'b7\'dd\'d1\'a1\'d6\'d0\'d7\'b4\'cc\'ac
\f0 \
function updateMonthSelection(month, value) \{\
    const monthCell = document.querySelector(`.month[data-month='$\{month\}']`);\
    const numericValue = Number(value);\
    \
    if (!isNaN(numericValue) && numericValue > 0) \{\
        // 
\f1 \'c8\'e7\'b9\'fb\'ca\'e4\'c8\'eb\'c1\'cb\'d3\'d0\'d0\'a7\'d5\'fd\'ca\'fd\'a3\'ac\'d7\'d4\'b6\'af\'d1\'a1\'d6\'d0\'b8\'c3\'d4\'c2\'b7\'dd
\f0 \
        monthCell.classList.add('active');\
    \} else \{\
        // 
\f1 \'c8\'e7\'b9\'fb\'ca\'e4\'c8\'eb\'ce\'aa\'bf\'d5\'bb\'f2
\f0 0
\f1 \'a3\'ac\'c8\'a1\'cf\'fb\'d1\'a1\'d6\'d0\'b8\'c3\'d4\'c2\'b7\'dd
\f0 \
        monthCell.classList.remove('active');\
    \}\
\}\
\
// 
\f1 \'bc\'c6\'cb\'e3\'b8\'f6\'cb\'b0
\f0 \
function startCalc() \{\
    const def = Number(defaultInput.value) || 0;\
    const months = [];\
    \
    // 
\f1 \'c8\'b7\'b1\'a3\'d6\'c1\'c9\'d9\'d3\'d0\'d2\'bb\'b8\'f6\'d4\'c2\'b7\'dd\'b1\'bb\'d1\'a1\'d6\'d0
\f0 \
    let hasActiveMonth = false;\
    for(let i = 1; i <= 12; i++) \{\
        const cell = document.querySelector(`.month[data-month='$\{i\}']`);\
        const isActive = cell.classList.contains('active');\
        if (isActive) hasActiveMonth = true;\
        \
        // 
\f1 \'ca\'b9\'d3\'c3\'d4\'c2\'b7\'dd\'cc\'d8\'b6\'a8\'ca\'d5\'c8\'eb\'a3\'ac\'c8\'e7\'b9\'fb\'c3\'bb\'d3\'d0\'d4\'f2\'ca\'b9\'d3\'c3\'c4\'ac\'c8\'cf\'d6\'b5
\f0 \
        const income = monthIncomes[i-1] > 0 ? monthIncomes[i-1] : \
                      (isActive ? def : 0);\
        \
        months.push(\{\
            month: i, \
            active: isActive, \
            income: income\
        \});\
    \}\
\
    // 
\f1 \'c8\'e7\'b9\'fb\'c3\'bb\'d3\'d0\'d1\'a1\'d6\'d0\'c8\'ce\'ba\'ce\'d4\'c2\'b7\'dd\'a3\'ac\'cc\'e1\'ca\'be\'d3\'c3\'bb\'a7
\f0 \
    if (!hasActiveMonth) \{\
        alert('
\f1 \'c7\'eb\'d6\'c1\'c9\'d9\'d1\'a1\'d4\'f1\'d2\'bb\'b8\'f6\'d4\'c2\'b7\'dd\'a3\'a1
\f0 ');\
        return;\
    \}\
\
    let cumulativeIncome = 0, cumulativeTaxPaid = 0, monthsContinuous = 0;\
    const rows = [];\
\
    for(let i = 0; i < 12; i++) \{\
        const m = months[i];\
        if(!m.active || m.income <= 0) \{ \
            rows.push(\{\
                month: m.month, \
                income: 0, \
                currentTax: 0, \
                after: 0, \
                rate: '0%'\
            \}); \
            monthsContinuous = 0; // 
\f1 \'d6\'d8\'d6\'c3\'c1\'ac\'d0\'f8\'d4\'c2\'b7\'dd\'bc\'c6\'ca\'fd
\f0 \
            continue; \
        \}\
\
        monthsContinuous++;\
        cumulativeIncome += m.income;\
        const cumulativeExpense = cumulativeIncome * 0.2;\
        const cumulativeDeduction = monthlyBasicDeduction * monthsContinuous;\
        let taxable = cumulativeIncome - cumulativeExpense - cumulativeDeduction;\
        if(taxable < 0) taxable = 0;\
\
        const bracket = taxBrackets.find(b => taxable <= b.limit);\
        const cumulativeTax = taxable * bracket.rate - bracket.quick;\
        const currentTax = Math.max(0, cumulativeTax - cumulativeTaxPaid);\
        const taxFix = Math.round(currentTax * 100) / 100;\
        const after = Math.round((m.income - taxFix) * 100) / 100;\
        const rate = m.income > 0 ? ((taxFix / m.income * 100).toFixed(2) + '%') : '0%';\
\
        rows.push(\{\
            month: m.month, \
            income: m.income, \
            currentTax: taxFix, \
            after, \
            rate\
        \});\
        cumulativeTaxPaid += taxFix;\
    \}\
    \
    renderResults(rows);\
\}\
\
// 
\f1 \'e4\'d6\'c8\'be\'bd\'e1\'b9\'fb
\f0 \
function renderResults(rows) \{\
    const tbody = document.querySelector('#resultTable tbody');\
    tbody.innerHTML = '';\
    let totalIncome = 0, totalTax = 0, totalAfter = 0;\
\
    rows.forEach(r => \{\
        const tr = document.createElement('tr');\
        // 
\f1 \'c8\'e7\'b9\'fb\'d3\'d0\'bc\'c6\'cb\'e3\'c4\'da\'c8\'dd\'a3\'ac\'cc\'ed\'bc\'d3\'b8\'df\'c1\'c1\'c0\'e0
\f0 \
        if (r.income > 0) \{\
            tr.classList.add('highlight');\
        \}\
        \
        tr.innerHTML = `\
            <td>$\{r.month\}
\f1 \'d4\'c2
\f0 </td>\
            <td>$\{r.income.toFixed(2)\}</td>\
            <td>$\{r.currentTax.toFixed(2)\}</td>\
            <td>$\{r.after.toFixed(2)\}</td>\
            <td>$\{r.rate\}</td>\
        `;\
        tbody.appendChild(tr);\
        totalIncome += r.income; \
        totalTax += r.currentTax; \
        totalAfter += r.after;\
    \});\
\
    document.getElementById('resultPanel').style.display = 'block';\
    document.getElementById('totalPre').textContent = totalIncome.toFixed(2);\
    document.getElementById('totalTax').textContent = totalTax.toFixed(2);\
    document.getElementById('totalAfter').textContent = totalAfter.toFixed(2);\
    document.getElementById('totalRate').textContent = totalIncome > 0 ? \
        ((totalTax / totalIncome * 100).toFixed(2) + '%') : '0%';\
\}\
\
// 
\f1 \'c7\'e5\'bf\'d5\'d1\'a1\'d4\'f1
\f0 \
function clearAll() \{\
    document.querySelectorAll('.month').forEach(m => m.classList.remove('active'));\
    document.getElementById('resultPanel').style.display = 'none';\
    // 
\f1 \'d6\'d8\'d6\'c3\'d4\'c2\'b7\'dd\'ca\'d5\'c8\'eb\'ca\'fd\'be\'dd
\f0 \
    monthIncomes = Array(12).fill(0);\
    defaultInput.value = '10000';\
    // 
\f1 \'d6\'d8\'d0\'c2\'b3\'f5\'ca\'bc\'bb\'af\'d4\'c2\'b7\'dd\'ca\'e4\'c8\'eb\'bf\'f2
\f0 \
    initMonthInputs();\
\}\
\
// 
\f1 \'c8\'ab\'d1\'a1\'d4\'c2\'b7\'dd
\f0 \
function selectAll() \{\
    document.querySelectorAll('.month').forEach(m => m.classList.add('active'));\
\}\
\
// 
\f1 \'b4\'f2\'bf\'aa\'d4\'c2\'b7\'dd\'ca\'d5\'c8\'eb\'ca\'e4\'c8\'eb\'b5\'af\'b4\'b0
\f0 \
function openMonthInputModal() \{\
    document.getElementById('monthInputModal').style.display = 'block';\
\}\
\
// 
\f1 \'b9\'d8\'b1\'d5\'d4\'c2\'b7\'dd\'ca\'d5\'c8\'eb\'ca\'e4\'c8\'eb\'b5\'af\'b4\'b0
\f0 \
function closeMonthInputModal() \{\
    document.getElementById('monthInputModal').style.display = 'none';\
\}\
\
// 
\f1 \'d3\'a6\'d3\'c3\'d4\'c2\'b7\'dd\'ca\'d5\'c8\'eb\'ca\'e4\'c8\'eb\'b2\'a2\'bc\'c6\'cb\'e3
\f0 \
function applyMonthInputs() \{\
    // 
\f1 \'ca\'d5\'bc\'af\'b8\'f7\'d4\'c2\'b7\'dd\'ca\'d5\'c8\'eb\'ca\'fd\'be\'dd
\f0 \
    for(let i = 1; i <= 12; i++) \{\
        const input = document.getElementById(`monthIncome$\{i\}`);\
        const value = Number(input.value);\
        // 
\f1 \'c8\'e7\'b9\'fb\'ca\'e4\'c8\'eb\'c1\'cb\'d3\'d0\'d0\'a7\'ca\'fd\'d7\'d6\'a3\'ac\'d4\'f2\'b1\'a3\'b4\'e6\'a3\'bb\'b7\'f1\'d4\'f2\'c9\'e8\'ce\'aa
\f0 0\
        monthIncomes[i-1] = !isNaN(value) && value > 0 ? value : 0;\
    \}\
    \
    closeMonthInputModal();\
    // 
\f1 \'c8\'b7\'b1\'a3\'bc\'c6\'cb\'e3\'bd\'e1\'b9\'fb\'c3\'e6\'b0\'e5\'cf\'d4\'ca\'be\'b2\'a2\'bf\'aa\'ca\'bc\'bc\'c6\'cb\'e3
\f0 \
    document.getElementById('resultPanel').style.display = 'block';\
    startCalc();\
\}\
\
// 
\f1 \'b4\'f2\'bf\'aa\'bc\'c6\'cb\'b0\'d2\'c0\'be\'dd\'b5\'af\'b4\'b0
\f0 \
function openTaxInfo() \{\
    document.getElementById('taxInfoModal').style.display = 'block';\
\}\
\
// 
\f1 \'b9\'d8\'b1\'d5\'bc\'c6\'cb\'b0\'d2\'c0\'be\'dd\'b5\'af\'b4\'b0
\f0 \
function closeTaxInfo() \{\
    document.getElementById('taxInfoModal').style.display = 'none';\
\}\
\
// 
\f1 \'b5\'e3\'bb\'f7\'b5\'af\'b4\'b0\'cd\'e2\'b2\'bf\'b9\'d8\'b1\'d5
\f0 \
window.onclick = function(event) \{\
    const taxModal = document.getElementById('taxInfoModal');\
    const monthModal = document.getElementById('monthInputModal');\
    \
    if (event.target == taxModal) \{\
        taxModal.style.display = 'none';\
    \}\
    \
    if (event.target == monthModal) \{\
        monthModal.style.display = 'none';\
    \}\
\}}