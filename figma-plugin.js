// Figma 플러그인 채널 3055와의 통신을 위한 코드
figma.showUI(__html__, { width: 450, height: 300 });

const FILE_ID = 'Iv7ir2QlkA6G30ANy2VbOK';
const NODE_ID = '20-53';

// 메시지 수신 처리
figma.ui.onmessage = msg => {
  if (msg.type === 'create-rectangles') {
    const nodes = [];
    
    for (let i = 0; i < 5; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  
  // 채널 3055로부터의 메시지 처리
  if (msg.type === 'channel-3055') {
    console.log('채널 3055로부터 메시지 수신:', msg.data);
    
    // Figma 파일 접근
    figma.getFileById(FILE_ID).then(file => {
      console.log('Figma 파일 접근 성공:', file.name);
      
      // 특정 노드 접근
      const node = figma.getNodeById(NODE_ID);
      if (node) {
        console.log('노드 접근 성공:', node.name);
        // 노드 관련 작업 수행
      }
    }).catch(error => {
      console.error('Figma 파일 접근 실패:', error);
    });
  }
};

// 플러그인 종료 시 처리
figma.on('close', () => {
  // 정리 작업 수행
}); 