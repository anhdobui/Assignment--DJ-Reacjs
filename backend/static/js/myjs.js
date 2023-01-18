function toast ({
    title = '',
    message = '', 
    type='', 
    duration = 3000
}){
    const main = document.getElementById('toast');
    if(main){
        const toast = document.createElement('div');
        // Auto remove 
       const autoRemoveId = setTimeout(function(){
            main.removeChild(toast);
       },duration + 1200)
        // Remove on click
        toast.onclick = function(e){
            if(e.target.closest('.toast__close')){
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        }
        toast.classList.add('toast',`toast--${type}`);
        const delay = (duration / 1000).toFixed(2);
        toast.style.animation = `slideOnLeft ease 1.2s , fadeOut linear 1.2s ${delay}s forwards`;
        
        const icons = {
            success: 'fa fa-check-circle-o',
            warn: 'fa fa-exclamation-triangle',
            error: 'fa fa-exclamation-circle',
        }
        const icon = icons[type];
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}" aria-hidden="true"></i>
            </div>
            <div class="toast__content">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fa fa-times-circle-o" aria-hidden="true"></i>
            </div>
        `;
        main.appendChild(toast);
}
}
function ShowSuccessToast (){
    toast({
        title:'Success',
        message: 'Máy vi tính kết nối internet(Windows, Ubuntu hoặc MacOS',
        type:'success',
        duration: 3000
    })
}

function ShowWarnToast (){
    toast({
        title:'Warn',
        message:'Cảnh báo sự cố ngoài ý muốn có thể xảy ra! Hãy kiểm tra kỹ lại!',
        type: 'warn',
        duration:3000
    })
}

function ShowErrorToast (){
    toast({
        title:'Error',
        message:'Đã có lỗi xảy ra!Kết nối thất bại!',
        type:'error',
        duration:5000
    })
}