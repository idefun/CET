// 获取所有输入元素
const nameInput = document.getElementById('name');
const idNumberInput = document.getElementById('id-number');
const schoolInput = document.getElementById('school');
const writtenExamNumberInput = document.getElementById('written-exam-number');
const listeningScoreInput = document.getElementById('listening-score');
const readingScoreInput = document.getElementById('reading-score');
const writingTranslationScoreInput = document.getElementById('writing-translation-score');
const writtenExamDateInput = document.getElementById('written-exam-date');
const oralExamNumberInput = document.getElementById('oral-exam-number');
const oralExamGradeInput = document.getElementById('oral-exam-grade');
const oralExamDateInput = document.getElementById('oral-exam-date');
const reportNumberInput = document.getElementById('report-number');
const photoInput = document.getElementById('photo');
const cet4Radio = document.getElementById('cet4');
const cet6Radio = document.getElementById('cet6');

// 获取所有预览元素
const previewTitle = document.getElementById('preview-title');
const previewName = document.getElementById('preview-name');
const previewIdNumber = document.getElementById('preview-id-number');
const previewSchool = document.getElementById('preview-school');
const previewWrittenExamNumber = document.getElementById('preview-written-exam-number');
const previewTotalScore = document.getElementById('preview-total-score');
const previewListeningScore = document.getElementById('preview-listening-score');
const previewReadingScore = document.getElementById('preview-reading-score');
const previewWritingTranslationScore = document.getElementById('preview-writing-translation-score');
const previewWrittenExamDate = document.getElementById('preview-written-exam-date');
const previewOralExamNumber = document.getElementById('preview-oral-exam-number');
const previewOralExamGrade = document.getElementById('preview-oral-exam-grade');
const previewOralExamDate = document.getElementById('preview-oral-exam-date');
const previewReportNumber = document.getElementById('preview-report-number');
const previewPhoto = document.getElementById('preview-photo');
const previewArea = document.getElementById('preview-area');

// 获取导出相关元素
const exportFormatSelect = document.getElementById('export-format');
const exportButton = document.getElementById('export-button');

// 初始化函数
function init() {
    // 监听考试类型切换事件
    cet4Radio.addEventListener('change', updateExamType);
    cet6Radio.addEventListener('change', updateExamType);

    // 为输入框添加事件监听器
    const inputs = [
        nameInput,
        idNumberInput,
        schoolInput,
        writtenExamNumberInput,
        listeningScoreInput,
        readingScoreInput,
        writingTranslationScoreInput,
        writtenExamDateInput,
        oralExamNumberInput,
        oralExamGradeInput,
        oralExamDateInput,
        reportNumberInput,
        photoInput
    ];

    inputs.forEach(input => {
        if (input === photoInput) {
            input.addEventListener('change', updatePhotoPreview);
        } else {
            input.addEventListener('input', updatePreview);
        }
    });

    // 页面加载完成后更新预览
    document.addEventListener('DOMContentLoaded', function () {
        updatePreview();
        // 设置初始图片
        previewPhoto.style.backgroundImage = `url('./avatar.png')`;
        previewPhoto.style.backgroundSize = 'cover';
        previewPhoto.style.backgroundPosition = 'center';
    });

    // 导出按钮事件监听
    exportButton.addEventListener('click', exportPreview);
}

// 更新考试类型
function updateExamType() {
    if (cet4Radio.checked) {
        previewTitle.textContent = '全国大学英语四级考试(CET4)成绩报告单';
    } else if (cet6Radio.checked) {
        previewTitle.textContent = '全国大学英语六级考试(CET6)成绩报告单';
    }
}

