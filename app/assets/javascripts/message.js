$(function(){ 
   function buildHTML(message){
     if(message.image){
       var html =
       `<div class="main__messages__message" id=${message.id}>
         <div class="main__messages__message__user">
          <div class="main__messages__message__user__name">
           ${message.user_nickname}
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
       `<div class="main__messages__message" id=${message.id}>
          <div class="main__messages__message__user">
            <div class="main__messages__message__user__name">
              ${message.user_nickname}
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

   }
    

    
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
      console.log(data)
      var html = buildHTML(data);
      $('.main__messages').append(html);
      $('#new_message')[0].reset();
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  });
});