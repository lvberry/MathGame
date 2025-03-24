// 主要JavaScript文件
document.addEventListener('DOMContentLoaded', function() {
    // 网站加载完成后的通用逻辑
    console.log('趣味数学乐园网站已加载');
    
    // 添加音效
    const addSoundEffects = () => {
        // 获取所有游戏卡片
        const gameCards = document.querySelectorAll('.game-card');
        
        // 为每个卡片添加点击音效
        gameCards.forEach(card => {
            card.addEventListener('click', () => {
                playSound('click');
            });
        });
    };
    
    // 播放音效函数
    window.playSound = function(soundType) {
        let sound;
        
        switch(soundType) {
            case 'click':
                sound = new Audio('sounds/click.mp3');
                break;
            case 'correct':
                sound = new Audio('sounds/correct.mp3');
                break;
            case 'wrong':
                sound = new Audio('sounds/wrong.mp3');
                break;
            case 'complete':
                sound = new Audio('sounds/complete.mp3');
                break;
            default:
                return;
        }
        
        // 音量调低，适合儿童
        sound.volume = 0.5;
        sound.play().catch(error => {
            console.log('音频播放失败:', error);
        });
    };
    
    // 显示反馈动画
    window.showFeedback = function(isCorrect) {
        const feedback = document.createElement('div');
        feedback.className = 'feedback';
        feedback.textContent = isCorrect ? '✓' : '✗';
        feedback.style.color = isCorrect ? '#4caf50' : '#f44336';
        
        document.body.appendChild(feedback);
        
        // 触发动画
        setTimeout(() => {
            feedback.classList.add('show');
        }, 10);
        
        // 动画结束后移除元素
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 1000);
    };
    
    // 初始化
    addSoundEffects();
}); 