// 更新预览内容
function updatePreview() {
    // 更新个人信息
    previewName.textContent = nameInput.value || '钟离昧';
    previewIdNumber.textContent = idNumberInput.value || '123456789012345678';
    previewSchool.textContent = schoolInput.value || '清华大学';

    // 更新笔试成绩
    previewWrittenExamNumber.textContent = writtenExamNumberInput.value || '2024123456';
    // 计算并更新总分
    const totalScore = calculateTotalScore();
    previewTotalScore.textContent = totalScore;
    previewListeningScore.textContent = validateScore(listeningScoreInput.value) || '121';
    previewReadingScore.textContent = validateScore(readingScoreInput.value) || '160';
    previewWritingTranslationScore.textContent = validateScore(writingTranslationScoreInput.value) || '144';
    previewWrittenExamDate.textContent = writtenExamDateInput.value || '2024年12月';

    // 更新口试成绩
    previewOralExamNumber.textContent = oralExamNumberInput.value || '--';
    previewOralExamGrade.textContent = oralExamGradeInput.value || '--';
    previewOralExamDate.textContent = oralExamDateInput.value || '--';

    // 更新成绩报告单编号
    previewReportNumber.textContent = reportNumberInput.value || '202412345678';
}

// 更新照片预览
function updatePhotoPreview() {
    const file = photoInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewPhoto.style.backgroundImage = `url(${e.target.result})`;
            previewPhoto.style.backgroundSize = 'cover';
            previewPhoto.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(file);
    } else {
        // 当用户移除图片时，恢复初始图片
        const img = new Image();
        img.crossOrigin = 'anonymous'; // 设置跨域属性
        img.onload = function () {
            previewPhoto.style.backgroundImage = `url(${this.src})`;
            previewPhoto.style.backgroundSize = 'cover';
            previewPhoto.style.backgroundPosition = 'center';
        };
        img.onerror = function () {
            console.error('初始图片加载失败');
        };
        img.src = './avatar.png';
    }
}

// 页面加载完成后更新预览
document.addEventListener('DOMContentLoaded', function () {
    // 设置输入框的初始值
    listeningScoreInput.value = '121';
    readingScoreInput.value = '160';
    writingTranslationScoreInput.value = '144';

    updatePreview();
    // 设置初始图片
    const img = new Image();

    img.onload = function () {
        previewPhoto.style.backgroundImage = `url(${this.src})`;
        previewPhoto.style.backgroundSize = 'cover';
        previewPhoto.style.backgroundPosition = 'center';
    };
    img.onerror = function () {
        console.error('初始图片加载失败');
    };
    img.src = './avatar.png';

    // 检查 previewArea 是否正确获取
    if (!previewArea) {
        console.error('无法获取预览区域元素');
        return;
    }

    // 导出按钮事件监听
    exportButton.addEventListener('click', exportPreview);
});

// 计算总分
function calculateTotalScore() {
    const listeningScore = validateScore(listeningScoreInput.value) || 0;
    const readingScore = validateScore(readingScoreInput.value) || 0;
    const writingTranslationScore = validateScore(writingTranslationScoreInput.value) || 0;
    return listeningScore + readingScore + writingTranslationScore;
}

// 验证输入的成绩是否为有效数字
function validateScore(score) {
    const num = parseInt(score);
    return isNaN(num) ? null : num;
}

// 导出预览内容
function exportPreview() {
    const format = exportFormatSelect.value;
    if (format === 'image') {
        exportAsImage();
    } else if (format === 'pdf') {
        exportAsPdf();
    }
}
const previewContent = document.getElementById('preview-content');
// 导出为图片
function exportAsImage() {
    if (!previewContent) {
        console.error('预览内容区域元素无效');
        return;
    }
    setTimeout(() => {
        // 滚动到顶部
        previewContent.scrollTop = 0;
        previewContent.scrollLeft = 0;

        html2canvas(previewContent, { useCORS: true }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'preview.png';
            link.href = imgData;
            link.click();
        }).catch(error => {
            console.error('导出图片时出错:', error);
        });
    }, 100); // 可根据实际情况调整延迟时间
}

// 导出为 PDF
function exportAsPdf() {
    if (!previewContent) {
        console.error('预览内容区域元素无效');
        return;
    }
    setTimeout(() => {
        // 滚动到顶部
        previewContent.scrollTop = 0;
        previewContent.scrollLeft = 0;

        html2canvas(previewContent, { useCORS: true }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('preview.pdf');
        }).catch(error => {
            console.error('导出 PDF 时出错:', error);
        });
    }, 100); // 可根据实际情况调整延迟时间
}

// 初始化应用
init();
