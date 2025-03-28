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

    // 存储游戏得分
    window.saveGameScore = function(gameId, score) {
        const highScore = parseInt(localStorage.getItem(`${gameId}_highScore`) || 0);
        
        if (score > highScore) {
            localStorage.setItem(`${gameId}_highScore`, score);
            return true; // 表示创造了新纪录
        }
        
        return false; // 没有创造新纪录
    };

    // 获取游戏最高分
    window.getGameHighScore = function(gameId) {
        return parseInt(localStorage.getItem(`${gameId}_highScore`) || 0);
    };

    // 记录游戏次数
    window.recordGamePlayed = function(gameId) {
        const gamesPlayed = parseInt(localStorage.getItem(`${gameId}_gamesPlayed`) || 0);
        localStorage.setItem(`${gameId}_gamesPlayed`, gamesPlayed + 1);
        return gamesPlayed + 1;
    };

    // 获取游戏次数
    window.getGamesPlayed = function(gameId) {
        return parseInt(localStorage.getItem(`${gameId}_gamesPlayed`) || 0);
    };

    // 重置游戏数据
    window.resetGameData = function(gameId) {
        localStorage.removeItem(`${gameId}_highScore`);
        localStorage.removeItem(`${gameId}_gamesPlayed`);
    };

    // 获取游戏统计信息
    window.getGameStats = function(gameId) {
        return {
            highScore: getGameHighScore(gameId),
            gamesPlayed: getGamesPlayed(gameId)
        };
    };

    // 初始化
    addSoundEffects();
}); 