if (location.href.indexOf('#raid') < 0) {
  console.log('exchange.js');  

  // 5時で切り替わる日付
  const today = () => {
    const date = new Date(new Date().getTime() + 3600 * 4 * 1000);
    return `${date.getUTCFullYear()}/${date.getUTCMonth()+1}/${date.getUTCDate()}`;
  }


  // 交換ポップアップ窓が出現したとき日付を保存する
  window.onload = (e) => {

    // マイぺを訪れたとき交換がまだなら音を鳴らす
    if(location.href.indexOf('mypage') > 0) {
      if(localStorage.getItem('last_exchange') != today()) {
        const audio = new Audio();
        audio.src = chrome.extension.getURL('sound.mp3');
        audio.volume = 0.5;
        audio.play();
      }
    }

    //<div class="prt-popup-header">交換完了</div>
    //<div class="item-name">星晶の欠片(5個)</div>

    const target = document.getElementsByClassName('contents')[0];
    // オブザーバインスタンスを作成
    const observer = new MutationObserver((mutations) => {
      //console.log(mutations);
      for(let record of mutations) {
        const node = record.target;
        if(node.id != 'pop')
          continue;
        const text = node.innerHTML; 
        if(text && text.indexOf('交換完了') >= 0 /* && text.indexOf('星晶の欠片(5個)' */) {
          console.log('exchange');
          localStorage.setItem('last_exchange', today());
          return; 
        }
      }
    });

    // オブザーバの設定
    const config = { subtree: true, childList: true};

    // 対象ノードとオブザーバの設定を渡す
    observer.observe(target, config);
  };
}