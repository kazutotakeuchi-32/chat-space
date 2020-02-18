$(function(){ 
  
// インクリメンタルサーチ
   function buildHTML(message){
     if(message.image){
       var html =
       `<div class="main__messages__message" data-message-id=${message.id}>
         <div class="main__messages__message__user">
          <div class="main__messages__message__user__name">
           ${message.user_name}
          </div>
          <div class="main__messages__message__user__time">
           ${message.created_at}
           </div>
       </div>
       <div class="main__messages__message__text">
       <p class="lower-message__content">
          ${message.content}
         </p>
       
       </div>
       <img src=${message.image} >
         </div>`
   
       return html;
     }else{
       var html = 
       `<div class="main__messages__message" data-message-id =${message.id}>
          <div class="main__messages__message__user">
            <div class="main__messages__message__user__name">
              ${message.user_name}
            </div>
            <div class="main__messages__message__user__time">
            ${message.created_at}
            </div>
          </div>
          <div class="main__messages__message__text">
            <p class="lower-message__content">
            ${message.content}
          </p>
          </div>
       </div>`
       return html;
     }
      
     
    };
     
    

    
  $('#new_message').on( 'submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: 'POST', 
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__messages').append(html);
      $('#new_message')[0].reset();
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
   })
    .always(function() {
    $('.submit-btn').prop('disabled', false);
  });
  });
   var reloadMessages = function() {
    last_message_id = $('.main__messages__message:last').data("message-id");
    console.log(last_message_id)
    
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages,function(i,message){
        insertHTML += buildHTML(message)
      });
      console.log("aaa");
      $('.main__messages').append(insertHTML);
      $('.main__messages').animate({scrollTop: $('.main__messages')[0].scrollHeight});
    }
    })
    .fail(function() {
      console.log('error');
    });
  };
  // setInterval(reloadMessages, 7000);
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
