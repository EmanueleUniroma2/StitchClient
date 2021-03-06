

// if offline becomes online-> refresh app
function updateOnlineStatus(){
	location.reload();
}
window.addEventListener('online',  updateOnlineStatus);

var lastInitedAppClient = null;
var singletonRegisteredEventListeners = [];


var menuInitialTouchX = 0;
var menuInitialSlideMargin = 0;
function startUserMenuUberSlide(e) {
	
  let menu = document.getElementById("toolbar_user_menu_id");
  menuInitialSlideMargin = 0;

  e = e || window.event;
  menuInitialTouchX = e.touches[0].clientX;
  document.ontouchmove = continueUserMenuUberSlide;
  document.ontouchend = endUserMenuUberSlide;
}

function continueUserMenuUberSlide(e) {
  let menu = document.getElementById("toolbar_user_menu_id");
  e = e || window.event;

  let delta = e.touches[0].clientX - menuInitialTouchX;

  if(delta > 0){
    menu.style.marginRight = (menuInitialSlideMargin-delta).toString()+"px";
  }
}

function endAnyLeftMenuSlide(){
  document.ontouchmove = null;
  document.ontouchend = null;
  document.ontouchstart = null;
}

function endUserMenuUberSlide(e){
  let menu = document.getElementById("toolbar_user_menu_id");
  document.ontouchmove = null;
  document.ontouchend = null;
  
  if(menu.style.marginRight.split("px")[0] < -50){
    document.ontouchstart = null;
    closeMenu();
  }
  else{
    menu.style.marginLeft = "0px";
  }
}

function mobileCheck() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function mobileAndTabletCheck() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function getMobileLevelInner(){
   if(mobileCheck()){
	   return 2;
   }
   if(mobileAndTabletCheck()){
	   return 2;
   }
   return 0;
}

function getMobileLevel(){
	
   let r = localStorage.getItem("mobile-level");
   if(!isNullOrUndefined(r)){
	   return +r;
   }
	
   let result = getMobileLevelInner();
   localStorage.setItem("mobile-level", result.toString());
   return result;
}

async function performDefaultLogin() {
    if (isNullOrUndefined(lastInitedAppClient)) {
        return;
    }
    let email = getInputValue("login_email").trim();
    let password = getInputValue("login_password");
    if (await lastInitedAppClient.fullLoginFetchSequence(email, password) == null) {
        navigate(lastInitedAppClient.targetPageAfterLogin);
    }
}

async function performDefaultLogout() {
    if (isNullOrUndefined(lastInitedAppClient)) {
        return;
    }
    if (await lastInitedAppClient.logout() == null) {
        navigate(lastInitedAppClient.appPages[0]["name"]);
    }
}

function performDefaultRegister() {
    if (isNullOrUndefined(lastInitedAppClient)) {
        return;
    }
    let email = getInputValue("register_email").trim();
    let password = getInputValue("register_password");
    let password_2 = getInputValue("register_password_2");
    lastInitedAppClient.registerUser(email, password, password_2);
}


function performDefaultEmailResend() {
    if (isNullOrUndefined(lastInitedAppClient)) {
        return;
    }
    let email = getInputValue("register_email").trim();
    lastInitedAppClient.resendConfirmationEmail(email);
}

async function performDefaultPasswordReset() {
    if (isNullOrUndefined(lastInitedAppClient)) {
        return;
    }
    let password = getInputValue("reset_password");
    let password_2 = getInputValue("reset_password_2");
    if (await lastInitedAppClient.resetPassword(password, password_2) == null) {
        navigate('login');
    }
}

async function performDefaultResetPasswordEmailRequest() {
    if (isNullOrUndefined(lastInitedAppClient)) {
        return;
    }
    let form_email = getInputValue("reset_password_email").trim();
    if (await lastInitedAppClient.sendResetPasswordEmail(form_email) == null) {
        navigate('login');
    }
}

async function performDefaultUserConfirmation() {
    if (isNullOrUndefined(lastInitedAppClient)) {
        return;
    }
    if (await lastInitedAppClient.confirmUser() == null) {
        navigate('login');
        lastInitedAppClient.openInfoDialog(getTranslatedMessage("user_account_created"));
    }
}

function navigateBack() {
    window.history.back();
}

const frameworkSystemSettings = {
    "language": "it"
};

function getTranslatedMessage(id) {
    let msg = languagePack[frameworkSystemSettings["language"]][id];
    if (isVoidString(msg)) {
        return "?(" + id + ")";
    }
    return msg;
}

const languagePack = {
    "en": {

    },
    "it": {
        "mongo_client_missing": "Errore di setup: Il client Stitch non ?? impostato su alcuna applicazione Stitch.",
        "no_userdata_collection_defined": "Errore di setup: Collezione User-Data non definita.",
        "close": "Chiudi",
        "note": "Attenzione",
        "required_data": "Inserisci i seguenti campi.",
        "confirm_action": "Confermare azione",
        "no": "No",
        "yes": "Si",
        "cancel": "Annulla",
        "proceed": "Procedi",
        "message_from_site": "Messaggio dal sito",
        "information": "Messaggio informativo",
        "site_err_no_internet": "Il server non ?? momentaneamente disponibile, oppure non sei connesso ad internet.",
        "site_err_occupied": "Il sito era momentaneamente occupato e non ha potuto gestire la richiesta. Fare un altro tentativo dovrebbe risolvere il problema.",
        "site_err_credentials": "Sono state fornite credenziali errate, oppure non esiste un account associato a queste credenziali.",
        "site_err_invalid_user": "L'utenza indicata non ?? autorizzata a registrarsi su questo sistema.",
        "site_err_password_size": "La password deve essere lunga tra 6 e 128 caratteri.",
        "site_err_user_already_exists": "Esiste gi?? un utente registrato con questa email.",
        "site_err_invalid_token": "Token non valido. Ripetere la procedura.",
        "site_err_email_already_registered": "Questa email ?? associata ad un account gi?? correttamente registrato.",
        "site_err_expired_token": "Il token di accesso ?? scaduto o invalido.",
        "site_err_user_not_exists": "L'email indicata non ?? associata ad alcun utente registrato.",
        "site_err_bad_request": "La chiamata API che si ?? tentata era mal strutturata.",
        "site_err_unknown_error": "Errore sconosciuto",
        "site_err_expired_session": "La sessione ?? scaduta, devi eseguire di nuovo il login.",
        "confirm_leave_page": "Sei sicuro di voler cambiare pagina? Il lavoro non salvato andr?? perduto.",
        "page_does_not_exists": "La pagina a cui vuoi accedere non esiste.",
        "suggest_go_back": "Torna indietro",
        "page_does_not_exists_or_requires_login": "La pagina a cui vuoi accedere ?? riservata agli utenti registrati, oppure non esiste.",
        "suggest_login_1": "Se possiedi un account registrato, puoi accedere tramite la",
        "suggest_login_2": "pagina di accesso.",
        "account_confirmed": "Il tuo account ?? stato confermato con successo.",
        "password_cannot_be_empty": "Il campo Password non pu?? essere vuoto.",
        "password_mismatch": "Le due password non coincidono.",
        "password_resetted": "Password reimpostata con successo.",
        "email_cannot_be_empty": "Il campo Email non pu?? essere vuoto.",
        "email_must_be_valid": "Il campo Email deve contenere un indirizzo email valido.",
        "register_email_sent": "Abbiamo inviato una email di conferma al tuo indirizzo. Clicca nel link dell'email per completare la registrazione.",
        "reset_email_sent": "Abbiamo inviato una email di reset password al tuo indirizzo. Clicca nel link dell'email per completare il reset della password.",
        "sync_data": "Sincronizzazione dati...",
        "err_sync_data": "Impossibile caricare i dati...",
        "default_pages_login": "Accedi con le tue credenziali.",
        "default_pages_login_not_registered": "Non sei registrato?",
        "default_pages_login_not_registered_link": "Registrati ora!",
        "default_pages_login_forgot_password": "Hai scordato la tua password?",
        "default_pages_login_forgot_password_link": "Reimposta la tua password.",
        "login": "ACCEDI",
        "register": "REGISTRATI",
        "back": "INDIETRO",
        "register_title": "Registra un account",
        "did_not_receive_email": "Non hai ricevuto l'email di conferma?",
        "ask_for_another_email": "Richiedi un altra email.",
        "user_account_created": "Il tuo account ?? stato creato!",
        "ask_for_another_email_tooltip": "*Verr?? usata l'email indicata nel form sopra.",
        "email_confirmation_page": "Se tutto ?? andato a buon fine, vedrai un messaggio di conferma.",
        "goto_login": "VAI AL LOGIN",
        "send_email": "INVIA EMAIL",
        "abort": "ANNULLA",
        "reset_password_title": "Reimposta la tua password",
        "password_repeat": "Ripeti password",
        "reset": "REIMPOSTA",
		"cant_update_while_offline": "Non puoi aggiornare l'App quando non sei connesso a internet.",
        "register_cannot_access_title": "Reimposta la password",
        "register_cannot_access": "Se non riesci ad accedere con il tuo account, inserisci la tua email. Se esiste un account registrato con quella email, ti invieremo una email con il link con cui potrai reimpostare la password."
    },
    "sp": {

    }
}

function checkUserIsAuthenticated() {
    if (lastInitedAppClient.isLoggedIn() && !isVoidString(lastInitedAppClient.targetPageAfterLogin)) {
        navigate(lastInitedAppClient.targetPageAfterLogin);
    }
}

var StitchDefaultPages = [{
        "name": "login",
        "requiresAuth": false,
        "content": [{
            "node_type": "div",
            "node_afterinit": "checkUserIsAuthenticated",
            "node_tags": [
                [
                    "className",
                    "form_page"
                ]
            ],
            "node_childs": [{
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "title"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("default_pages_login")
                        ]
                    ]
                },
                {
                    "node_type": "input",
                    "node_tags": [
                        [
                            "id",
                            "login_email"
                        ],
                        [
                            "type",
                            "text"
                        ],
                        [
                            "className",
                            "input_entry"
                        ],
                        [
                            "placeholder",
                            "Email"
                        ]
                    ]
                },
                {
                    "node_type": "input",
                    "node_tags": [
                        [
                            "id",
                            "login_password"
                        ],
                        [
                            "type",
                            "password"
                        ],
                        [
                            "className",
                            "input_entry"
                        ],
                        [
                            "placeholder",
                            "Password"
                        ]
                    ]
                },
                {
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "button"
                        ],
                        [
                            "onclick",
                            "performDefaultLogin();"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("login")
                        ]
                    ]
                },
                {
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "inline_with_link_text"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("default_pages_login_not_registered")
                        ]
                    ],
                    "node_childs": [{
                        "node_type": "div",
                        "node_tags": [
                            [
                                "className",
                                "inline_link_label"
                            ],
                            [
                                "innerHTML",
                                getTranslatedMessage("default_pages_login_not_registered_link")
                            ],
                            [
                                "onclick",
                                "navigate('register')"
                            ]
                        ]
                    }]
                },
                {
                    "node_type": "br",
                    "node_tags": [

                    ]
                },
                {
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "inline_with_link_text"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("default_pages_login_forgot_password")
                        ]
                    ],
                    "node_childs": [{
                        "node_type": "div",
                        "node_tags": [
                            [
                                "className",
                                "inline_link_label"
                            ],
                            [
                                "innerHTML",
                                getTranslatedMessage("default_pages_login_forgot_password_link")
                            ],
                            [
                                "onclick",
                                "navigate('request_password_reset')"
                            ]
                        ]
                    }]
                }
            ]
        }]
    },
    {
        "name": "register",
        "requiresAuth": false,
        "content": [{
            "node_type": "div",
            "node_tags": [
                [
                    "className",
                    "form_page"
                ]
            ],
            "node_childs": [{
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "title"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("register_title")
                        ]
                    ]
                },
                {
                    "node_type": "input",
                    "node_tags": [
                        [
                            "id",
                            "register_email"
                        ],
                        [
                            "type",
                            "text"
                        ],
                        [
                            "className",
                            "input_entry"
                        ],
                        [
                            "placeholder",
                            "Email"
                        ]
                    ]
                },
                {
                    "node_type": "input",
                    "node_tags": [
                        [
                            "id",
                            "register_password"
                        ],
                        [
                            "type",
                            "password"
                        ],
                        [
                            "className",
                            "input_entry"
                        ],
                        [
                            "placeholder",
                            "Password"
                        ]
                    ]
                },
                {
                    "node_type": "input",
                    "node_tags": [
                        [
                            "id",
                            "register_password_2"
                        ],
                        [
                            "type",
                            "password"
                        ],
                        [
                            "className",
                            "input_entry"
                        ],
                        [
                            "placeholder",
                            "Ripeti password"
                        ]
                    ]
                },
                {
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "button"
                        ],
                        [
                            "onclick",
                            "performDefaultRegister();"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("register")
                        ]
                    ]
                },
                {
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "button"
                        ],
                        [
                            "onclick",
                            "navigate('login')"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("back")
                        ]
                    ]
                },
                {
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "inline_with_link_text"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("did_not_receive_email")
                        ]
                    ],
                    "node_childs": [{
                        "node_type": "div",
                        "node_tags": [
                            [
                                "className",
                                "inline_link_label"
                            ],
                            [
                                "innerHTML",
                                getTranslatedMessage("ask_for_another_email")
                            ],
                            [
                                "onclick",
                                "performDefaultEmailResend();"
                            ]
                        ]
                    }]
                },
                {
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "small_form_text"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("ask_for_another_email_tooltip")
                        ]
                    ]
                }
            ]
        }]
    },
    {
        "name": "confirm_user",
        "requiresAuth": false,
        "content": [{
            "node_type": "div",
            "node_afterinit": "performDefaultUserConfirmation",
            "node_tags": [
                [
                    "className",
                    "form_page"
                ]
            ],
            "node_childs": [{
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "title"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("email_confirmation_page")
                        ]
                    ]
                },
                {
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "button"
                        ],
                        [
                            "onclick",
                            "navigate('login')"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("goto_login")
                        ]
                    ]
                }
            ]
        }]
    },
    {
        "name": "request_password_reset",
        "requiresAuth": false,
        "content": [{
            "node_type": "div",
            "node_tags": [
                [
                    "className",
                    "form_page"
                ]
            ],
            "node_childs": [
			{
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "title"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("register_cannot_access_title")
                        ]
                    ]
			},
			{
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "topbar_specification"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("register_cannot_access")
                        ]
                    ]
                },
                {
                    "node_type": "input",
                    "node_tags": [
                        [
                            "id",
                            "reset_password_email"
                        ],
                        [
                            "type",
                            "text"
                        ],
                        [
                            "className",
                            "input_entry"
                        ],
                        [
                            "placeholder",
                            "Email"
                        ]
                    ]
                },
                {
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "button"
                        ],
                        [
                            "onclick",
                            "performDefaultResetPasswordEmailRequest();"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("send_email")
                        ]
                    ]
                },
                {
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "button"
                        ],
                        [
                            "onclick",
                            "navigate('login')"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("abort")
                        ]
                    ]
                }
            ]
        }]
    },
    {
        "name": "reset_password",
        "requiresAuth": false,
        "content": [{
            "node_type": "div",
            "node_tags": [
                [
                    "className",
                    "form_page"
                ]
            ],
            "node_childs": [{
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "title"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("reset_password_title")
                        ]
                    ]
                },
                {
                    "node_type": "input",
                    "node_tags": [
                        [
                            "id",
                            "reset_password"
                        ],
                        [
                            "type",
                            "password"
                        ],
                        [
                            "className",
                            "input_entry"
                        ],
                        [
                            "placeholder",
                            "Password"
                        ]
                    ]
                },
                {
                    "node_type": "input",
                    "node_tags": [
                        [
                            "id",
                            "reset_password_2"
                        ],
                        [
                            "type",
                            "password"
                        ],
                        [
                            "className",
                            "input_entry"
                        ],
                        [
                            "placeholder",
                            getTranslatedMessage("password_repeat")
                        ]
                    ]
                },
                {
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "button"
                        ],
                        [
                            "onclick",
                            "performDefaultPasswordReset();"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("reset")
                        ]
                    ]
                },
                {
                    "node_type": "div",
                    "node_tags": [
                        [
                            "className",
                            "button"
                        ],
                        [
                            "onclick",
                            "navigate('login')"
                        ],
                        [
                            "innerHTML",
                            getTranslatedMessage("abort")
                        ]
                    ]
                }
            ]
        }]
    }
];

const Stitch_FrameWork_EmbeddedStyles = `
/* Pages */
html{
  font-family: arial;
}
.body_style{
  margin: 0;
  padding: 0;
  background: linear-gradient(45deg, #5661a4, #cce3ff);
  min-height: 100vh;
}
.form_page{
  padding: 0;
  text-align: center;
}
.inner_page{

}

/* Widgets specific styles */
.input_entry{
  margin: 0.5rem auto;
  width: 100%;
  max-width: 20rem;
  display: block;
}
.checkbox_label_wrap{
  cursor: pointer;
}
.checkbox_label{
  display: inline-block;
  margin-left: 0.5rem;
}
.button{
  background: linear-gradient(45deg, #cdd0e7, #f6faff);
  padding: 0.5rem;
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  width: 90%;
  max-width: 17rem;
  margin: 2rem auto;
  user-select: none;
  box-shadow: #0000008a 0.4rem 0.4rem 0.4rem;
}
.button:hover{
  background: linear-gradient(45deg, #babdd3, #dfe3e8);
}
.button:active{
  background: linear-gradient(45deg, #a8aabe, #b2b6bb);
}


/* Specific dialogs styles */

.stitch_modal_dialog_inkdrop{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 50;
    background-color: rgba(0,0,0,0.8);
    opacity: 0;
    transition: opacity 0.3s ease-out;
}
.stitch_bread_crumb {
    position: fixed;
    z-index: 100;
    bottom: 1em;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.9);
    padding: 0.5em 1em;
    color: white;
    font-size: 1.1em;
    text-align: center;
    border-radius: 0.5em;
    margin: 0 auto;
    width: 1rem;
    width: min-content;
    max-width: 30em;
    min-width: 20em;
}
.stitch_modal_dialog{
	border-radius: 1rem;
	margin: 10em auto;
	background-color: white;
	width: 70vw;
	padding: 1em;
}
.stitch_modal_title{
  font-weight: bold;
  font-size: 1.3em;
  color: black;
  margin-bottom: 1rem;
}
.stitch_modal_button{
	display: inline-block;
  margin: 0.5rem 1em;
  color: black;
  font-weight: bold;
  border: 1px solid;
  padding: 0.1em 0.4em;
  min-width: 5em;
  text-align: center;
  cursor: pointer;
  user-select: none;
}
.stitch_api_spinner_backdrop{
    position: fixed;
    top: 0em;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    opacity: 0.7;
    z-index: 15;
    display: flex;
    align-items: center;
    justify-content: center;
}
.stitch_api_spinner{
  margin: 0 auto;
  top: 10em;
  width: 7em;
  height: 7em;
  border: 1em solid transparent;
  border-radius: 50%;
  border-bottom: 1em solid #3b3b9e;
  animation: stitch_spinner_spin 0.5s linear infinite;
  z-index: 15;
}
@keyframes stitch_spinner_spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
"@-moz-keyframes stitch_spinner_spin {
	from {
		-moz-transform: rotate(0deg);
	}
	to {
		-moz-transform: rotate(360deg);
	}
}
.stitch_dialog_input_title{
  text-align: left;
  opacity: 0.7;
  border-top: 1px solid;
}
.stitch_dialog_input{
  width: 80%;
  margin: 1rem 9;
}



/* Specific generic styles */
.title{
  font-size: min(5vw,2rem);
  background-color: rgba(0,0,0,0.1);
  color: #2e4186;
  padding: 0.5rem;
  border: 1px solid rgba(0,0,0,0.2);
  margin-bottom: 2em;
}
.subtitle{
  background: rgba(255,255,255,0.4);
  border: 1px solid rgba(0,0,0,0.2);
  margin: 1rem 0;
  padding: 0.5rem;
  text-align: left;
}
.generic_label{
  color: rgba(0,0,0,0.8);
}
.generic_select{
  padding: 0.5rem;
  width: 100%;
  margin: 0.5rem 0;
}
.new_group_select_small{
  width: 84% !important;
}
.new_group_select{
  margin: 0 1rem;
  width: 41.5%;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.group_select_option{
  font-size: 1.1rem;
}
.new_group_button{
  margin: 0 1rem !important;
  width: 40.5%;
  display: inline-block;
  min-width: 20.6rem;
  position: relative;
  top: 0.2rem;
}
.new_group_button_small{
  width: 82% !important;
}
.generic_disabled_button{
  background: rgba(0,0,0,0.1);
  border: 2px solid rgba(0,0,0,0.2);
  margin: 0.2rem;
  padding: 0.2rem;
  text-align: center;
  user-select: none;
  opacity: 0.4;
}
.generic_button{
  background: rgba(0,0,0,0.1);
  border: 2px solid rgba(0,0,0,0.2);
  margin: 0.2rem;
  padding: 0.2rem;
  text-align: center;
  cursor: pointer;
  user-select: none;
}
.generic_button:hover{
  background: rgba(0,0,0,0.2);
}
.generic_button:active{
  background: rgba(0,0,0,0.3);
}
.home_squares_wrapper{
  width: 100%;
}
.home_left_square{
  background: rgba(255,255,255,0.4);
  margin: 1rem;
  border: 1px solid rgba(0,0,0,0.2);
  padding: 0.5rem;
  width: 40%;
  display: inline-block;
  min-width: 20rem;
}
.home_left_square_small{
  width: 87% !important;
}
.home_right_square{
  margin: 1rem;
  display: inline-block;
  width: 50%;
}
.home_right_square_small{
  width: 90% !important;
}
.version{
  right: 1rem;
  float: right;
  font-size: 0.8rem;
  opacity: 0.8;
  font-family: monospace;
  position: fixed;
  bottom: 1rem;
  user-select: none;
}
.travel_gif{
  margin-bottom: 1rem;
}
.inline_with_link_text{
  margin-top: 1rem;
  display: inline-block;
}
.inline_link_label{
  display: inline-block;
  cursor: pointer;
  border-bottom: 1px solid blue;
  color: blue;
  margin-left: 0.5rem;
}
.small_form_text{
  margin-top: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.8;
}
.toolbar_user_menu{
  position: fixed;  
  top: 0;
  z-index: 10;
  height: 100vh;
  right: 0;
  width: 0; 
  overflow-y: hidden;
  transition: width 0.2s ease-out;
  background: white;
  border-left: 2px solid black;
}
.toolbar_user_menu_inkdrop{
	position: fixed;
	top:0;
	left:0;
	width:100vw;
	height:100vh;
	background: rgba(0,0,0,0.8);
	opacity: 0;
	transition: opacity 0.2s ease-out;
}
.toolbar_user_menu_row{
  padding: 1rem;
  border-top: 1px solid rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.05);
  margin: 0.2em;
}
.toolbar_user_menu_row:hover{
background: rgba(0,0,0,0.1);
}
.toolbar_user_menu_row:active{
background: rgba(0,0,0,0.2);
}
.topbar_specification{
    margin: 1em;
    padding: 1rem;
    background: rgba(255,255,255,0.7);
    border: 1px solid rgba(0,0,0,0.2);
}
.toolbar_label{
  display: inline-block;
  width: 45%;
  font-size: 1.1rem;
  background: linear-gradient(45deg, white, 30%, #ffffff00, 90%, #ffffff00, 100%, #ffffff00);
  padding: 0.2rem 1rem;
  border-radius: 0.6rem;
  font-weight: bold;
}
.toolbar_label_small{
  display: inline-block;
  width: 36%;
  font-size: 1rem;
  background: linear-gradient(45deg, white, 30%, #ffffff00, 90%, #ffffff00, 100%, #ffffff00);
  padding: 0.2rem 1rem;
  border-radius: 0.6rem;
  font-weight: bold;
}
.toolbar_button{
  display: inline-block;
  float: right;
  cursor: pointer;
  padding: 0.2rem 1rem;
  background: rgba(0,0,0,0.05);
  user-select: none;
  border: 1px solid rgba(0,0,0,0.2);
}
.toolbar_button:hover{
  background: rgba(0,0,0,0.1);
}
.toolbar_button:active{
  background: rgba(0,0,0,0.2);
}
.go_to_login_help{
  text-align: center;
  color: #27282e;
}
.go_back_link{
  width: fit-content;
  margin: 0 auto;
  cursor:pointer;
  color: blue;
}
.go_to_login_link{
  display: inline-block;
  margin-left: 0.5rem;
  color: blue;
  border-bottom: 1px solid blue;
  cursor: pointer;
}
.locked_page_label{
  text-align: center;
  margin-top: 10rem;
  margin-bottom: 2rem;
  color: #27282e;
}
.page_title{
  margin-top: 1rem;
  padding: 0.5rem;
  padding-left: 2rem;
  font-size: 1.5rem;
  background: linear-gradient(45deg, rgba(0,0,0,0.2), transparent);
}
.home_group_description{
  padding: 0.5rem;
  padding-left: 2rem;
  padding-top: 0.2rem;
  background: linear-gradient(45deg, rgba(255,255,255,0.2), transparent);
}
.profile_page_info_wrap{
  padding-top: 2rem;
}
.user_profile_entry_title{
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(45deg, rgba(255,255,255,0.2), transparent);
}
.user_profile_entry{
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(45deg, rgba(0,0,0,0.1), transparent);
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.4);
}
.edit_profile_button {
  margin: 0 1rem;
  width: 40.5%;
  display: inline-block;
  min-width: 20.6rem;
  margin-top: 2rem;
}
.edit_profile_button_small{
  width: 84% !important;
}
.refresh_groups_icon_inner{
  height: 1.5rem;
  opacity: 0.7;
}
.refresh_groups_icon{
  display: inline-block;
  background: rgba(0,0,0,0.1);
  padding: 0.5rem;
  border: 1px solid rgba(0,0,0,0.2);
  cursor: pointer;
}
.refresh_groups_icon:hover{
  background: rgba(0,0,0,0.2);
}
.refresh_groups_icon:active{
  background: rgba(0,0,0,0.3);
}
.home_page_label{
  display: inline-block;
  margin-right: 1em;
}
.invited_users_area{
  padding: 1rem;
  background-color: rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.2);
  margin: 1rem 0.5rem;
}
.invited_users_slot{
  border: 1px solid rgba(0,0,0,0.2);
  display: inline-block;
  min-width: 10rem;
  padding: 0.5rem;
  margin: 0.5rem;
  background: rgba(255,255,255,0.2);
  cursor: pointer;
}
.invited_users_slot:hover{
  background: rgba(180,180,180,0.2);
}
.invited_users_slot:active{
  background: rgba(100,100,100,0.2);
}
.invited_users_slot_name{


}
.invited_users_slot_id{
  font-size: 0.6rem;
}
.invited_title_label{
  text-align: center;
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.2), transparent);
}
.calendar-table-wrap{
  background: rgba(255,255,255,0.4);
}
.calendar-table{
  width: 100%;
}
.calendar-box-header{
  text-align: center;
}
.calendar-box{
  border: 2px solid rgba(0,0,0,0.4);
  padding: 1em 0.5em;
  width: 2.2em;
  text-align: center;
  cursor: pointer;
  user-select: none;
}
.calendar-box:hover{
  background: rgba(0,0,255,0.2);
}
.calendar-box:active{
  background: rgba(0,0,255,0.4);
}
.calendar-box-not-in-month{
  user-select: none;
  border: 2px solid rgba(0,0,0,0.4);
  padding: 1em 0.5em;
  background-color: rgba(0,0,0,0.2);
  width: 2.2em;
  text-align: center;
}
.calendar-table-next-month{
  display: inline-table;
  font-size: 2em;
  padding: 0 0.5em;
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0.2);
}
.calendar-table-next-month:hover{
  background-color: rgba(0,0,0,0.2);
}
.calendar-table-next-month:active{
  background-color: rgba(0,0,0,0.4);
}
.calendar-table-prev-month{
  display: inline-table;
  font-size: 2em;
  padding: 0 0.5em;
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0.2);
}
.calendar-table-prev-month:hover{
  background-color: rgba(0,0,0,0.2);
}
.calendar-table-prev-month:active{
  background-color: rgba(0,0,0,0.4);
}
.calendar-table-month-label{
  display: inline-table;
  padding: 0 2em;
}
.calendar-table-nav-buttons-wrap{
  text-align: center;
  padding-top: 0.4em;
  user-select: none;
}
.calendar-box-selected{
  background-color: rgba(0,0,255,0.4) !important;
}
.calendar-box-pessimo{
  background-color: rgba(255,0,0,0.2);
}
.calendar-box-non-so{
  background-color: rgba(255,255,0,0.2);
}
.calendar-box-ottimo{
  background-color: rgba(0,255,0,0.2);
}
.other_voter_ball{
  width: 1.5vw;
  height: 1.5vw;
  border-radius: 50%;
  display: inline-block;
  margin: 0.1em 0.2vw;
  max-width: 10px;
  max-height: 10px;
  border: 1px solid rgba(0,0,0,0.5);
}
.other_voter_ball_red{
  background-color: rgba(255,0,0,0.6);
}
.other_voter_ball_yellow{
  background-color: rgba(255,255,0,0.6);
}
.other_voter_ball_green{
  background-color: rgba(0,255,0,0.6);
}
.other-voters-wrap{
}
.node_info_wrap{
  border: 1px solid rgba(0,0,0,0.2);
  padding: 1em;
  height: 20vh;
  overflow-y: auto;
}
.node_info_main_line{
  border-bottom: 1px solid rgba(0,0,0,0.2);
  padding: 0.5em;
}
.node_info_main_dot{
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 50%;
  width: 1em;
  height: 1em;
  display: inline-block;
  position: relative;
  top: 0.3em;
  margin-right: 0.5em;
}
.node_info_main_usr{
  font-size: min(3vw, 1em);
  background: rgba(0,0,0,0.1);
  padding: 0.5em;
  display: inline-block;
  width: 70%;
}
.fast_resume_red{
    background: rgba(255,0,0,0.3);
}
.fast_resume_yellow{
    background: rgba(255,255,0,0.3);
}
.fast_resume_green{
    background: rgba(0,255,0,0.3);
}
.version_label{
  position: fixed;
  bottom: 0.1em;
  right: 0.1em;
  font-size: 0.6em;
  opacity: 0.7;
  user-select: none;
}
`;

function navigate(page) {
    if (!isNullOrUndefined(lastInitedAppClient)) {
        lastInitedAppClient.setNavigation(page);
    }
}

function validateSettings(settings) {
    if (!("AppName" in settings)) {
        return false;
    }
    if (!("DBName" in settings)) {
        return false;
    }
    if (!("allowDefaultPages" in settings)) {
        return false;
    }
    if (!("landingPage" in settings)) {
        return false;
    }
    if (!("customPages" in settings)) {
        return false;
    }
    if (!("dataCollection" in settings)) {
        return false;
    }

    return true;
}


async function bootStitchAppClient(settings) {

    if (!validateSettings(settings)) {
        console.error("Stitch App Settings are malformed.");
        return;
    }


    let usePages = [];
    try {
        if (settings["allowDefaultPages"]) {
            for (let i = 0; i < StitchDefaultPages.length; i++) {
                usePages.push(StitchDefaultPages[i]);
            }
        }
    } catch (e) {
        console.warn(e);
    }

    try {
        for (let i = 0; i < settings["customPages"].length; i++) {
            usePages.push(settings["customPages"][i]);
        }
    } catch (e) {
        console.warn(e);
    }

    let clnt = getStitchAppClient(settings["AppName"], settings["DBName"]);
    clnt.registerAppPages(usePages);
    clnt.registerUserDataColletion(settings["dataCollection"]);
    clnt.setTargetLandingPage(settings["landingPage"]);

    if ("version" in settings) {
        clnt.registerAppVersion(settings["version"]);
    }

    if ("targetSiteContent" in settings) {
        clnt.registerAppTargetNodeId(settings["targetSiteContent"]);
    }

    if ("syncModels" in settings) {
        clnt.setSyncModels(settings["syncModels"]);
    }

    if ("afterEachNavigation" in settings){
      clnt.setAfterNavigationFunction(settings["afterEachNavigation"]);
    }
	
	if ("serviceWorkerFile" in settings){		
		if(window.location.href.indexOf("https")!=-1){
			if ('serviceWorker' in navigator && window.navigator.userAgent.indexOf("MSIE ") <= 0) {
				'use strict';
				let registrations = await navigator.serviceWorker.getRegistrations();
				if(registrations.length > 0){
					for(let registration of registrations) {
					  registration.update();
					}
				}
				else{
					navigator.serviceWorker.register("./"+settings["serviceWorkerFile"]);	
				}
			}
		}
	}
	
	if ("enableAutoLogin" in settings) {
		if(settings["enableAutoLogin"]){
			await clnt.autoLoginFullSequence();		
		}
    }

    if ("afterAllInits" in settings) {
        window[settings["afterAllInits"]]();
    }

    clnt.boot();
}

function getStitchAppClient(app_name, db_name) {

    if (lastInitedAppClient == null) {
        lastInitedAppClient = new StitchAppClient(app_name, db_name);
        lastInitedAppClient.injectStitchFrameworkCss();
    }
    return lastInitedAppClient;
}

function removeElementFromListAtIndex(list, index) {
    if (index > -1) {
        list.splice(index, 1);
    }
    return list;
}

function removeElementFromList(list, element) {
    let index = list.indexOf(element);
    if (index > -1) {
        list.splice(index, 1);
    }
    return list;
}

function singletonAddEventListener(target, eventName, callBack, flag) {
    if (singletonRegisteredEventListeners.indexOf(eventName)) {
        singletonRegisteredEventListeners.push(eventName);
        target.addEventListener(eventName, callBack, flag);
    }
}

function handleGlobalClick() {
	if(event.target.id != "toolbar_user_menu_id"){
		closeMenu();		
	}
}

function pageHasResized() {
    if (!isNullOrUndefined(lastInitedAppClient)) {
        lastInitedAppClient.pageResizeHandle();
    }
}

function pageHasChanged() {
    if (!isNullOrUndefined(lastInitedAppClient)) {
        lastInitedAppClient.pageNavigate();
    }
}

function storageRemoveItem(collection, name) {
    let toBeRemoved = storageGetItem(name);
    localStorage.removeItem(name);
    if (!isVoidString(collection)) {
        lastInitedAppClient.bewareStorageRemoved(collection, name, toBeRemoved);
    }
}

function storageRemoveAnyItemsStartingWith(prefix) {
    Object.keys(localStorage).forEach(function(key) {
        if (key.substring(0, prefix.length) == prefix) {
            localStorage.removeItem(key);
        }
    });
}

function storageGetAnyItemStartingWith(prefix) {
    let results = [];
    Object.keys(localStorage).forEach(function(key) {
        if (key.substring(0, prefix.length) == prefix) {
            results.push(JSON.parse(localStorage.getItem(key)));
        }
    });
    return results;
}

function storageGetItem(name) {
    let el = localStorage.getItem(name);
    try {
        if (!isNullOrUndefined(el)) {
            return JSON.parse(el);
        }
    } catch (e) {

    }
    return null;
}

function storageSetItem(collection, name, value) {

    let isInsertion = isNullOrUndefined(localStorage.getItem(name));

    let ready_to_save = JSON.stringify(value);
    localStorage.setItem(name, ready_to_save);

    if (!isVoidString(collection)) {

        if (isInsertion) {
            lastInitedAppClient.bewareStorageInsertion(collection, name, value);
        } else {
            lastInitedAppClient.bewareStorageUpdate(collection, name, value);
        }
    }
}

function clearStorage() {
    localStorage.clear();
}

function validateEmail(mail) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
}

function isNullOrUndefined(obj) {
    return (obj == undefined || obj == null || obj == "undefined");
}

function isVoidString(str) {
    return isNullOrUndefined(str) || str == "";
}

function getInputValue(id) {
    let el = document.getElementById(id);
    if (!isNullOrUndefined(el)) {
        return el.value;
    } else {
        return null;
    }
}

function setInputValue(id, value) {
    let el = document.getElementById(id);
    if (!isNullOrUndefined(el)) {
        el.value = value;
    }
}

function getCheckboxIsChecked(id) {
    let el = document.getElementById(id);
    if (!isNullOrUndefined(el)) {
        return el.checked;
    } else {
        return null;
    }
}

function setCheckboxIsChecked(id, setted) {
    let el = document.getElementById(id);
    if (!isNullOrUndefined(el)) {
        el.checked = setted;
    } else {
        return null;
    }
}

function showBreadCrumb(msg) {

    killBreadCrumb();

    let timeout = 80 * msg.length;

    if (timeout < 3000) {
        timeout = 3000;
    }

    let d = document.createElement("div");
    d.className = "stitch_bread_crumb";
    // adjust style for lower res screens
    if (window.innerWidth < 600) {
        d.style.fontSize = "0.9em";
        d.style.padding = "0.5em 1em";
    }
    d.innerHTML = msg;
    document.body.appendChild(d);

    setTimeout(function() {

        let animation_duration = 700; //ms
        d.style.transition = "opacity " + animation_duration + "ms linear";
        d.style.opacity = "0";
        setTimeout(function() {
            killBreadCrumb();
        }, animation_duration);

    }, timeout);
}

function killBreadCrumb() {
    let br_list = document.getElementsByClassName("stitch_bread_crumb");
    if (br_list.length == 0) {
        return;
    }
    let first = br_list[0];
    first.parentElement.removeChild(first);
}

function closeMenu() {
    let menu = document.getElementById("toolbar_user_menu_id");
	let inkdrop = document.getElementById("toolbar_user_menu_menu_inkdrop");

    if (!isNullOrUndefined(menu) && !isNullOrUndefined(inkdrop)) {
        menu.style.width = "";
		inkdrop.style.opacity = "0";
    }

	setTimeout(function(){
		if (!isNullOrUndefined(menu) && !isNullOrUndefined(inkdrop)) {
			document.body.removeChild(inkdrop);
			document.body.removeChild(menu);
		}
	},300);

}

function openAppToolbarMenu(voices) {

    // close it if open
    closeMenu();

    let id = "toolbar_user_menu_id";

	let inkdrop = document.createElement("div");
	inkdrop.className = "toolbar_user_menu_inkdrop";
	inkdrop.id = "toolbar_user_menu_menu_inkdrop";
	inkdrop.onclick = closeMenu;
	
	menu = document.createElement("div");
	menu.className = "toolbar_user_menu";
	menu.id = id;

	for (let i = 0; i < voices.length; i++) {
		let voice = voices[i];
		let row = document.createElement("div");
		row.className = "toolbar_user_menu_row";
		row.innerHTML = voice[0];
		row.setAttribute("onclick", voice[1]);
		menu.appendChild(row);
	}

	document.body.appendChild(inkdrop);
	document.body.appendChild(menu);
    
	document.ontouchstart = startUserMenuUberSlide;

    setTimeout(function process() {
		inkdrop.style.opacity = "1";
        menu.style.width = "min(80%,300px)";
    }, 100);
}



/* stitch client for the backend */
class StitchServerClient {

    // init clients
    constructor(app_name, db_name) {

        // sync models
        // this list must contain the list of items' keys from "localStorage" that will be syncked
        // between each device and on the backend
        // e.g:
        // localStorage contains { "field_1": "value_1", "field_2": "value_2", "field_3": "value_3"}
        //
        // if you want to sync only field_1 and field_3 you can set this list as ["field_1","field_3"]
        //
        // this will automagically make the sync happen
        //
        // remember that only elements that are stored in the localStorage can be syncked
        this.sync_models = [];

        // set of models that must be romoved from storage upon logout
        this.authenticated_models = [];

        // drivers
        this.db_name = "";
        this.app_name = "";

        // clients
        this.stitch_actual_client = null;
        this.reference_to_mongo_db = null;
        this.profileProvider = null;

        // stored credentials
        this.email = "";
        this.password = "";

        // used to avoid multiple calls in parallel
        this.promise_timed_out_flag = "__promise_did_timeout__";
        this.promise_time_out_duration = 10000;

        // multiple api call in parallel are not supported by
        // the stitch client so we must enable a serving queue
        this.alreadyServing = false;



        this.app_name = app_name;
        this.db_name = db_name;

        if (app_name != "zombie" && db_name != "zombie") {
            this.stitch_actual_client = stitch.Stitch.initializeDefaultAppClient(this.app_name);
            this.reference_to_mongo_db = this.stitch_actual_client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db(this.db_name);
            this.profileProvider = this.stitch_actual_client.auth.getProviderClient(stitch.UserPasswordAuthProviderClient.factory, "local-userpass");
        }
    }

    async pause(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    // function to get lock on api service
    async getApiLock() {
        let max_retry = 5;
        while (this.alreadyServing && max_retry > 0) {
            await this.pause(500);
            max_retry--;
        }
        console.log("Given lock");
        this.alreadyServing = true;
        return true;
    }

    // unlock api
    apiUnlock() {
        console.log("Released lock");
        this.alreadyServing = false;
    }

    // unlock api
    apiLock() {
        console.log("Force given lock");
        this.alreadyServing = true;
    }

    /*
      The promise.race method is used to force a controlled timeout on
      any api call that may never return.
    */
    promiseTimeout(promise) {

        // Create a promise that rejects in <ms> milliseconds
        let timeout = new Promise((resolve, reject) => {
            let id = setTimeout(() => {
                clearTimeout(id);

                let name = promise.name;
                if (name != undefined) {
                    console.log("Timed out: " + name);
                }
                resolve(this.promise_timed_out_flag);
            }, this.promise_time_out_duration);
        })

        // Returns a race between our timeout and the passed in promise
        return Promise.race([
            promise,
            timeout
        ]);
    };

    // get parameters from url
    getUrlParams() {

        //var my_url_var = window.location.href;
        let my_url_var = (window.location != window.parent.location) ?
            document.referrer :
            document.location.href;

        let params_list = my_url_var.split("?");

        let final = {};

        if (params_list.length > 1) {

            let params_parsed = params_list[1].split("&");

            for (let i = 0; i < params_parsed.length; i++) {
                let p_couple = params_parsed[i].split("=");
                final[p_couple[0]] = p_couple[1];
            }
        }

        return final;
    }

    // routine to confirm a user registration
    async confirmUser() {

        await this.getApiLock();

        let params = this.getUrlParams();
        let token = params["token"];
        let tokenId = params["tokenId"];

        let res = null;

        try {
            let res = await this.promiseTimeout(this.profileProvider.confirmUser(token, tokenId));
        } catch (e) {
            res = e;
            console.error("reference_to_mongo_db.confirmUser", e);
        }

        this.apiUnlock();

        return res;
    }

    // register an user by email and password
    async registerUser(email, password) {

        await this.getApiLock();

        let res = null;

        try {
            let res = await this.promiseTimeout(this.profileProvider.registerWithEmail(email.toLowerCase(), password));
        } catch (e) {
            res = e;
            console.error("reference_to_mongo_db.registerUser", e);
        }

        this.apiUnlock();

        return res;
    }

    // request send reset password email
    async sendResetPasswordEmail(email) {

        await this.getApiLock();

        let res = null;

        try {
            let res = await this.promiseTimeout(this.profileProvider.sendResetPasswordEmail(email.toLowerCase()));
        } catch (e) {
            res = e;
            console.error("reference_to_mongo_db.sendResetPasswordEmail", e);
        }

        this.apiUnlock();

        return res;
    }

    getDataModel() {
        let data_list = [];
        for (let i = 0; i < this.sync_models.length; i++) {
            let name = this.sync_models[i];
            let el = localStorage.getItem(name);
            if (el != null) {
                data_list.push([name, JSON.parse(el)]);
            }
        }
        return data_list;
    }

    // produce an empty model if is the first login
    getFirstTimeModel() {

        let model = this.getDataModel();
        model.push(["email", this.email]);
        model.push(["is_developer", false]);
        model.push(["user_id", this.stitch_actual_client.auth.user.id]);
        model.push(["created_on", new Date().toISOString()])
        return model;
    }

    bootRemoteModel(user_data) {

        /* there are stats to update here */
        if (!isNullOrUndefined(user_data)) {

            localStorage.setItem("__stitch_dev_flag", user_data["is_developer"].toString());
            for (let i = 0; i < this.sync_models.length; i++) {
                let name = this.sync_models[i];
                let el = user_data[name];
                if (!isNullOrUndefined(el)) {
                    localStorage.setItem(name, JSON.stringify(el));
                }
            }

            showBreadCrumb("Dati sincronizzati.");
        }
    }

    // request resend confirmation email
    async resendConfirmationEmail(email) {

        await this.getApiLock();

        let res = null;

        try {
            let res = await this.promiseTimeout(this.profileProvider.resendConfirmationEmail(email.toLowerCase()));
        } catch (e) {
            res = e;
            console.error("reference_to_mongo_db.resendConfirmationEmail", e);
        }

        this.apiUnlock();

        return res;
    }

    // reset user password
    async resetPassword(newPassword) {

        await this.getApiLock();

        let params = this.getUrlParams();
        let token = params["token"];
        let tokenId = params["tokenId"];

        let res = null;

        try {
            res = await this.promiseTimeout(this.profileProvider.resetPassword(token, tokenId, newPassword));
        } catch (e) {
            res = e;
            console.error("reference_to_mongo_db.resetPassword", e);
        }

        this.apiUnlock();

        return res;
    }

    // logout
    async logout() {

        await this.getApiLock();

        let error = null;

        if (!this.isAuthenticated()) {
            console.error("reference_to_mongo_db.logout", "user is not authenticated.");
        } else {
            try {
                await this.promiseTimeout(this.stitch_actual_client.auth.logout());
            } catch (e) {
                error = e;
                console.error("reference_to_mongo_db.logout", e);
            }
        }

        this.killCachedSessionAndCredentials();

        this.apiUnlock();

        return error;
    }

    async login(email, password) {

        await this.getApiLock();

        console.info("Login for : " + email);

        let res = null;

        try {
            await this.promiseTimeout(this.stitch_actual_client.auth.loginWithCredential(new stitch.UserPasswordCredential(email.toLowerCase(), password)));
            this.storeCredentials(email.toLowerCase(), password);
            console.info("Success.");
        } catch (e) {
            res = e;
            console.error("reference_to_mongo_db.login", e);
        }

        this.apiUnlock();

        return res;
    }

    // develop option to set a developer flag on the db (used to show developer content to developers)
    async setDeveloperFlag(collection, mode) {

        await this.getApiLock();

        let result = null;

        if (!this.isAuthenticated()) {
            console.error("reference_to_mongo_db.setDeveloper", "user is not authenticated.");
        } else {
            console.info("Setting developer flag to: " + mode);

            try {
                result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).updateOne({
                    user_id: this.stitch_actual_client.auth.user.id
                }, {
                    $set: {
                        is_developer: mode
                    }
                }, {
                    upsert: true
                }));
                localStorage.setItem("__stitch_dev_flag", mode);
            } catch (e) {
                result = e;
                console.error("reference_to_mongo_db.setDeveloper", e);
            }
        }

        this.apiUnlock();

        return result;
    }

    // remove a single element in a collection
    async remove(collection, data_list) {

        await this.getApiLock();

        let result = null;

        /*
          Should be something like
          {user_id: this.stitch_actual_client.auth.user.id} ,
          {$set:{data:data}},
          {upsert:true}
        */
        let patch_arguments = {
            $unset: {}
        };

        for (let i = 0; i < data_list.length; i++) {
            let el = data_list[i];
            patch_arguments["$unset"][el[0]] = el[1];
        }

        if (!this.isAuthenticated()) {
            console.error("reference_to_mongo_db.remove", "user is not authenticated.");
        } else {
            console.info("Tryng remove.", data_list);

            try {
                result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).updateOne({
                    user_id: this.stitch_actual_client.auth.user.id
                }, patch_arguments, {
                    upsert: true
                }));
                console.info("Done.");
            } catch (e) {
                result = e;
                console.error("reference_to_mongo_db.remove", e);
            }
        }

        this.apiUnlock();

        return result;
    }



    // patch a single element in a collection
    async patchSingleInCollection(collection, field) {

        await this.getApiLock();

        let result = null;

        /*
          Should be something like
          {user_id: this.stitch_actual_client.auth.user.id} ,
          {$set:{data:data}},
          {upsert:true}
        */
        let patch_arguments = {
            $set: field
        };

        if (!this.isAuthenticated()) {
            console.error("reference_to_mongo_db.patchSingleInCollection", "user is not authenticated.");
        } else {
            console.info("Tryng patchSingleInCollection.", field);

            try {
                result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).findOneAndUpdate({
                    user_id: this.stitch_actual_client.auth.user.id
                }, patch_arguments, {
                    upsert: true
                }));
                console.info("Done.");
            } catch (e) {
                result = e;
                console.error("reference_to_mongo_db.patchSingleInCollection", e);
            }
        }

        this.apiUnlock();

        return result;
    }

    async findInCollection(collection, search_path) {

        await this.getApiLock();

        let result = null;

        if (!this.isAuthenticated()) {
            console.error("reference_to_mongo_db.findInCollection", "user is not authenticated.");
        } else {
            console.info("Tryng findInCollection.");

            try {
                result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).find(search_path).asArray());
                console.info("findInCollection done.");
            } catch (e) {
                result = e;
                console.error("reference_to_mongo_db.findInCollection", e);
            }
        }

        this.apiUnlock();

        return result;
    }

    async fetch(collection) {

        await this.getApiLock();

        let result = null;

        if (!this.isAuthenticated()) {
            console.error("reference_to_mongo_db.fetch", "user is not authenticated.");
        } else {
            console.info("Tryng fetch.");

            try {
                result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).find({
                    user_id: this.stitch_actual_client.auth.user.id
                }).asArray());
                console.info("Fetch done.");
            } catch (e) {
                result = e;
                console.error("reference_to_mongo_db.fetch", e);
            }
        }

        this.apiUnlock();

        return result;
    }

    async selectOneRandom(collection) {

        await this.getApiLock();

        let result = null;

        if (!this.isAuthenticated()) {
            console.error("reference_to_mongo_db.selectStar", "user is not authenticated.");
        } else {
            console.info("Tryng selectStar.");

            try {
                result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).aggregate([{
                    $sample: {
                        size: 1
                    }
                }]).asArray());
                console.info("SelectStar done.");
            } catch (e) {
                result = e;
                console.error("reference_to_mongo_db.selectStar", e);
            }
        }

        this.apiUnlock();

        return result;
    }


    async selectStar(collection) {

        await this.getApiLock();

        let result = null;

        if (!this.isAuthenticated()) {
            console.error("reference_to_mongo_db.selectStar", "user is not authenticated.");
        } else {
            console.info("Tryng selectStar.");

            try {
                result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).find().asArray());
                console.info("SelectStar done.");
            } catch (e) {
                result = e;
                console.error("reference_to_mongo_db.selectStar", e);
            }
        }

        this.apiUnlock();

        return result;
    }


    async fetchAndInitModelIfMissing(collection) {

        await this.getApiLock();

        let result = null;

        if (!this.isAuthenticated()) {
            console.error("reference_to_mongo_db.fetchAndInitModelIfMissing", "user is not authenticated.");
        } else {
            console.info("Tryng fetchAndInitModelIfMissing.");

            try {
                result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).find({
                    user_id: this.stitch_actual_client.auth.user.id
                }).asArray());
                console.info("fetchAndInitModelIfMissing done.");

                // user has no data
                if (result.length == 0) {
                    console.info("Fetch data is empty, filling first time user.");

                    this.apiUnlock();
                    await this.promiseTimeout(this.patchInCollection(collection, this.getFirstTimeModel(), true));
                    this.apiLock();

                    showBreadCrumb("Il tuo account ?? stato inizializzato.");
                    console.info("Done.");
                }
            } catch (e) {
                result = e;
                console.error("reference_to_mongo_db.fetchAndInitModelIfMissing", e);
            }
        }

        this.apiUnlock();

        return result;
    }

    async removeInCollection(collection, objectToRemove) {

        await this.getApiLock();

        let result = null;

        if (!this.isAuthenticated()) {
            console.error("reference_to_mongo_db.removeInCollection", "user is not authenticated.");
        } else {
            console.info("Tryng removeInCollection.");

            try {
                result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).deleteOne({
                    user_id: this.stitch_actual_client.auth.user.id,
                    data_id: objectToRemove["data_id"]
                }));
                console.info("Done.");
            } catch (e) {
                result = e;
                console.error("reference_to_mongo_db.removeInCollection", e);
            }
        }

        this.apiUnlock();

        return result;
    }

    async postInCollection(collection, objectToPost) {

        await this.getApiLock();

        let result = null;

        if (!this.isAuthenticated()) {
            console.error("reference_to_mongo_db.postInCollection", "user is not authenticated.");
        } else {
            console.info("Tryng postInCollection.");
            try {
                result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).updateOne({
                    user_id: this.stitch_actual_client.auth.user.id,
                    data_id: objectToPost["data_id"]
                }, {
                    $set: objectToPost
                }, {
                    upsert: true
                }));
                console.info("Done.");
            } catch (e) {
                result = e;
                console.error("reference_to_mongo_db.postInCollection", e);
            }
        }

        this.apiUnlock();

        return result;
    }


    async patchInCollection(collection, data, upsertFlag) {

        let patch_arguments;
        let search_keys;

        // different handling based on input structure
        if (Array.isArray(data)) {

            /*
              Should be something like
              {user_id: this.stitch_actual_client.auth.user.id} ,
              {$set:{data:data, data2:data2, etc...}},
              {upsert:true}
            */
            patch_arguments = {
                $set: {}
            };
            for (let i = 0; i < data.length; i++) {
                let el = data[i];
                patch_arguments["$set"][el[0]] = el[1];
            }

            search_keys = {
                user_id: this.stitch_actual_client.auth.user.id
            };

        } else {

            if (isNullOrUndefined(data["data_id"])) {
                console.error("reference_to_mongo_db.patchInCollection: data must have a 'data_id' field", data);
                return "bad argument";
            }

            patch_arguments = {
                $set: data
            };

            search_keys = {
                data_id: data["data_id"]
            };
        }

        await this.getApiLock();

        let result = null;

        if (!this.isAuthenticated()) {
            console.error("reference_to_mongo_db.patchInCollection", "user is not authenticated.");
        } else {
            console.info("Tryng patchInCollection.");
            try {

                result = await this.promiseTimeout(this.reference_to_mongo_db.collection(collection).findOneAndUpdate(search_keys,
                    patch_arguments, {
                        upsert: upsertFlag
                    }));
                console.info("Done.");
            } catch (e) {
                result = e;
                console.error("reference_to_mongo_db.patchInCollection", e);
            }
        }

        this.apiUnlock();

        return result;
    }

    // check user is autenticated
    isAuthenticated() {
        try {
            return this.email.length > 0;
        } catch (e) {
            return false;
        }
    }

    // load cached session and credentials if any
    loadStoredCredentials() {

        let stored = localStorage.getItem("__stitch.creds");

        if (stored != null) {
            let obj = JSON.parse(stored);
            this.email = obj.email;
            this.password = obj.password;
            return obj;
        }

        // be sure to have clean cache if __stitch.creds are missing
        this.killCachedSessionAndCredentials();

        return null;
    }

	

    // store stitch credentials
    storeCredentials(email, password) {
        localStorage.setItem("__stitch.creds", JSON.stringify({
            email: email.toLowerCase(),
            password: password
        }));
        this.email = email;
        this.password = password;
    }

    // remove stitch credentials and session tokens
    killCachedSessionAndCredentials() {

        Object.keys(localStorage).forEach(function(key) {
            if (key.substring(0, "__stitch".length) == "__stitch") {
                localStorage.removeItem(key);
            }
        });

        for (let i = 0; i < this.authenticated_models.length; i++) {
            try {
                localStorage.removeItem(this.authenticated_models[i]);
            } catch (e) {
                // doesnt exist so no problem
            }
        }

        for (let i = 0; i < this.sync_models.length; i++) {
            localStorage.removeItem(this.sync_models[i]);
        }

        this.email = "";
        this.password = "";
    }
}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// ///////// END OF STITCH SERVER CLIENT /////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// ///////// START OF STITCH FRONTEND CLIENT /////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


/* stitch client for the frontend */
class StitchAppClient {

    constructor(app_name, db_name) {

        // core
        this.server = null;

        // app version
        this.version = null;

        // last dialog output
        this.lastDialogOutput = [];

        // page to land on after a successfull login
        this.targetPageAfterLogin = "";

        // function called after any navigation action
        this.afterNavigationFunction = null;

        // used to dynamically resize some elements
        this.elementsRegisteredForDynamicResize = [];

        // data collection name
        this.userDataColletion = "";

        // used to handle page navigation warings like (save before leave this page)
        this.confirm_navigation_level = 0;

        // the id of the element in wich the stitch framework will build the app
        this.targetPageElementId = null;

        // the registered app pages
        this.appPages = [];

        // page resize callback
        this.pageResizedCallbackName = null;

        // api spinner feature toggle
        this.allowSpinnerWhenCallingAStitchApi = true;

        // preserve API spinners removals for N times
        // this is ignored and resetted to 0 if one api
        // throws any kynd of error
        this.spinnerKeepUp = 0;

        if (isVoidString(app_name) || isVoidString(db_name)) {
            return;
        }
        this.server = new StitchServerClient(app_name, db_name)
    }
	
	async forceUpdateApp(){
		
		if(!window.navigator.onLine){
			this.openAlertDialog(getTranslatedMessage("cant_update_while_offline"));
			return;
		}

		if(window.location.href.indexOf("https")!=-1){
		  if ('serviceWorker' in navigator && window.navigator.userAgent.indexOf("MSIE ") <= 0) {
			'use strict';
			this.toggleAPISpinner(true);

		    let registrations = await navigator.serviceWorker.getRegistrations();
			let unregisterPromises = registrations.map(registration => registration.unregister());

			let allCaches = await caches.keys();
			let cacheDeletionPromises = allCaches.map(cache => caches.delete(cache));

			await Promise.all([...unregisterPromises, ...cacheDeletionPromises]);

			location.reload();
		  }
		}
	}

    isDeveloper(){
      let f = localStorage.getItem("__stitch_dev_flag");
      if(!isNullOrUndefined(f)){
        return f == "true";
      }
      return false;
    }

    registerAppVersion(version) {
        this.version = version;
    }

    setAfterNavigationFunction(functionName){
      this.afterNavigationFunction = functionName;
    }

    runAfterNavigation(){
      if(!isNullOrUndefined(this.afterNavigationFunction)){
        window[this.afterNavigationFunction]();
      }
    }

    getServerInstance() {
        if (isNullOrUndefined(this.server)) {
            this.openAlertDialog(getTranslatedMessage("mongo_client_missing"));
            let fakeServer = {};
            fakeServer["isAuthenticated"] = function() {
                return false;
            };
            fakeServer["loadStoredCredentials"] = function() {
                return;
            };
            return fakeServer;
        }
        return this.server;
    }

    setTargetLandingPage(page) {
        this.targetPageAfterLogin = page;
    }

    registerUserDataColletion(collection) {
        this.userDataColletion = collection;
    }

    // set the api spinnerStatus
    allowApiSpinner() {
        this.allowSpinnerWhenCallingAStitchApi = true;
    }
    disableApiSpinner() {
        this.allowSpinnerWhenCallingAStitchApi = false;
    }

    // set the page resized
    setPageResizeHandle(resizePageHandlerFunctionName) {
        this.pageResizedCallbackName = resizePageHandlerFunctionName;
    }

    // call the callback for resized page if was defined
    pageResizeHandle() {

        // handle resize of elements
        for (let i = 0; i < this.elementsRegisteredForDynamicResize.length; i++) {
            this.resizeDynamicElement(this.elementsRegisteredForDynamicResize[i]);
        }

        // if a page resize callback has been defined, call it
        if (!isVoidString(this.pageResizedCallbackName)) {
            window[this.pageResizedCallbackName]();
        }
    }

    // setters for above status variables
    registerAppTargetNodeId(nodeId) {
        this.targetPageElementId = nodeId;
    }
    registerAppPages(pages) {
        this.appPages = pages;
    }

    injectStitchClient() {
        let node_string = '<script type="text/javascript" src="https://s3.amazonaws.com/stitch-sdks/js/bundles/4.9.0/stitch.js"></script>';
        let script = document.createElement("script");
        script.type = 'text/javascript';
        script.src = "https://s3.amazonaws.com/stitch-sdks/js/bundles/4.9.0/stitch.js";
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // inject embedded styles in the html
    injectStitchFrameworkCss() {

        let node_string = "<style type=\"text/css\">" + Stitch_FrameWork_EmbeddedStyles + "</style>";

        let style = document.createElement("style");
        style.type = 'text/css';

        if (style.styleSheet) {
            style.styleSheet.cssText = node_string;
        } else {
            style.appendChild(document.createTextNode(Stitch_FrameWork_EmbeddedStyles));
        }

        document.getElementsByTagName("head")[0].appendChild(style);
    }

    // search for a page by name key and return the content key
    getPageByName(searched_name) {

        for (let i = 0; i < this.appPages.length; i++) {

            let page = this.appPages[i];
            let name = page["name"];
            let authRequired = page["requiresAuth"];

            // you can access a page if it does not require a login, or if you are logged in
            if (searched_name == name && (!authRequired || this.getServerInstance().isAuthenticated())) {
                return page;
            }
        }

        return null;
    }

    isLoggedIn() {
        return this.getServerInstance().isAuthenticated();
    }

    /* base open dialog class (this uses the embedded stitch styles) */
    openDialog(title, text, buttons, inputs, callbacks, inner_node) {

        let dialog_type = buttons;

        if (buttons == "alert") {
            buttons = [getTranslatedMessage("close")];
        }
        if (buttons == "confirm") {
            buttons = [getTranslatedMessage("no"), getTranslatedMessage("yes")];
        }
        if (buttons == "input") {
            buttons = [getTranslatedMessage("cancel"), getTranslatedMessage("proceed")];
        }
        if (isNullOrUndefined(title)) {
            title = getTranslatedMessage("message_from_site");
        }
        if (isNullOrUndefined(text)) {
            text = "";
        }
        if (isNullOrUndefined(buttons)) {
            buttons = [getTranslatedMessage("close")];
        }
        if (isNullOrUndefined(inputs)) {
            inputs = [];
        }
        if (isNullOrUndefined(callbacks)) {
            callbacks = [];
        }
        if (buttons.length == 0) {
            buttons = [getTranslatedMessage("close")];
        }

        let inkdrop = document.createElement("div");
        inkdrop.className = "stitch_modal_dialog_inkdrop";
        inkdrop.id = "modal_ink_drop";

        let dialog = document.createElement("div");
        dialog.className = "stitch_modal_dialog";

        let inner_dialog = "<div class=\"stitch_modal_title\">" + title + "</div>" + "<div class=\"stitch_modal_text\">" + this.generateMultilineHTMLfromString(text) + "</div>\n";
        inner_dialog += "<div id=\"inner_node_section_stitch_dialog\"></div>\n";
        inner_dialog += "<div style=\"margin-top: 0.5rem; text-align: end;\">\n";

        for (let i = 0; i < inputs.length; i++) {

            let prefill = isVoidString(inputs[i]["start_value"]) ? "" : inputs[i]["start_value"];

            if (!isVoidString(prefill)) {
                prefill = " value='" + prefill + "' ";
            }

            inner_dialog += "<div class='stitch_dialog_input_title'>" + inputs[i]["title"] + "</div>\n";
            inner_dialog += "<input class='stitch_dialog_input' " + prefill + " placeholder='" + inputs[i]["placeholder"] + "'></input>\n";
        }

        inner_dialog += "<br>";

        for (let i = 0; i < buttons.length; i++) {


            let callback = callbacks.length > i ? callbacks[i] : "";
            let callback_inline = "lastInitedAppClient.dialogDispose('" + buttons[i] + "','" + dialog_type + "');";

            if (!isVoidString(callback)) {
                callback_inline += " " + callback + ";"
            }

            inner_dialog += "<div class=\"stitch_modal_button\" id='stitch_dialog_button_" + i.toString() + "' onclick=\""+callback_inline+"\">" + buttons[i] + "</div>\n";
        }

        inner_dialog += "</div>\n";
        dialog.innerHTML = inner_dialog;

        inkdrop.appendChild(dialog);
        document.body.appendChild(inkdrop);

        if (!isNullOrUndefined(inner_node)) {
            document.getElementById("inner_node_section_stitch_dialog").appendChild(inner_node);
        }

        setTimeout(this.fadeInDialog, 100);

        return dialog;
    }

    dialogDispose(button_name, dialog_type) {

        if (dialog_type == "confirm") {
            this.lastDialogOutput = !(button_name.toLowerCase() == getTranslatedMessage("no") || button_name.toLowerCase() == getTranslatedMessage("cancel"));
        } else {
            let inputs = document.getElementsByClassName("stitch_dialog_input");
            let values = [];
            for (let i = 0; i < inputs.length; i++) {
                values.push(inputs[i].value);
            }
            this.lastDialogOutput = values;
        }


		while(1){
			let dialog = document.getElementById("modal_ink_drop");
			if(isNullOrUndefined(dialog)){
				return;
			}
			dialog.parentNode.removeChild(dialog);
		}
    }

    /* some dialog shortcuts*/
    openInputDialog(body, inputs, callbacks) {
        this.openDialog(getTranslatedMessage("required_data"), body, "input", inputs, callbacks, null);
    }
    openConfirmDialog(body, callbacks) {
        this.openDialog(getTranslatedMessage("confirm_action"), body, "confirm", null, callbacks, null);
    }
    openCustomNodeDialog(title, body, node) {
        this.openDialog(title, body, "alert", null, null, node);
    }
    openInfoDialog(body) {
        this.openDialog(getTranslatedMessage("information"), body, "alert", null, null, null);
    }
    openAlertDialog(body) {
        this.openDialog(getTranslatedMessage("note"), body, "alert", null, null, null);
    }

    // used to print multiline html text without using stuff like "white-space:pre" (wich gives errors on IOS)
    generateMultilineHTMLfromString(text) {
        if (isNullOrUndefined(text)) {
            return "";
        }

        let spl = text.split("\n");
        if (spl.length == 1) {
            return text;
        } else {
            let output = "";
            for (let i = 0; i < spl.length; i++) {
                output += "<div>" + spl[i] + "</div>";
            }
            return output;
        }
    }

    // animation for dialog to fade in
    fadeInDialog() {
        let drop = document.getElementById("modal_ink_drop");
        if (!isNullOrUndefined(drop)) {
            drop.style.opacity = "1";
        }
    }

    // turn api spinner on-off
    toggleAPISpinner(toggle) {

        if (isNullOrUndefined(this.server)) {
            this.openAlertDialog(getTranslatedMessage("mongo_client_missing"));
            return;
        }

        if (!this.allowSpinnerWhenCallingAStitchApi) {
            return;
        }

        if (!toggle && this.spinnerKeepUp > 0) {
            this.spinnerKeepUp = this.spinnerKeepUp - 1;
            return;
        }

        // add one instance of the API spinner IF no istance is currently running
        if (toggle) {

            let spinner_backdrops = document.getElementsByClassName("stitch_api_spinner_backdrop");

            if (spinner_backdrops.length == 0) {

                let spinner_backdrop = document.createElement("div");
                spinner_backdrop.className = "stitch_api_spinner_backdrop";
                document.body.appendChild(spinner_backdrop);

                let spinner = document.createElement("div");
                spinner.className = "stitch_api_spinner";
                spinner_backdrop.appendChild(spinner);
            }
        }
        // remove ANY instance of the API spinner
        else {
            let spinner_backdrops = document.getElementsByClassName("stitch_api_spinner_backdrop");
            for (let i = 0; i < spinner_backdrops.length; i++) {
                let backdrop = spinner_backdrops[i];
                backdrop.parentElement.removeChild(backdrop);
            }

            let spinners = document.getElementsByClassName("stitch_api_spinner");
            for (let i = 0; i < spinners.length; i++) {
                let spinner = spinners[i];
                spinner.parentElement.removeChild(spinner);
            }
        }
    }

    // handle stitch specific errors messages here (translate to italian in this case)
    textForApiErrorCode(message) {

        if (message == undefined) {
            return getTranslatedMessage("site_err_occupied");
        }
        if (message.indexOf("the request transport encountered an error communicating with Stitch: Network request failed") != -1) {
            return getTranslatedMessage("site_err_no_internet");
        }
        if (message.indexOf("method called requires being authenticated") != -1) {
            return getTranslatedMessage("site_err_expired_session");
        }
        if (message.indexOf("invalid username/password") != -1) {
            return getTranslatedMessage("site_err_credentials");
        }
        if (message.indexOf("failed to confirm user") != -1) {
            return getTranslatedMessage("site_err_invalid_user");
        }
        if (message.indexOf("password must be between 6 and 128 characters") != -1) {
            return getTranslatedMessage("site_err_password_size");
        }
        if (message.indexOf("name already in use") != -1) {
            return getTranslatedMessage("site_err_user_already_exists");
        }
        if (message.indexOf("invalid token data") != -1) {
            return getTranslatedMessage("site_err_invalid_token");
        }
        if (message.indexOf("already confirmed") != -1) {
            return getTranslatedMessage("site_err_email_already_registered");
        }
        if (message.indexOf("userpass token is expired or invalid") != -1) {
            return getTranslatedMessage("site_err_expired_token");
        }
        if (message.indexOf("user not found") != -1) {
            return getTranslatedMessage("site_err_user_not_exists");
        }
        if (message.indexOf("bad argument") != -1) {
            return getTranslatedMessage("site_err_bad_request");
        }

        return getTranslatedMessage("site_err_unknown_error") + " (" + message + ")";
    }

    // handler for stitch errors
    handleApiResult(result, success) {

        let error_result = false;

        try {
            error_result = (result.message != undefined);
        } catch (e) {

        }

        if (error_result) {

            if (result.message != "silent") {
                let text = this.textForApiErrorCode(result.message);
                this.spinnerKeepUp = 0;
                this.openAlertDialog(text);
            }

        } else {
            if (!isVoidString(success)) {
                if (!isVoidString(this.targetPageElementId)) {
                    this.openInfoDialog(success);
                } else {
                    setTimeout(() => {
                        this.openInfoDialog(success);
                    }, 400);
                }
            }
        }

        let my_url_var = (window.location != window.parent.location) ?
            document.referrer :
            document.location.href;

        let params_list = my_url_var.split("?");

        this.toggleAPISpinner(false);

        return result;
    }

    // in case user clicked no for navigation action where a dialog was presented
    // to make sure user wants to leave the page
    abortPageNavigate() {

        this.confirm_navigation_level = 2;

        history.back();

        setTimeout(function() {
            this.confirm_navigation_level = 1;
        }, 300);
    }

    // same as above, but user clicked yes
    confirmPageNavigate() {
        this.confirm_navigation_level = 0;
        this.pageNavigate();
    }

    // inner callback for page navigation
    pageNavigateInner() {

		document.ontouchstart = null;
		document.ontouchmove = null; 
		document.ontouchend = null;

        this.elementsRegisteredForDynamicResize = [];

        let page = this.getUrlSection(1);

        let page_no_args = page.split("?")[0];

        let pageObj = this.getPageByName(page_no_args);

        if (!isNullOrUndefined(pageObj)) {

            let pageContent = pageObj["content"];
            let pageAfterInit = pageObj["afterInit"];

            this.buildPageBase(pageContent);

            if(!isNullOrUndefined(pageAfterInit)){
              window[pageAfterInit]();
            }

        } else {
            this.showLockedPage();
        }

        // handle resize specific logics once
        this.pageResizeHandle();

        this.runAfterNavigation();
    }

    // refresh the current page based on url #-navigation
    pageNavigate() {

        if (this.confirm_navigation_level == 2) {
            return;
        }

        if (this.confirm_navigation_level == 1) {
            this.openConfirmDialog(getTranslatedMessage("confirm_leave_page"), ["confirmPageNavigate", "abortPageNavigate"]);
        } else {
            this.pageNavigateInner();
        }
    }

    // entry point for page buildup
    buildPageBase(content) {
        let p = this.getCleanNavigationPanel();
        this.buildPage(p, content);
        if (!isVoidString(this.version)) {
            p.appendChild(this.betterCreateElement("div", [
                ["className", "version_label"],
                ["innerHTML", this.version]
            ]));
        }
    }

    // recursive page builder
    buildPage(fatherNode, content) {

        for (let i = 0; i < content.length; i++) {

            let element = content[i];

            let nodeType = element["node_type"];
            let nodeTags = element["node_tags"];
            let nodeStyles = element["node_styles"];
            let childs = element["node_childs"];
            let afterInit = element["node_afterinit"];

            let last_created = this.betterAppendChild(fatherNode, this.betterCreateElement(nodeType, nodeTags));

            if (!isNullOrUndefined(childs)) {
                this.buildPage(last_created, childs);
            }

            if (!isNullOrUndefined(nodeStyles)) {
                for (let j = 0; j < nodeStyles.length; j++) {
                    let style = nodeStyles[j];
                    last_created.style[style[0]] = style[1];
                }
            }

            if (!isVoidString(afterInit)) {
                window[afterInit]();
            }
        }
    }

    // set sync models
    setSyncModels(modelsList) {
        if (!isNullOrUndefined(modelsList)) {
            this.getServerInstance().sync_models = modelsList;
        }
    }

    // default unknown page
    showLockedPage() {

        let p = this.getCleanNavigationPanel();
        let last;

        if (this.getServerInstance().isAuthenticated()) {
            last = this.betterAppendChild(p, this.betterCreateElement("div", [
                ["className", "locked_page_label"],
                ["innerHTML", getTranslatedMessage("page_does_not_exists")]
            ]));
            last = this.betterAppendChild(p, this.betterCreateElement("div", [
                ["className", "go_back_link"],
                ["innerHTML", getTranslatedMessage("suggest_go_back")],
                ["onclick", "navigateBack()"]
            ]));
        } else {
            last = this.betterAppendChild(p, this.betterCreateElement("div", [
                ["className", "locked_page_label"],
                ["innerHTML", getTranslatedMessage("page_does_not_exists_or_requires_login")]
            ]));
            last = this.betterAppendChild(p, this.betterCreateElement("div", [
                ["className", "go_to_login_help"],
                ["innerHTML", getTranslatedMessage("suggest_login_1")]
            ]));
            last = this.betterAppendChild(last, this.betterCreateElement("div", [
                ["className", "go_to_login_link"],
                ["innerHTML", getTranslatedMessage("suggest_login_2")],
                ["onclick", "navigate('" + this.appPages[0]["name"] + "')"]
            ]));
        }
    }

    // read a section of the url
    // 0: before the #
    // 1: after the #
    getUrlSection(segment) {

        if (segment != 0 && segment != 1) {
            return;
        }

        // default page is the first one in the list
        let default_page = "";

        if (this.appPages.length > 0) {
            default_page = this.appPages[0]["name"];
        }

        let curr_url = decodeURI(window.location.href);

        // has page defined
        if (curr_url.split("#").length > 1) {
            return curr_url.split("#")[segment];
        } else {
            window.location.href = encodeURI(window.location.href + "#" + default_page);
            return default_page;
        }
    }

    // remove all content from the page target node element, and return a reference
    // to the node
    getCleanNavigationPanel() {

        let panel;
        if (!isNullOrUndefined(this.targetPageElementId)) {
            panel = document.getElementById(this.targetPageElementId);
        } else {
            panel = document.body;
        }

        if (isNullOrUndefined(panel)) {
            alert("Bad Error: Target page node is not defined!");
            return null;
        }

        while (panel.firstChild) {
            panel.removeChild(panel.firstChild);
        }
        return panel;
    }

    // append child and return reference to the son node
    betterAppendChild(father, son) {
        father.appendChild(son);
        return son;
    }

    // create an alement and init tags based on the "moreFlags" array contenente
    // moreFlags must be a key-value list
    betterCreateElement(type, moreFlags) {

        let el = document.createElement(type);

        if (type.substring(0, "functionResult".length) == "functionResult") {
            el.appendChild(window[type.split("-")[1]]());
        }

        if (!isNullOrUndefined(moreFlags)) {

            for (let i = 0; i < moreFlags.length; i++) {

                let keyname = moreFlags[i][0];
                let content = moreFlags[i][1];

                // special flag used to register an element to dynamic resizyng
                if (keyname == "$responsive") {
                    this.elementsRegisteredForDynamicResize.push(el);
                    el.setAttribute('responsive', content);
                }
                // standard flags
                else {
                    // you can init a flag with a '$_' to call a function named as
                    // the rest of the string e.g: $foo will call foo() and init content with the
                    // returned value
                    if (content.substring(0, "$".length) == "$") {
                        try {
                            content = window[content.substring("$".length)]();
                        } catch (e) {
                            content = "";
                        }
                    }

                    if (keyname.substring(0, 2) != "on") {
                        el[keyname] = content;
                    } else {
                        el.setAttribute(keyname, content);
                    }
                }
            }
        }

        return el;
    }

    // resize an element
    resizeDynamicElement(target_element) {

        let responsive_directive = target_element.getAttribute("responsive");
        let splitted_directions = responsive_directive.split(";");
        let processed_directions = [];

        for (let i = 0; i < splitted_directions.length; i++) {

            // example of directive string:  x<700:toolbar_label_small  (variable<bound:class_name)

            let dir = splitted_directions[i].trim();

            let directive_splittes = dir.split(":");
            let boundary_section = directive_splittes[0];
            let boundary_class = directive_splittes[1];

            let boundary_section_elements = boundary_section.split("<");

            let bound = boundary_section_elements[1].toLowerCase();
            if (bound == "inf" || bound == "any") {
                bound = "100000";
            }

            try {
                let bound_as_int = +bound;
                let direction = {
                    "variable": boundary_section_elements[0].toLowerCase(),
                    "bound": bound,
                    "class": boundary_class
                };
                processed_directions.push(direction);
            } catch (e) {
                console.error("Bad boundary set for element: " + dir);
            }
        }

        let width = window.innerWidth;
        let height = window.innerHeight;

        processed_directions.sort((a, b) => {
            return a["bound"] - b["bound"];
        });

        let x_was_set = false;
        let y_was_set = false;

        for (let i = 0; i < processed_directions.length; i++) {

            let fresh_cycle = true;
            let processed_dir = processed_directions[i];

            let boundary_limit = processed_dir["bound"];
            let className = processed_dir["class"];

            // x not set and classname can fit
            if (fresh_cycle && !x_was_set && processed_dir["variable"] == "x" && width < boundary_limit) {
                this.classNameSmartToggle(target_element, className, true);
                x_was_set = true;
                fresh_cycle = false;
            }
            // x is set already, all other x rules must be unset
            if (fresh_cycle && (x_was_set || width >= boundary_limit) && processed_dir["variable"] == "x") {
                this.classNameSmartToggle(target_element, className, false);
                fresh_cycle = false;
            }
            // y not set and classname can fit
            if (fresh_cycle && !y_was_set && processed_dir["variable"] == "y" && height < boundary_limit) {
                this.classNameSmartToggle(target_element, className, true);
                y_was_set = true;
                fresh_cycle = false;
            }
            // y is set already, all other y rules must be unset
            if (fresh_cycle && (y_was_set || height >= boundary_limit) && processed_dir["variable"] == "y") {
                this.classNameSmartToggle(target_element, className, false);
                fresh_cycle = false;
            }
        }
    }


    // toggler for class name with explicit toggle setter flag
    classNameSmartToggle(element, class_label, toggle) {

        let class_name_fullstring = element.className;
        let class_name_fulllist = class_name_fullstring.split(" ");

        // add it
        if (toggle) {

            // (do noting if already present)
            if (class_name_fulllist.indexOf(class_label) != -1) {
                return;
            }

            class_name_fulllist.push(class_label);
        }
        // remove it
        else {

            // (do nothing if already missing)
            if (class_name_fulllist.indexOf(class_label) == -1) {
                return;
            }

            for (let i = 0; i < class_name_fulllist.length; i++) {
                if (class_name_fulllist[i] == class_label) {
                    class_name_fulllist[i] = "";
                }
            }
        }

        let filtered = class_name_fulllist.filter(function(el) {
            return el != "";
        });

        element.className = filtered.join(" ");
    }


    // navigate to the requested page on this website
    setNavigation(pagerequest) {

        if (pagerequest != this.getUrlSection(1)) {
            let new_url = encodeURI(this.getUrlSection(0) + "#" + pagerequest);
            history.pushState(null, null, new_url);

            this.pageNavigate();
        }

        return ''; // chrome requires return value
    }

    // get logged Email
    loggedEmail() {
        return this.getServerInstance().email;
    }

    // credits: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
    getGUIID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // needed for any action to begin
    boot() {

        this.getServerInstance().loadStoredCredentials();

        singletonAddEventListener(document.body, 'click', handleGlobalClick, false);
        singletonAddEventListener(window, 'resize', pageHasResized, false);
        singletonAddEventListener(window, 'hashchange', pageHasChanged, false);

        this.pageNavigate();
    }

    // get stitch client user id
    getAuthenticatedId() {
        try {
            return this.getServerInstance().stitch_actual_client.auth.user.id;
        } catch (e) {
            return "ID missing";
        }
    }

    /* exported functions from inner class */
    async confirmUser() {
        if (this.toggleAPISpinner(true)) {
            return undefined;
        }
        return this.handleApiResult(await this.getServerInstance().confirmUser(), getTranslatedMessage("account_confirmed"));
    }
    async resetPassword(password, password_2) {

        if (isVoidString(password)) {
            this.openAlertDialog(getTranslatedMessage("password_cannot_be_empty"));
            return undefined;
        }

        if (password != password_2) {
            this.openAlertDialog(getTranslatedMessage("password_mismatch"));
            return undefined;
        }

        if (this.toggleAPISpinner(true)) {
            return undefined;
        }
        return this.handleApiResult(await this.getServerInstance().resetPassword(password), getTranslatedMessage("password_resetted"));
    }
    async registerUser(email, password, password_2) {

        if (isVoidString(email)) {
            this.openAlertDialog(getTranslatedMessage("email_cannot_be_empty"));
            return undefined;
        }

        if (!validateEmail(email)) {
            this.openAlertDialog(getTranslatedMessage("email_must_be_valid"));
            return undefined;
        }

        if (isVoidString(password)) {
            this.openAlertDialog(getTranslatedMessage("password_cannot_be_empty"));
            return undefined;
        }

        if (password != password_2) {
            this.openAlertDialog(getTranslatedMessage("password_mismatch"));
            return undefined;
        }

        if (this.toggleAPISpinner(true)) {
            return undefined;
        }
        return this.handleApiResult(await this.getServerInstance().registerUser(email.toLowerCase(), password), getTranslatedMessage("register_email_sent"));
    }
    async sendResetPasswordEmail(email) {

        if (!isVoidString(this.getServerInstance().email)) {
            email = this.getServerInstance().email;
        }

        if (isVoidString(email)) {
            this.openAlertDialog(getTranslatedMessage("email_cannot_be_empty"));
            return undefined;
        }

        if (!validateEmail(email)) {
            this.openAlertDialog(getTranslatedMessage("email_must_be_valid"));
            return undefined;
        }

        if (this.toggleAPISpinner(true)) {
            return undefined;
        }
        return this.handleApiResult(await this.getServerInstance().sendResetPasswordEmail(email), getTranslatedMessage("reset_email_sent"));
    }
    async resendConfirmationEmail(email) {

        if (isVoidString(email)) {
            this.openAlertDialog(getTranslatedMessage("email_cannot_be_empty"));
            return undefined;
        }

        if (!validateEmail(email)) {
            this.openAlertDialog(getTranslatedMessage("email_must_be_valid"));
            return undefined;
        }

        if (this.toggleAPISpinner(true)) {
            return undefined;
        }
        return this.handleApiResult(await this.getServerInstance().resendConfirmationEmail(email), getTranslatedMessage("register_email_sent"));
    }

    // override the deleteRemoteModel feature by forcing for some moment
    // the sync of a specific field
    async deleteRemoteSpecificField(collection, model_name) {
        let was = this.getServerInstance().sync_models;
        this.getServerInstance().sync_models = [model_name];

        // this calls uses the global SYNC_MODELS to know which models should go on backend
        let result = await this.deleteRemoteModel(collection);

        this.getServerInstance().sync_models = was;

        return result;
    }


    // override the updateRemoteModel feature by forcing for some moment
    // the sync of a specific field
    async insertSpecificModel(collection, model_name) {

        let was = this.getServerInstance().sync_models;
        this.getServerInstance().sync_models = [model_name];

        // this calls uses the global SYNC_MODELS to know which models should go on backend
        let result = await this.insertRemoteModel(collection);

        this.getServerInstance().sync_models = was;

        return result;
    }

    // override the updateRemoteModel feature by forcing for some moment
    // the sync of a specific field
    async updateSpecificModel(collection, model_name) {

        let was = this.getServerInstance().sync_models;
        this.getServerInstance().sync_models = [model_name];

        // this calls uses the global SYNC_MODELS to know which models should go on backend
        let result = await this.updateRemoteModel(collection);

        this.getServerInstance().sync_models = was;

        return result;
    }

    // send a single object on the collection
    async insertObjectInternal(collection, obj) {
        await this.handleApiResult(this.getServerInstance().promiseTimeout(this.getServerInstance().postInCollection(collection, obj, false)));
    }

    // send a single object on the collection
    async updateObjectInternal(collection, obj) {
        await this.handleApiResult(this.getServerInstance().promiseTimeout(this.getServerInstance().patchInCollection(collection, obj, false)));
    }

    async removeObjectInternal(collection, obj) {
        await this.handleApiResult(this.getServerInstance().promiseTimeout(this.getServerInstance().removeInCollection(collection, obj, false)));
    }

    // send a single object on the collection
    async insertObject(collection, obj) {
        if (this.toggleAPISpinner(true)) {
            return undefined;
        }
        return await this.handleApiResult(this.getServerInstance().promiseTimeout(this.getServerInstance().postInCollection(collection, obj, false)));
    }

    // send a single object on the collection
    async updateObject(collection, obj) {
        if (this.toggleAPISpinner(true)) {
            return undefined;
        }
        return await this.handleApiResult(this.getServerInstance().promiseTimeout(this.getServerInstance().patchInCollection(collection, obj, false)));
    }

    // send a single object on the collection
    async updateOrInsertObject(collection, obj) {
        if (this.toggleAPISpinner(true)) {
            return undefined;
        }
        return await this.handleApiResult(this.getServerInstance().promiseTimeout(this.getServerInstance().patchInCollection(collection, obj, true)));
    }

    // delete a single object on the collection
    async removeObject(collection, obj) {
        if (this.toggleAPISpinner(true)) {
            return undefined;
        }
        return await this.handleApiResult(this.getServerInstance().promiseTimeout(this.getServerInstance().removeInCollection(collection, obj, false)));
    }


    // if the storage is updated, the client is notified
    // then the client must check if the storage updated an item
    // registered for syncking. If yes, synck it
    bewareStorageInsertion(collection, name, obj) {
        if (this.getServerInstance().sync_models.indexOf(name) == -1) {
            this.getServerInstance().authenticated_models.push(name);
            this.insertObjectInternal(collection, obj);
        } else {
            this.insertSpecificModel(collection, name);
        }
    }

    // if the storage is updated, the client is notified
    // then the client must check if the storage updated an item
    // registered for syncking. If yes, synck it
    bewareStorageUpdate(collection, name, obj) {
        if (this.getServerInstance().sync_models.indexOf(name) == -1) {
            this.getServerInstance().authenticated_models.push(name);
            this.updateObjectInternal(collection, obj);
        } else {
            this.updateSpecificModel(collection, name);
        }
    }

    // as above but for deletion
    bewareStorageRemoved(collection, name, obj) {
        if (this.getServerInstance().sync_models.indexOf(name) == -1) {
            this.getServerInstance().authenticated_models = removeElementFromList(this.getServerInstance().authenticated_models, name);
            this.removeObjectInternal(collection, obj);
        } else {
            this.deleteRemoteSpecificField(collection, name);
        }
    }

    // update all the remote models marked for sinkyng
    async updateRemoteModel(collection) {
        return await this.getServerInstance().patchInCollection(collection, this.getServerInstance().getDataModel(), false);
    }

    // insert all the remote models marked for sinkyng
    async insertRemoteModel(collection) {
        return await this.getServerInstance().postInCollection(collection, this.getServerInstance().getDataModel(), false);
    }

    // delete all the remote models marked for sinkyng
    async deleteRemoteModel(collection) {
        return await this.getServerInstance().remove(collection, this.getServerInstance().getDataModel(), false);
    }

    // classic login
    async tryLogin(email, password) {

        if (isVoidString(email)) {
            this.openAlertDialog(getTranslatedMessage("email_cannot_be_empty"));
            return {"message": "bad input"};
        }

        if (!validateEmail(email)) {
            this.openAlertDialog(getTranslatedMessage("email_must_be_valid"));
            return {"message": "bad input"};
        }


        if (isVoidString(password)) {
            this.openAlertDialog(getTranslatedMessage("password_cannot_be_empty"));
            return {"message": "bad input"};
        }

        if (isVoidString(password)) {
            this.openAlertDialog(getTranslatedMessage("password_cannot_be_empty"));
            return {"message": "bad input"};
        }

        if (this.toggleAPISpinner(true)) {
            return {"message": "bad input"};
        }
        return this.handleApiResult(await this.getServerInstance().login(email.toLowerCase(), password), null);
    }
    async logout() {
        if (this.toggleAPISpinner(true)) {
            return {"message": "bad input"};
        }
        return this.handleApiResult(await this.getServerInstance().logout(), null);
    }

    async setDeveloperFlag(mode) {

        if (this.toggleAPISpinner(true)) {
            return {"message": "bad input"};
        }
        return this.handleApiResult(await this.getServerInstance().setDeveloperFlag(lastInitedAppClient.userDataColletion, mode), null);
    }
    async patchSingleInCollection(collection, field) {

        if (this.toggleAPISpinner(true)) {
            return {"message": "bad input"};
        }
        return this.handleApiResult(await this.getServerInstance().patchSingleInCollection(collection, field), null);
    }
    async find(collection, rule) {

        if (this.toggleAPISpinner(true)) {
            return {"message": "bad input"};
        }
        return this.handleApiResult(await this.getServerInstance().findInCollection(collection, rule), null);
    }

    async fetch(collection) {

        if (this.toggleAPISpinner(true)) {
            return {"message": "bad input"};
        }
        return this.handleApiResult(await this.getServerInstance().fetch(collection), null);
    }

    async selectOneRandom(collection) {

        if (this.toggleAPISpinner(true)) {
            return {"message": "bad input"};
        }
        return this.handleApiResult(await this.getServerInstance().selectOneRandom(collection), null);
    }


    async selectStar(collection) {

        if (this.toggleAPISpinner(true)) {
            return {"message": "bad input"};
        }
        return this.handleApiResult(await this.getServerInstance().selectStar(collection), null);
    }

    async patchInCollection(collection, data_list, upsertFlag) {

        if (this.toggleAPISpinner(true)) {
            return {"message": "bad input"};
        }
        return this.handleApiResult(await this.getServerInstance().patchInCollection(collection, data_list, upsertFlag), null);
    }

    /*
      This call will try to login and if the fetch is enabled it will also load any user data,
      else will handle the error and return null.
      App should check if null is returned and go to login page if happens.
    */
    async fullLoginFetchSequence(email, password) {

		let collection = this.userDataColletion;
	
        if (isNullOrUndefined(collection)) {
            this.openAlertDialog(getTranslatedMessage("no_userdata_collection_defined"));
            return "errore";
        }

        let res = await this.tryLogin(email, password);

        if (isNullOrUndefined(res)) {
            showBreadCrumb(getTranslatedMessage("sync_data"));
            let obj = await this.handleApiResult(this.getServerInstance().fetchAndInitModelIfMissing(collection));

            if (obj != null) {
                this.getServerInstance().bootRemoteModel(obj[0]);
            } else {
                showBreadCrumb(getTranslatedMessage("err_sync_data"));
            }
        } else {
			console.info("Login failed: " + (res.message || "unknown error"));				
        }

        return res;
    }

    /*
      Used in applications that use autologin feature

      This call will try to login with stored store credentials
      if available and if the fetch is enabled it will also load any user data,
      else will handle the error and return null.

      App should check if null is returned and go to login page if happens.
    */
    async autoLoginFullSequence() {

		let collection = this.userDataColletion;

        if (isNullOrUndefined(collection)) {
            this.openAlertDialog(getTranslatedMessage("no_userdata_collection_defined"));
            return "errore";
        }

        let res = null;
		let error_detected = false;
		let creds = this.getServerInstance().loadStoredCredentials();

        /* there are stored credentials */
        if (!isNullOrUndefined(creds)) {

            let res = await this.tryLogin(creds.email, creds.password);

            if (isNullOrUndefined(res)) {
                showBreadCrumb(getTranslatedMessage("sync_data"));
                let obj = await this.handleApiResult(this.getServerInstance().fetchAndInitModelIfMissing(collection));

                if (obj != null) {
                    this.getServerInstance().bootRemoteModel(obj[0]);
                } else {
					error_detected = true;
                    showBreadCrumb(getTranslatedMessage("err_sync_data"));
                }
            } else {
                console.info("Login failed: " + (res.message || "unknown error"));
				error_detected = true;
            }

        } else {
            console.info("There are no user creds stored. Cannot auto-login.");
			error_detected = true;
        }
		
		if(error_detected){
			await this.logout();
			navigate(this.appPages[0]["name"]);
		}

        return res;
    }
}



/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////

/// FOLLOWS A MINIFIED ORIGINAL VERSION OF STITCH.JS

/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////
/// ///////////////////////////////////////////  ///////////////// ////////////////////////////


! function(exports) {
    "use strict";
    var global$1 = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {},
        lookup = [],
        revLookup = [],
        Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array,
        inited = !1;

    function init() {
        inited = !0;
        for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = 0, r = e.length; t < r; ++t) lookup[t] = e[t], revLookup[e.charCodeAt(t)] = t;
        revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63
    }

    function toByteArray(e) {
        var t, r, n, o, i, s;
        inited || init();
        var u = e.length;
        if (0 < u % 4) throw new Error("Invalid string. Length must be a multiple of 4");
        i = "=" === e[u - 2] ? 2 : "=" === e[u - 1] ? 1 : 0, s = new Arr(3 * u / 4 - i), n = 0 < i ? u - 4 : u;
        var a = 0;
        for (r = t = 0; t < n; t += 4, r += 3) o = revLookup[e.charCodeAt(t)] << 18 | revLookup[e.charCodeAt(t + 1)] << 12 | revLookup[e.charCodeAt(t + 2)] << 6 | revLookup[e.charCodeAt(t + 3)], s[a++] = o >> 16 & 255, s[a++] = o >> 8 & 255, s[a++] = 255 & o;
        return 2 === i ? (o = revLookup[e.charCodeAt(t)] << 2 | revLookup[e.charCodeAt(t + 1)] >> 4, s[a++] = 255 & o) : 1 === i && (o = revLookup[e.charCodeAt(t)] << 10 | revLookup[e.charCodeAt(t + 1)] << 4 | revLookup[e.charCodeAt(t + 2)] >> 2, s[a++] = o >> 8 & 255, s[a++] = 255 & o), s
    }

    function tripletToBase64(e) {
        return lookup[e >> 18 & 63] + lookup[e >> 12 & 63] + lookup[e >> 6 & 63] + lookup[63 & e]
    }

    function encodeChunk(e, t, r) {
        for (var n, o = [], i = t; i < r; i += 3) n = (e[i] << 16) + (e[i + 1] << 8) + e[i + 2], o.push(tripletToBase64(n));
        return o.join("")
    }

    function fromByteArray(e) {
        var t;
        inited || init();
        for (var r = e.length, n = r % 3, o = "", i = [], s = 16383, u = 0, a = r - n; u < a; u += s) i.push(encodeChunk(e, u, a < u + s ? a : u + s));
        return 1 === n ? (t = e[r - 1], o += lookup[t >> 2], o += lookup[t << 4 & 63], o += "==") : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], o += lookup[t >> 10], o += lookup[t >> 4 & 63], o += lookup[t << 2 & 63], o += "="), i.push(o), i.join("")
    }

    function read(e, t, r, n, o) {
        var i, s, u = 8 * o - n - 1,
            a = (1 << u) - 1,
            c = a >> 1,
            f = -7,
            h = r ? o - 1 : 0,
            l = r ? -1 : 1,
            d = e[t + h];
        for (h += l, i = d & (1 << -f) - 1, d >>= -f, f += u; 0 < f; i = 256 * i + e[t + h], h += l, f -= 8);
        for (s = i & (1 << -f) - 1, i >>= -f, f += n; 0 < f; s = 256 * s + e[t + h], h += l, f -= 8);
        if (0 === i) i = 1 - c;
        else {
            if (i === a) return s ? NaN : 1 / 0 * (d ? -1 : 1);
            s += Math.pow(2, n), i -= c
        }
        return (d ? -1 : 1) * s * Math.pow(2, i - n)
    }

    function write(e, t, r, n, o, i) {
        var s, u, a, c = 8 * i - o - 1,
            f = (1 << c) - 1,
            h = f >> 1,
            l = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            d = n ? 0 : i - 1,
            p = n ? 1 : -1,
            y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (u = isNaN(t) ? 1 : 0, s = f) : (s = Math.floor(Math.log(t) / Math.LN2), t * (a = Math.pow(2, -s)) < 1 && (s--, a *= 2), 2 <= (t += 1 <= s + h ? l / a : l * Math.pow(2, 1 - h)) * a && (s++, a /= 2), f <= s + h ? (u = 0, s = f) : 1 <= s + h ? (u = (t * a - 1) * Math.pow(2, o), s += h) : (u = t * Math.pow(2, h - 1) * Math.pow(2, o), s = 0)); 8 <= o; e[r + d] = 255 & u, d += p, u /= 256, o -= 8);
        for (s = s << o | u, c += o; 0 < c; e[r + d] = 255 & s, d += p, s /= 256, c -= 8);
        e[r + d - p] |= 128 * y
    }
    var toString = {}.toString,
        isArray = Array.isArray || function(e) {
            return "[object Array]" == toString.call(e)
        },
        INSPECT_MAX_BYTES = 50;

    function kMaxLength() {
        return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
    }

    function createBuffer(e, t) {
        if (kMaxLength() < t) throw new RangeError("Invalid typed array length");
        return Buffer.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = Buffer.prototype : (null === e && (e = new Buffer(t)), e.length = t), e
    }

    function Buffer(e, t, r) {
        if (!(Buffer.TYPED_ARRAY_SUPPORT || this instanceof Buffer)) return new Buffer(e, t, r);
        if ("number" == typeof e) {
            if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
            return allocUnsafe(this, e)
        }
        return from(this, e, t, r)
    }

    function from(e, t, r, n) {
        if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? fromArrayBuffer(e, t, r, n) : "string" == typeof t ? fromString(e, t, r) : fromObject(e, t)
    }

    function assertSize(e) {
        if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
        if (e < 0) throw new RangeError('"size" argument must not be negative')
    }

    function alloc(e, t, r, n) {
        return assertSize(t), t <= 0 ? createBuffer(e, t) : void 0 !== r ? "string" == typeof n ? createBuffer(e, t).fill(r, n) : createBuffer(e, t).fill(r) : createBuffer(e, t)
    }

    function allocUnsafe(e, t) {
        if (assertSize(t), e = createBuffer(e, t < 0 ? 0 : 0 | checked(t)), !Buffer.TYPED_ARRAY_SUPPORT)
            for (var r = 0; r < t; ++r) e[r] = 0;
        return e
    }

    function fromString(e, t, r) {
        if ("string" == typeof r && "" !== r || (r = "utf8"), !Buffer.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
        var n = 0 | byteLength(t, r),
            o = (e = createBuffer(e, n)).write(t, r);
        return o !== n && (e = e.slice(0, o)), e
    }

    function fromArrayLike(e, t) {
        var r = t.length < 0 ? 0 : 0 | checked(t.length);
        e = createBuffer(e, r);
        for (var n = 0; n < r; n += 1) e[n] = 255 & t[n];
        return e
    }

    function fromArrayBuffer(e, t, r, n) {
        if (t.byteLength, r < 0 || t.byteLength < r) throw new RangeError("'offset' is out of bounds");
        if (t.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
        return t = void 0 === r && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, r) : new Uint8Array(t, r, n), Buffer.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = Buffer.prototype : e = fromArrayLike(e, t), e
    }

    function fromObject(e, t) {
        if (internalIsBuffer(t)) {
            var r = 0 | checked(t.length);
            return 0 === (e = createBuffer(e, r)).length || t.copy(e, 0, 0, r), e
        }
        if (t) {
            if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || isnan(t.length) ? createBuffer(e, 0) : fromArrayLike(e, t);
            if ("Buffer" === t.type && isArray(t.data)) return fromArrayLike(e, t.data)
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
    }

    function checked(e) {
        if (e >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
        return 0 | e
    }

    function internalIsBuffer(e) {
        return !(null == e || !e._isBuffer)
    }

    function byteLength(e, t) {
        if (internalIsBuffer(e)) return e.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
        "string" != typeof e && (e = "" + e);
        var r = e.length;
        if (0 === r) return 0;
        for (var n = !1;;) switch (t) {
            case "ascii":
            case "latin1":
            case "binary":
                return r;
            case "utf8":
            case "utf-8":
            case void 0:
                return utf8ToBytes(e).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * r;
            case "hex":
                return r >>> 1;
            case "base64":
                return base64ToBytes(e).length;
            default:
                if (n) return utf8ToBytes(e).length;
                t = ("" + t).toLowerCase(), n = !0
        }
    }

    function slowToString(e, t, r) {
        var n = !1;
        if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
        if ((r >>>= 0) <= (t >>>= 0)) return "";
        for (e || (e = "utf8");;) switch (e) {
            case "hex":
                return hexSlice(this, t, r);
            case "utf8":
            case "utf-8":
                return utf8Slice(this, t, r);
            case "ascii":
                return asciiSlice(this, t, r);
            case "latin1":
            case "binary":
                return latin1Slice(this, t, r);
            case "base64":
                return base64Slice(this, t, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return utf16leSlice(this, t, r);
            default:
                if (n) throw new TypeError("Unknown encoding: " + e);
                e = (e + "").toLowerCase(), n = !0
        }
    }

    function swap(e, t, r) {
        var n = e[t];
        e[t] = e[r], e[r] = n
    }

    function bidirectionalIndexOf(e, t, r, n, o) {
        if (0 === e.length) return -1;
        if ("string" == typeof r ? (n = r, r = 0) : 2147483647 < r ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = o ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
            if (o) return -1;
            r = e.length - 1
        } else if (r < 0) {
            if (!o) return -1;
            r = 0
        }
        if ("string" == typeof t && (t = Buffer.from(t, n)), internalIsBuffer(t)) return 0 === t.length ? -1 : arrayIndexOf(e, t, r, n, o);
        if ("number" == typeof t) return t &= 255, Buffer.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : arrayIndexOf(e, [t], r, n, o);
        throw new TypeError("val must be string, number or Buffer")
    }

    function arrayIndexOf(e, t, r, n, o) {
        var i, s = 1,
            u = e.length,
            a = t.length;
        if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
            if (e.length < 2 || t.length < 2) return -1;
            u /= s = 2, a /= 2, r /= 2
        }

        function c(e, t) {
            return 1 === s ? e[t] : e.readUInt16BE(t * s)
        }
        if (o) {
            var f = -1;
            for (i = r; i < u; i++)
                if (c(e, i) === c(t, -1 === f ? 0 : i - f)) {
                    if (-1 === f && (f = i), i - f + 1 === a) return f * s
                } else -1 !== f && (i -= i - f), f = -1
        } else
            for (u < r + a && (r = u - a), i = r; 0 <= i; i--) {
                for (var h = !0, l = 0; l < a; l++)
                    if (c(e, i + l) !== c(t, l)) {
                        h = !1;
                        break
                    } if (h) return i
            }
        return -1
    }

    function hexWrite(e, t, r, n) {
        r = Number(r) || 0;
        var o = e.length - r;
        n ? o < (n = Number(n)) && (n = o) : n = o;
        var i = t.length;
        if (i % 2 != 0) throw new TypeError("Invalid hex string");
        i / 2 < n && (n = i / 2);
        for (var s = 0; s < n; ++s) {
            var u = parseInt(t.substr(2 * s, 2), 16);
            if (isNaN(u)) return s;
            e[r + s] = u
        }
        return s
    }

    function utf8Write(e, t, r, n) {
        return blitBuffer(utf8ToBytes(t, e.length - r), e, r, n)
    }

    function asciiWrite(e, t, r, n) {
        return blitBuffer(asciiToBytes(t), e, r, n)
    }

    function latin1Write(e, t, r, n) {
        return asciiWrite(e, t, r, n)
    }

    function base64Write(e, t, r, n) {
        return blitBuffer(base64ToBytes(t), e, r, n)
    }

    function ucs2Write(e, t, r, n) {
        return blitBuffer(utf16leToBytes(t, e.length - r), e, r, n)
    }

    function base64Slice(e, t, r) {
        return 0 === t && r === e.length ? fromByteArray(e) : fromByteArray(e.slice(t, r))
    }

    function utf8Slice(e, t, r) {
        r = Math.min(e.length, r);
        for (var n = [], o = t; o < r;) {
            var i, s, u, a, c = e[o],
                f = null,
                h = 239 < c ? 4 : 223 < c ? 3 : 191 < c ? 2 : 1;
            if (o + h <= r) switch (h) {
                case 1:
                    c < 128 && (f = c);
                    break;
                case 2:
                    128 == (192 & (i = e[o + 1])) && 127 < (a = (31 & c) << 6 | 63 & i) && (f = a);
                    break;
                case 3:
                    i = e[o + 1], s = e[o + 2], 128 == (192 & i) && 128 == (192 & s) && 2047 < (a = (15 & c) << 12 | (63 & i) << 6 | 63 & s) && (a < 55296 || 57343 < a) && (f = a);
                    break;
                case 4:
                    i = e[o + 1], s = e[o + 2], u = e[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & u) && 65535 < (a = (15 & c) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & u) && a < 1114112 && (f = a)
            }
            null === f ? (f = 65533, h = 1) : 65535 < f && (f -= 65536, n.push(f >>> 10 & 1023 | 55296), f = 56320 | 1023 & f), n.push(f), o += h
        }
        return decodeCodePointsArray(n)
    }
    Buffer.TYPED_ARRAY_SUPPORT = void 0 === global$1.TYPED_ARRAY_SUPPORT || global$1.TYPED_ARRAY_SUPPORT, Buffer.poolSize = 8192, Buffer._augment = function(e) {
        return e.__proto__ = Buffer.prototype, e
    }, Buffer.from = function(e, t, r) {
        return from(null, e, t, r)
    }, Buffer.TYPED_ARRAY_SUPPORT && (Buffer.prototype.__proto__ = Uint8Array.prototype, Buffer.__proto__ = Uint8Array), Buffer.alloc = function(e, t, r) {
        return alloc(null, e, t, r)
    }, Buffer.allocUnsafe = function(e) {
        return allocUnsafe(null, e)
    }, Buffer.allocUnsafeSlow = function(e) {
        return allocUnsafe(null, e)
    }, Buffer.isBuffer = isBuffer, Buffer.compare = function(e, t) {
        if (!internalIsBuffer(e) || !internalIsBuffer(t)) throw new TypeError("Arguments must be Buffers");
        if (e === t) return 0;
        for (var r = e.length, n = t.length, o = 0, i = Math.min(r, n); o < i; ++o)
            if (e[o] !== t[o]) {
                r = e[o], n = t[o];
                break
            } return r < n ? -1 : n < r ? 1 : 0
    }, Buffer.isEncoding = function(e) {
        switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
        }
    }, Buffer.concat = function(e, t) {
        if (!isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === e.length) return Buffer.alloc(0);
        var r;
        if (void 0 === t)
            for (r = t = 0; r < e.length; ++r) t += e[r].length;
        var n = Buffer.allocUnsafe(t),
            o = 0;
        for (r = 0; r < e.length; ++r) {
            var i = e[r];
            if (!internalIsBuffer(i)) throw new TypeError('"list" argument must be an Array of Buffers');
            i.copy(n, o), o += i.length
        }
        return n
    }, Buffer.byteLength = byteLength, Buffer.prototype._isBuffer = !0, Buffer.prototype.swap16 = function() {
        var e = this.length;
        if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var t = 0; t < e; t += 2) swap(this, t, t + 1);
        return this
    }, Buffer.prototype.swap32 = function() {
        var e = this.length;
        if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var t = 0; t < e; t += 4) swap(this, t, t + 3), swap(this, t + 1, t + 2);
        return this
    }, Buffer.prototype.swap64 = function() {
        var e = this.length;
        if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var t = 0; t < e; t += 8) swap(this, t, t + 7), swap(this, t + 1, t + 6), swap(this, t + 2, t + 5), swap(this, t + 3, t + 4);
        return this
    }, Buffer.prototype.toString = function() {
        var e = 0 | this.length;
        return 0 === e ? "" : 0 === arguments.length ? utf8Slice(this, 0, e) : slowToString.apply(this, arguments)
    }, Buffer.prototype.equals = function(e) {
        if (!internalIsBuffer(e)) throw new TypeError("Argument must be a Buffer");
        return this === e || 0 === Buffer.compare(this, e)
    }, Buffer.prototype.inspect = function() {
        var e = "",
            t = INSPECT_MAX_BYTES;
        return 0 < this.length && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">"
    }, Buffer.prototype.compare = function(e, t, r, n, o) {
        if (!internalIsBuffer(e)) throw new TypeError("Argument must be a Buffer");
        if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === o && (o = this.length), t < 0 || r > e.length || n < 0 || o > this.length) throw new RangeError("out of range index");
        if (o <= n && r <= t) return 0;
        if (o <= n) return -1;
        if (r <= t) return 1;
        if (this === e) return 0;
        for (var i = (o >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (t >>>= 0), u = Math.min(i, s), a = this.slice(n, o), c = e.slice(t, r), f = 0; f < u; ++f)
            if (a[f] !== c[f]) {
                i = a[f], s = c[f];
                break
            } return i < s ? -1 : s < i ? 1 : 0
    }, Buffer.prototype.includes = function(e, t, r) {
        return -1 !== this.indexOf(e, t, r)
    }, Buffer.prototype.indexOf = function(e, t, r) {
        return bidirectionalIndexOf(this, e, t, r, !0)
    }, Buffer.prototype.lastIndexOf = function(e, t, r) {
        return bidirectionalIndexOf(this, e, t, r, !1)
    }, Buffer.prototype.write = function(e, t, r, n) {
        if (void 0 === t) n = "utf8", r = this.length, t = 0;
        else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;
        else {
            if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            t |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
        }
        var o = this.length - t;
        if ((void 0 === r || o < r) && (r = o), 0 < e.length && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        n || (n = "utf8");
        for (var i = !1;;) switch (n) {
            case "hex":
                return hexWrite(this, e, t, r);
            case "utf8":
            case "utf-8":
                return utf8Write(this, e, t, r);
            case "ascii":
                return asciiWrite(this, e, t, r);
            case "latin1":
            case "binary":
                return latin1Write(this, e, t, r);
            case "base64":
                return base64Write(this, e, t, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return ucs2Write(this, e, t, r);
            default:
                if (i) throw new TypeError("Unknown encoding: " + n);
                n = ("" + n).toLowerCase(), i = !0
        }
    }, Buffer.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    };
    var MAX_ARGUMENTS_LENGTH = 4096;

    function decodeCodePointsArray(e) {
        var t = e.length;
        if (t <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, e);
        for (var r = "", n = 0; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += MAX_ARGUMENTS_LENGTH));
        return r
    }

    function asciiSlice(e, t, r) {
        var n = "";
        r = Math.min(e.length, r);
        for (var o = t; o < r; ++o) n += String.fromCharCode(127 & e[o]);
        return n
    }

    function latin1Slice(e, t, r) {
        var n = "";
        r = Math.min(e.length, r);
        for (var o = t; o < r; ++o) n += String.fromCharCode(e[o]);
        return n
    }

    function hexSlice(e, t, r) {
        var n = e.length;
        (!t || t < 0) && (t = 0), (!r || r < 0 || n < r) && (r = n);
        for (var o = "", i = t; i < r; ++i) o += toHex(e[i]);
        return o
    }

    function utf16leSlice(e, t, r) {
        for (var n = e.slice(t, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
        return o
    }

    function checkOffset(e, t, r) {
        if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
        if (r < e + t) throw new RangeError("Trying to access beyond buffer length")
    }

    function checkInt(e, t, r, n, o, i) {
        if (!internalIsBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (o < t || t < i) throw new RangeError('"value" argument is out of bounds');
        if (r + n > e.length) throw new RangeError("Index out of range")
    }

    function objectWriteUInt16(e, t, r, n) {
        t < 0 && (t = 65535 + t + 1);
        for (var o = 0, i = Math.min(e.length - r, 2); o < i; ++o) e[r + o] = (t & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o)
    }

    function objectWriteUInt32(e, t, r, n) {
        t < 0 && (t = 4294967295 + t + 1);
        for (var o = 0, i = Math.min(e.length - r, 4); o < i; ++o) e[r + o] = t >>> 8 * (n ? o : 3 - o) & 255
    }

    function checkIEEE754(e, t, r, n, o, i) {
        if (r + n > e.length) throw new RangeError("Index out of range");
        if (r < 0) throw new RangeError("Index out of range")
    }

    function writeFloat(e, t, r, n, o) {
        return o || checkIEEE754(e, t, r, 4, 34028234663852886e22, -34028234663852886e22), write(e, t, r, n, 23, 4), r + 4
    }

    function writeDouble(e, t, r, n, o) {
        return o || checkIEEE754(e, t, r, 8, 17976931348623157e292, -17976931348623157e292), write(e, t, r, n, 52, 8), r + 8
    }
    Buffer.prototype.slice = function(e, t) {
        var r, n = this.length;
        if ((e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : n < e && (e = n), (t = void 0 === t ? n : ~~t) < 0 ? (t += n) < 0 && (t = 0) : n < t && (t = n), t < e && (t = e), Buffer.TYPED_ARRAY_SUPPORT)(r = this.subarray(e, t)).__proto__ = Buffer.prototype;
        else {
            var o = t - e;
            r = new Buffer(o, void 0);
            for (var i = 0; i < o; ++i) r[i] = this[i + e]
        }
        return r
    }, Buffer.prototype.readUIntLE = function(e, t, r) {
        e |= 0, t |= 0, r || checkOffset(e, t, this.length);
        for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
        return n
    }, Buffer.prototype.readUIntBE = function(e, t, r) {
        e |= 0, t |= 0, r || checkOffset(e, t, this.length);
        for (var n = this[e + --t], o = 1; 0 < t && (o *= 256);) n += this[e + --t] * o;
        return n
    }, Buffer.prototype.readUInt8 = function(e, t) {
        return t || checkOffset(e, 1, this.length), this[e]
    }, Buffer.prototype.readUInt16LE = function(e, t) {
        return t || checkOffset(e, 2, this.length), this[e] | this[e + 1] << 8
    }, Buffer.prototype.readUInt16BE = function(e, t) {
        return t || checkOffset(e, 2, this.length), this[e] << 8 | this[e + 1]
    }, Buffer.prototype.readUInt32LE = function(e, t) {
        return t || checkOffset(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
    }, Buffer.prototype.readUInt32BE = function(e, t) {
        return t || checkOffset(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
    }, Buffer.prototype.readIntLE = function(e, t, r) {
        e |= 0, t |= 0, r || checkOffset(e, t, this.length);
        for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
        return (o *= 128) <= n && (n -= Math.pow(2, 8 * t)), n
    }, Buffer.prototype.readIntBE = function(e, t, r) {
        e |= 0, t |= 0, r || checkOffset(e, t, this.length);
        for (var n = t, o = 1, i = this[e + --n]; 0 < n && (o *= 256);) i += this[e + --n] * o;
        return (o *= 128) <= i && (i -= Math.pow(2, 8 * t)), i
    }, Buffer.prototype.readInt8 = function(e, t) {
        return t || checkOffset(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
    }, Buffer.prototype.readInt16LE = function(e, t) {
        t || checkOffset(e, 2, this.length);
        var r = this[e] | this[e + 1] << 8;
        return 32768 & r ? 4294901760 | r : r
    }, Buffer.prototype.readInt16BE = function(e, t) {
        t || checkOffset(e, 2, this.length);
        var r = this[e + 1] | this[e] << 8;
        return 32768 & r ? 4294901760 | r : r
    }, Buffer.prototype.readInt32LE = function(e, t) {
        return t || checkOffset(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
    }, Buffer.prototype.readInt32BE = function(e, t) {
        return t || checkOffset(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
    }, Buffer.prototype.readFloatLE = function(e, t) {
        return t || checkOffset(e, 4, this.length), read(this, e, !0, 23, 4)
    }, Buffer.prototype.readFloatBE = function(e, t) {
        return t || checkOffset(e, 4, this.length), read(this, e, !1, 23, 4)
    }, Buffer.prototype.readDoubleLE = function(e, t) {
        return t || checkOffset(e, 8, this.length), read(this, e, !0, 52, 8)
    }, Buffer.prototype.readDoubleBE = function(e, t) {
        return t || checkOffset(e, 8, this.length), read(this, e, !1, 52, 8)
    }, Buffer.prototype.writeUIntLE = function(e, t, r, n) {
        (e = +e, t |= 0, r |= 0, n) || checkInt(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
        var o = 1,
            i = 0;
        for (this[t] = 255 & e; ++i < r && (o *= 256);) this[t + i] = e / o & 255;
        return t + r
    }, Buffer.prototype.writeUIntBE = function(e, t, r, n) {
        (e = +e, t |= 0, r |= 0, n) || checkInt(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
        var o = r - 1,
            i = 1;
        for (this[t + o] = 255 & e; 0 <= --o && (i *= 256);) this[t + o] = e / i & 255;
        return t + r
    }, Buffer.prototype.writeUInt8 = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 1, 255, 0), Buffer.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
    }, Buffer.prototype.writeUInt16LE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : objectWriteUInt16(this, e, t, !0), t + 2
    }, Buffer.prototype.writeUInt16BE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : objectWriteUInt16(this, e, t, !1), t + 2
    }, Buffer.prototype.writeUInt32LE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : objectWriteUInt32(this, e, t, !0), t + 4
    }, Buffer.prototype.writeUInt32BE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : objectWriteUInt32(this, e, t, !1), t + 4
    }, Buffer.prototype.writeIntLE = function(e, t, r, n) {
        if (e = +e, t |= 0, !n) {
            var o = Math.pow(2, 8 * r - 1);
            checkInt(this, e, t, r, o - 1, -o)
        }
        var i = 0,
            s = 1,
            u = 0;
        for (this[t] = 255 & e; ++i < r && (s *= 256);) e < 0 && 0 === u && 0 !== this[t + i - 1] && (u = 1), this[t + i] = (e / s >> 0) - u & 255;
        return t + r
    }, Buffer.prototype.writeIntBE = function(e, t, r, n) {
        if (e = +e, t |= 0, !n) {
            var o = Math.pow(2, 8 * r - 1);
            checkInt(this, e, t, r, o - 1, -o)
        }
        var i = r - 1,
            s = 1,
            u = 0;
        for (this[t + i] = 255 & e; 0 <= --i && (s *= 256);) e < 0 && 0 === u && 0 !== this[t + i + 1] && (u = 1), this[t + i] = (e / s >> 0) - u & 255;
        return t + r
    }, Buffer.prototype.writeInt8 = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 1, 127, -128), Buffer.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
    }, Buffer.prototype.writeInt16LE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : objectWriteUInt16(this, e, t, !0), t + 2
    }, Buffer.prototype.writeInt16BE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : objectWriteUInt16(this, e, t, !1), t + 2
    }, Buffer.prototype.writeInt32LE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 4, 2147483647, -2147483648), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : objectWriteUInt32(this, e, t, !0), t + 4
    }, Buffer.prototype.writeInt32BE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : objectWriteUInt32(this, e, t, !1), t + 4
    }, Buffer.prototype.writeFloatLE = function(e, t, r) {
        return writeFloat(this, e, t, !0, r)
    }, Buffer.prototype.writeFloatBE = function(e, t, r) {
        return writeFloat(this, e, t, !1, r)
    }, Buffer.prototype.writeDoubleLE = function(e, t, r) {
        return writeDouble(this, e, t, !0, r)
    }, Buffer.prototype.writeDoubleBE = function(e, t, r) {
        return writeDouble(this, e, t, !1, r)
    }, Buffer.prototype.copy = function(e, t, r, n) {
        if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), 0 < n && n < r && (n = r), n === r) return 0;
        if (0 === e.length || 0 === this.length) return 0;
        if (t < 0) throw new RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
        if (n < 0) throw new RangeError("sourceEnd out of bounds");
        n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
        var o, i = n - r;
        if (this === e && r < t && t < n)
            for (o = i - 1; 0 <= o; --o) e[o + t] = this[o + r];
        else if (i < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT)
            for (o = 0; o < i; ++o) e[o + t] = this[o + r];
        else Uint8Array.prototype.set.call(e, this.subarray(r, r + i), t);
        return i
    }, Buffer.prototype.fill = function(e, t, r, n) {
        if ("string" == typeof e) {
            if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === e.length) {
                var o = e.charCodeAt(0);
                o < 256 && (e = o)
            }
            if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
            if ("string" == typeof n && !Buffer.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
        } else "number" == typeof e && (e &= 255);
        if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
        if (r <= t) return this;
        var i;
        if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e)
            for (i = t; i < r; ++i) this[i] = e;
        else {
            var s = internalIsBuffer(e) ? e : utf8ToBytes(new Buffer(e, n).toString()),
                u = s.length;
            for (i = 0; i < r - t; ++i) this[i + t] = s[i % u]
        }
        return this
    };
    var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

    function base64clean(e) {
        if ((e = stringtrim(e).replace(INVALID_BASE64_RE, "")).length < 2) return "";
        for (; e.length % 4 != 0;) e += "=";
        return e
    }

    function stringtrim(e) {
        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
    }

    function toHex(e) {
        return e < 16 ? "0" + e.toString(16) : e.toString(16)
    }

    function utf8ToBytes(e, t) {
        var r;
        t = t || 1 / 0;
        for (var n = e.length, o = null, i = [], s = 0; s < n; ++s) {
            if (55295 < (r = e.charCodeAt(s)) && r < 57344) {
                if (!o) {
                    if (56319 < r) {
                        -1 < (t -= 3) && i.push(239, 191, 189);
                        continue
                    }
                    if (s + 1 === n) {
                        -1 < (t -= 3) && i.push(239, 191, 189);
                        continue
                    }
                    o = r;
                    continue
                }
                if (r < 56320) {
                    -1 < (t -= 3) && i.push(239, 191, 189), o = r;
                    continue
                }
                r = 65536 + (o - 55296 << 10 | r - 56320)
            } else o && -1 < (t -= 3) && i.push(239, 191, 189);
            if (o = null, r < 128) {
                if ((t -= 1) < 0) break;
                i.push(r)
            } else if (r < 2048) {
                if ((t -= 2) < 0) break;
                i.push(r >> 6 | 192, 63 & r | 128)
            } else if (r < 65536) {
                if ((t -= 3) < 0) break;
                i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
            } else {
                if (!(r < 1114112)) throw new Error("Invalid code point");
                if ((t -= 4) < 0) break;
                i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
            }
        }
        return i
    }

    function asciiToBytes(e) {
        for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
        return t
    }

    function utf16leToBytes(e, t) {
        for (var r, n, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) n = (r = e.charCodeAt(s)) >> 8, o = r % 256, i.push(o), i.push(n);
        return i
    }

    function base64ToBytes(e) {
        return toByteArray(base64clean(e))
    }

    function blitBuffer(e, t, r, n) {
        for (var o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o) t[o + r] = e[o];
        return o
    }

    function isnan(e) {
        return e != e
    }

    function isBuffer(e) {
        return null != e && (!!e._isBuffer || isFastBuffer(e) || isSlowBuffer(e))
    }

    function isFastBuffer(e) {
        return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
    }

    function isSlowBuffer(e) {
        return "function" == typeof e.readFloatLE && "function" == typeof e.slice && isFastBuffer(e.slice(0, 0))
    }
    var long_1 = Long,
        wasm = null;
    try {
        wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports
    } catch (e) {}

    function Long(e, t, r) {
        this.low = 0 | e, this.high = 0 | t, this.unsigned = !!r
    }

    function isLong(e) {
        return !0 === (e && e.__isLong__)
    }
    Object.defineProperty(Long.prototype, "__isLong__", {
        value: !0
    }), Long.isLong = isLong;
    var INT_CACHE = {},
        UINT_CACHE = {};

    function fromInt(e, t) {
        var r, n, o;
        return t ? (o = 0 <= (e >>>= 0) && e < 256) && (n = UINT_CACHE[e]) ? n : (r = fromBits(e, (0 | e) < 0 ? -1 : 0, !0), o && (UINT_CACHE[e] = r), r) : (o = -128 <= (e |= 0) && e < 128) && (n = INT_CACHE[e]) ? n : (r = fromBits(e, e < 0 ? -1 : 0, !1), o && (INT_CACHE[e] = r), r)
    }

    function fromNumber(e, t) {
        if (isNaN(e)) return t ? UZERO : ZERO;
        if (t) {
            if (e < 0) return UZERO;
            if (TWO_PWR_64_DBL <= e) return MAX_UNSIGNED_VALUE
        } else {
            if (e <= -TWO_PWR_63_DBL) return MIN_VALUE;
            if (TWO_PWR_63_DBL <= e + 1) return MAX_VALUE
        }
        return e < 0 ? fromNumber(-e, t).neg() : fromBits(e % TWO_PWR_32_DBL | 0, e / TWO_PWR_32_DBL | 0, t)
    }

    function fromBits(e, t, r) {
        return new Long(e, t, r)
    }
    Long.fromInt = fromInt, Long.fromNumber = fromNumber, Long.fromBits = fromBits;
    var pow_dbl = Math.pow;

    function fromString$1(e, t, r) {
        if (0 === e.length) throw Error("empty string");
        if ("NaN" === e || "Infinity" === e || "+Infinity" === e || "-Infinity" === e) return ZERO;
        if ("number" == typeof t ? (r = t, t = !1) : t = !!t, (r = r || 10) < 2 || 36 < r) throw RangeError("radix");
        var n;
        if (0 < (n = e.indexOf("-"))) throw Error("interior hyphen");
        if (0 === n) return fromString$1(e.substring(1), t, r).neg();
        for (var o = fromNumber(pow_dbl(r, 8)), i = ZERO, s = 0; s < e.length; s += 8) {
            var u = Math.min(8, e.length - s),
                a = parseInt(e.substring(s, s + u), r);
            if (u < 8) {
                var c = fromNumber(pow_dbl(r, u));
                i = i.mul(c).add(fromNumber(a))
            } else i = (i = i.mul(o)).add(fromNumber(a))
        }
        return i.unsigned = t, i
    }

    function fromValue(e, t) {
        return "number" == typeof e ? fromNumber(e, t) : "string" == typeof e ? fromString$1(e, t) : fromBits(e.low, e.high, "boolean" == typeof t ? t : e.unsigned)
    }
    Long.fromString = fromString$1, Long.fromValue = fromValue;
    var TWO_PWR_16_DBL = 65536,
        TWO_PWR_24_DBL = 1 << 24,
        TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL,
        TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL,
        TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2,
        TWO_PWR_24 = fromInt(TWO_PWR_24_DBL),
        ZERO = fromInt(0);
    Long.ZERO = ZERO;
    var UZERO = fromInt(0, !0);
    Long.UZERO = UZERO;
    var ONE = fromInt(1);
    Long.ONE = ONE;
    var UONE = fromInt(1, !0);
    Long.UONE = UONE;
    var NEG_ONE = fromInt(-1);
    Long.NEG_ONE = NEG_ONE;
    var MAX_VALUE = fromBits(-1, 2147483647, !1);
    Long.MAX_VALUE = MAX_VALUE;
    var MAX_UNSIGNED_VALUE = fromBits(-1, -1, !0);
    Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
    var MIN_VALUE = fromBits(0, -2147483648, !1);
    Long.MIN_VALUE = MIN_VALUE;
    var LongPrototype = Long.prototype;

    function createCommonjsModule(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }
    LongPrototype.toInt = function() {
        return this.unsigned ? this.low >>> 0 : this.low
    }, LongPrototype.toNumber = function() {
        return this.unsigned ? (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0) : this.high * TWO_PWR_32_DBL + (this.low >>> 0)
    }, LongPrototype.toString = function(e) {
        if ((e = e || 10) < 2 || 36 < e) throw RangeError("radix");
        if (this.isZero()) return "0";
        if (this.isNegative()) {
            if (this.eq(MIN_VALUE)) {
                var t = fromNumber(e),
                    r = this.div(t),
                    n = r.mul(t).sub(this);
                return r.toString(e) + n.toInt().toString(e)
            }
            return "-" + this.neg().toString(e)
        }
        for (var o = fromNumber(pow_dbl(e, 6), this.unsigned), i = this, s = "";;) {
            var u = i.div(o),
                a = (i.sub(u.mul(o)).toInt() >>> 0).toString(e);
            if ((i = u).isZero()) return a + s;
            for (; a.length < 6;) a = "0" + a;
            s = "" + a + s
        }
    }, LongPrototype.getHighBits = function() {
        return this.high
    }, LongPrototype.getHighBitsUnsigned = function() {
        return this.high >>> 0
    }, LongPrototype.getLowBits = function() {
        return this.low
    }, LongPrototype.getLowBitsUnsigned = function() {
        return this.low >>> 0
    }, LongPrototype.getNumBitsAbs = function() {
        if (this.isNegative()) return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        for (var e = 0 != this.high ? this.high : this.low, t = 31; 0 < t && 0 == (e & 1 << t); t--);
        return 0 != this.high ? t + 33 : t + 1
    }, LongPrototype.isZero = function() {
        return 0 === this.high && 0 === this.low
    }, LongPrototype.eqz = LongPrototype.isZero, LongPrototype.isNegative = function() {
        return !this.unsigned && this.high < 0
    }, LongPrototype.isPositive = function() {
        return this.unsigned || 0 <= this.high
    }, LongPrototype.isOdd = function() {
        return 1 == (1 & this.low)
    }, LongPrototype.isEven = function() {
        return 0 == (1 & this.low)
    }, LongPrototype.equals = function(e) {
        return isLong(e) || (e = fromValue(e)), (this.unsigned === e.unsigned || this.high >>> 31 != 1 || e.high >>> 31 != 1) && (this.high === e.high && this.low === e.low)
    }, LongPrototype.eq = LongPrototype.equals, LongPrototype.notEquals = function(e) {
        return !this.eq(e)
    }, LongPrototype.neq = LongPrototype.notEquals, LongPrototype.ne = LongPrototype.notEquals, LongPrototype.lessThan = function(e) {
        return this.comp(e) < 0
    }, LongPrototype.lt = LongPrototype.lessThan, LongPrototype.lessThanOrEqual = function(e) {
        return this.comp(e) <= 0
    }, LongPrototype.lte = LongPrototype.lessThanOrEqual, LongPrototype.le = LongPrototype.lessThanOrEqual, LongPrototype.greaterThan = function(e) {
        return 0 < this.comp(e)
    }, LongPrototype.gt = LongPrototype.greaterThan, LongPrototype.greaterThanOrEqual = function(e) {
        return 0 <= this.comp(e)
    }, LongPrototype.gte = LongPrototype.greaterThanOrEqual, LongPrototype.ge = LongPrototype.greaterThanOrEqual, LongPrototype.compare = function(e) {
        if (isLong(e) || (e = fromValue(e)), this.eq(e)) return 0;
        var t = this.isNegative(),
            r = e.isNegative();
        return t && !r ? -1 : !t && r ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high === this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(e).isNegative() ? -1 : 1
    }, LongPrototype.comp = LongPrototype.compare, LongPrototype.negate = function() {
        return !this.unsigned && this.eq(MIN_VALUE) ? MIN_VALUE : this.not().add(ONE)
    }, LongPrototype.neg = LongPrototype.negate, LongPrototype.add = function(e) {
        isLong(e) || (e = fromValue(e));
        var t = this.high >>> 16,
            r = 65535 & this.high,
            n = this.low >>> 16,
            o = 65535 & this.low,
            i = e.high >>> 16,
            s = 65535 & e.high,
            u = e.low >>> 16,
            a = 0,
            c = 0,
            f = 0,
            h = 0;
        return f += (h += o + (65535 & e.low)) >>> 16, c += (f += n + u) >>> 16, a += (c += r + s) >>> 16, a += t + i, fromBits((f &= 65535) << 16 | (h &= 65535), (a &= 65535) << 16 | (c &= 65535), this.unsigned)
    }, LongPrototype.subtract = function(e) {
        return isLong(e) || (e = fromValue(e)), this.add(e.neg())
    }, LongPrototype.sub = LongPrototype.subtract, LongPrototype.multiply = function(e) {
        if (this.isZero()) return ZERO;
        if (isLong(e) || (e = fromValue(e)), wasm) return fromBits(wasm.mul(this.low, this.high, e.low, e.high), wasm.get_high(), this.unsigned);
        if (e.isZero()) return ZERO;
        if (this.eq(MIN_VALUE)) return e.isOdd() ? MIN_VALUE : ZERO;
        if (e.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
        if (this.isNegative()) return e.isNegative() ? this.neg().mul(e.neg()) : this.neg().mul(e).neg();
        if (e.isNegative()) return this.mul(e.neg()).neg();
        if (this.lt(TWO_PWR_24) && e.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * e.toNumber(), this.unsigned);
        var t = this.high >>> 16,
            r = 65535 & this.high,
            n = this.low >>> 16,
            o = 65535 & this.low,
            i = e.high >>> 16,
            s = 65535 & e.high,
            u = e.low >>> 16,
            a = 65535 & e.low,
            c = 0,
            f = 0,
            h = 0,
            l = 0;
        return h += (l += o * a) >>> 16, f += (h += n * a) >>> 16, h &= 65535, f += (h += o * u) >>> 16, c += (f += r * a) >>> 16, f &= 65535, c += (f += n * u) >>> 16, f &= 65535, c += (f += o * s) >>> 16, c += t * a + r * u + n * s + o * i, fromBits((h &= 65535) << 16 | (l &= 65535), (c &= 65535) << 16 | (f &= 65535), this.unsigned)
    }, LongPrototype.mul = LongPrototype.multiply, LongPrototype.divide = function(e) {
        if (isLong(e) || (e = fromValue(e)), e.isZero()) throw Error("division by zero");
        var t, r, n;
        if (wasm) return this.unsigned || -2147483648 !== this.high || -1 !== e.low || -1 !== e.high ? fromBits((this.unsigned ? wasm.div_u : wasm.div_s)(this.low, this.high, e.low, e.high), wasm.get_high(), this.unsigned) : this;
        if (this.isZero()) return this.unsigned ? UZERO : ZERO;
        if (this.unsigned) {
            if (e.unsigned || (e = e.toUnsigned()), e.gt(this)) return UZERO;
            if (e.gt(this.shru(1))) return UONE;
            n = UZERO
        } else {
            if (this.eq(MIN_VALUE)) return e.eq(ONE) || e.eq(NEG_ONE) ? MIN_VALUE : e.eq(MIN_VALUE) ? ONE : (t = this.shr(1).div(e).shl(1)).eq(ZERO) ? e.isNegative() ? ONE : NEG_ONE : (r = this.sub(e.mul(t)), n = t.add(r.div(e)));
            else if (e.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
            if (this.isNegative()) return e.isNegative() ? this.neg().div(e.neg()) : this.neg().div(e).neg();
            if (e.isNegative()) return this.div(e.neg()).neg();
            n = ZERO
        }
        for (r = this; r.gte(e);) {
            t = Math.max(1, Math.floor(r.toNumber() / e.toNumber()));
            for (var o = Math.ceil(Math.log(t) / Math.LN2), i = o <= 48 ? 1 : pow_dbl(2, o - 48), s = fromNumber(t), u = s.mul(e); u.isNegative() || u.gt(r);) u = (s = fromNumber(t -= i, this.unsigned)).mul(e);
            s.isZero() && (s = ONE), n = n.add(s), r = r.sub(u)
        }
        return n
    }, LongPrototype.div = LongPrototype.divide, LongPrototype.modulo = function(e) {
        return isLong(e) || (e = fromValue(e)), wasm ? fromBits((this.unsigned ? wasm.rem_u : wasm.rem_s)(this.low, this.high, e.low, e.high), wasm.get_high(), this.unsigned) : this.sub(this.div(e).mul(e))
    }, LongPrototype.mod = LongPrototype.modulo, LongPrototype.rem = LongPrototype.modulo, LongPrototype.not = function() {
        return fromBits(~this.low, ~this.high, this.unsigned)
    }, LongPrototype.and = function(e) {
        return isLong(e) || (e = fromValue(e)), fromBits(this.low & e.low, this.high & e.high, this.unsigned)
    }, LongPrototype.or = function(e) {
        return isLong(e) || (e = fromValue(e)), fromBits(this.low | e.low, this.high | e.high, this.unsigned)
    }, LongPrototype.xor = function(e) {
        return isLong(e) || (e = fromValue(e)), fromBits(this.low ^ e.low, this.high ^ e.high, this.unsigned)
    }, LongPrototype.shiftLeft = function(e) {
        return isLong(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? fromBits(this.low << e, this.high << e | this.low >>> 32 - e, this.unsigned) : fromBits(0, this.low << e - 32, this.unsigned)
    }, LongPrototype.shl = LongPrototype.shiftLeft, LongPrototype.shiftRight = function(e) {
        return isLong(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? fromBits(this.low >>> e | this.high << 32 - e, this.high >> e, this.unsigned) : fromBits(this.high >> e - 32, 0 <= this.high ? 0 : -1, this.unsigned)
    }, LongPrototype.shr = LongPrototype.shiftRight, LongPrototype.shiftRightUnsigned = function(e) {
        if (isLong(e) && (e = e.toInt()), 0 === (e &= 63)) return this;
        var t = this.high;
        return e < 32 ? fromBits(this.low >>> e | t << 32 - e, t >>> e, this.unsigned) : fromBits(32 === e ? t : t >>> e - 32, 0, this.unsigned)
    }, LongPrototype.shru = LongPrototype.shiftRightUnsigned, LongPrototype.shr_u = LongPrototype.shiftRightUnsigned, LongPrototype.toSigned = function() {
        return this.unsigned ? fromBits(this.low, this.high, !1) : this
    }, LongPrototype.toUnsigned = function() {
        return this.unsigned ? this : fromBits(this.low, this.high, !0)
    }, LongPrototype.toBytes = function(e) {
        return e ? this.toBytesLE() : this.toBytesBE()
    }, LongPrototype.toBytesLE = function() {
        var e = this.high,
            t = this.low;
        return [255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24, 255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24]
    }, LongPrototype.toBytesBE = function() {
        var e = this.high,
            t = this.low;
        return [e >>> 24, e >>> 16 & 255, e >>> 8 & 255, 255 & e, t >>> 24, t >>> 16 & 255, t >>> 8 & 255, 255 & t]
    }, Long.fromBytes = function(e, t, r) {
        return r ? Long.fromBytesLE(e, t) : Long.fromBytesBE(e, t)
    }, Long.fromBytesLE = function(e, t) {
        return new Long(e[0] | e[1] << 8 | e[2] << 16 | e[3] << 24, e[4] | e[5] << 8 | e[6] << 16 | e[7] << 24, t)
    }, Long.fromBytesBE = function(e, t) {
        return new Long(e[4] << 24 | e[5] << 16 | e[6] << 8 | e[7], e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3], t)
    };
    for (var byteLength_1 = byteLength$1, toByteArray_1 = toByteArray$1, fromByteArray_1 = fromByteArray$1, lookup$1 = [], revLookup$1 = [], Arr$1 = "undefined" != typeof Uint8Array ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, len = code.length; i < len; ++i) lookup$1[i] = code[i], revLookup$1[code.charCodeAt(i)] = i;

    function getLens(e) {
        var t = e.length;
        if (0 < t % 4) throw new Error("Invalid string. Length must be a multiple of 4");
        var r = e.indexOf("=");
        return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4]
    }

    function byteLength$1(e) {
        var t = getLens(e),
            r = t[0],
            n = t[1];
        return 3 * (r + n) / 4 - n
    }

    function _byteLength(e, t, r) {
        return 3 * (t + r) / 4 - r
    }

    function toByteArray$1(e) {
        for (var t, r = getLens(e), n = r[0], o = r[1], i = new Arr$1(_byteLength(e, n, o)), s = 0, u = 0 < o ? n - 4 : n, a = 0; a < u; a += 4) t = revLookup$1[e.charCodeAt(a)] << 18 | revLookup$1[e.charCodeAt(a + 1)] << 12 | revLookup$1[e.charCodeAt(a + 2)] << 6 | revLookup$1[e.charCodeAt(a + 3)], i[s++] = t >> 16 & 255, i[s++] = t >> 8 & 255, i[s++] = 255 & t;
        return 2 === o && (t = revLookup$1[e.charCodeAt(a)] << 2 | revLookup$1[e.charCodeAt(a + 1)] >> 4, i[s++] = 255 & t), 1 === o && (t = revLookup$1[e.charCodeAt(a)] << 10 | revLookup$1[e.charCodeAt(a + 1)] << 4 | revLookup$1[e.charCodeAt(a + 2)] >> 2, i[s++] = t >> 8 & 255, i[s++] = 255 & t), i
    }

    function tripletToBase64$1(e) {
        return lookup$1[e >> 18 & 63] + lookup$1[e >> 12 & 63] + lookup$1[e >> 6 & 63] + lookup$1[63 & e]
    }

    function encodeChunk$1(e, t, r) {
        for (var n, o = [], i = t; i < r; i += 3) n = (e[i] << 16 & 16711680) + (e[i + 1] << 8 & 65280) + (255 & e[i + 2]), o.push(tripletToBase64$1(n));
        return o.join("")
    }

    function fromByteArray$1(e) {
        for (var t, r = e.length, n = r % 3, o = [], i = 0, s = r - n; i < s; i += 16383) o.push(encodeChunk$1(e, i, s < i + 16383 ? s : i + 16383));
        return 1 === n ? (t = e[r - 1], o.push(lookup$1[t >> 2] + lookup$1[t << 4 & 63] + "==")) : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], o.push(lookup$1[t >> 10] + lookup$1[t >> 4 & 63] + lookup$1[t << 2 & 63] + "=")), o.join("")
    }
    revLookup$1["-".charCodeAt(0)] = 62, revLookup$1["_".charCodeAt(0)] = 63;
    var base64Js = {
            byteLength: byteLength_1,
            toByteArray: toByteArray_1,
            fromByteArray: fromByteArray_1
        },
        read$1 = function(e, t, r, n, o) {
            var i, s, u = 8 * o - n - 1,
                a = (1 << u) - 1,
                c = a >> 1,
                f = -7,
                h = r ? o - 1 : 0,
                l = r ? -1 : 1,
                d = e[t + h];
            for (h += l, i = d & (1 << -f) - 1, d >>= -f, f += u; 0 < f; i = 256 * i + e[t + h], h += l, f -= 8);
            for (s = i & (1 << -f) - 1, i >>= -f, f += n; 0 < f; s = 256 * s + e[t + h], h += l, f -= 8);
            if (0 === i) i = 1 - c;
            else {
                if (i === a) return s ? NaN : 1 / 0 * (d ? -1 : 1);
                s += Math.pow(2, n), i -= c
            }
            return (d ? -1 : 1) * s * Math.pow(2, i - n)
        },
        write$1 = function(e, t, r, n, o, i) {
            var s, u, a, c = 8 * i - o - 1,
                f = (1 << c) - 1,
                h = f >> 1,
                l = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                d = n ? 0 : i - 1,
                p = n ? 1 : -1,
                y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (u = isNaN(t) ? 1 : 0, s = f) : (s = Math.floor(Math.log(t) / Math.LN2), t * (a = Math.pow(2, -s)) < 1 && (s--, a *= 2), 2 <= (t += 1 <= s + h ? l / a : l * Math.pow(2, 1 - h)) * a && (s++, a /= 2), f <= s + h ? (u = 0, s = f) : 1 <= s + h ? (u = (t * a - 1) * Math.pow(2, o), s += h) : (u = t * Math.pow(2, h - 1) * Math.pow(2, o), s = 0)); 8 <= o; e[r + d] = 255 & u, d += p, u /= 256, o -= 8);
            for (s = s << o | u, c += o; 0 < c; e[r + d] = 255 & s, d += p, s /= 256, c -= 8);
            e[r + d - p] |= 128 * y
        },
        ieee754 = {
            read: read$1,
            write: write$1
        },
        buffer = createCommonjsModule(function(e, r) {
            r.Buffer = h, r.SlowBuffer = function(e) {
                +e != e && (e = 0);
                return h.alloc(+e)
            }, r.INSPECT_MAX_BYTES = 50;
            var n = 2147483647;

            function s(e) {
                if (n < e) throw new RangeError('The value "' + e + '" is invalid for option "size"');
                var t = new Uint8Array(e);
                return t.__proto__ = h.prototype, t
            }

            function h(e, t, r) {
                if ("number" == typeof e) {
                    if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                    return i(e)
                }
                return o(e, t, r)
            }

            function o(e, t, r) {
                if ("string" == typeof e) return function(e, t) {
                    "string" == typeof t && "" !== t || (t = "utf8");
                    if (!h.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
                    var r = 0 | f(e, t),
                        n = s(r),
                        o = n.write(e, t);
                    o !== r && (n = n.slice(0, o));
                    return n
                }(e, t);
                if (ArrayBuffer.isView(e)) return a(e);
                if (null == e) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                if ($(e, ArrayBuffer) || e && $(e.buffer, ArrayBuffer)) return function(e, t, r) {
                    if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
                    if (e.byteLength < t + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
                    var n;
                    n = void 0 === t && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, t) : new Uint8Array(e, t, r);
                    return n.__proto__ = h.prototype, n
                }(e, t, r);
                if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
                var n = e.valueOf && e.valueOf();
                if (null != n && n !== e) return h.from(n, t, r);
                var o = function(e) {
                    if (h.isBuffer(e)) {
                        var t = 0 | c(e.length),
                            r = s(t);
                        return 0 === r.length || e.copy(r, 0, 0, t), r
                    }
                    if (void 0 !== e.length) return "number" != typeof e.length || U(e.length) ? s(0) : a(e);
                    if ("Buffer" === e.type && Array.isArray(e.data)) return a(e.data)
                }(e);
                if (o) return o;
                if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return h.from(e[Symbol.toPrimitive]("string"), t, r);
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
            }

            function u(e) {
                if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
                if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
            }

            function i(e) {
                return u(e), s(e < 0 ? 0 : 0 | c(e))
            }

            function a(e) {
                for (var t = e.length < 0 ? 0 : 0 | c(e.length), r = s(t), n = 0; n < t; n += 1) r[n] = 255 & e[n];
                return r
            }

            function c(e) {
                if (n <= e) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n.toString(16) + " bytes");
                return 0 | e
            }

            function f(e, t) {
                if (h.isBuffer(e)) return e.length;
                if (ArrayBuffer.isView(e) || $(e, ArrayBuffer)) return e.byteLength;
                if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
                var r = e.length,
                    n = 2 < arguments.length && !0 === arguments[2];
                if (!n && 0 === r) return 0;
                for (var o = !1;;) switch (t) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return r;
                    case "utf8":
                    case "utf-8":
                        return B(e).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * r;
                    case "hex":
                        return r >>> 1;
                    case "base64":
                        return P(e).length;
                    default:
                        if (o) return n ? -1 : B(e).length;
                        t = ("" + t).toLowerCase(), o = !0
                }
            }

            function l(e, t, r) {
                var n = e[t];
                e[t] = e[r], e[r] = n
            }

            function d(e, t, r, n, o) {
                if (0 === e.length) return -1;
                if ("string" == typeof r ? (n = r, r = 0) : 2147483647 < r ? r = 2147483647 : r < -2147483648 && (r = -2147483648), U(r = +r) && (r = o ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
                    if (o) return -1;
                    r = e.length - 1
                } else if (r < 0) {
                    if (!o) return -1;
                    r = 0
                }
                if ("string" == typeof t && (t = h.from(t, n)), h.isBuffer(t)) return 0 === t.length ? -1 : p(e, t, r, n, o);
                if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : p(e, [t], r, n, o);
                throw new TypeError("val must be string, number or Buffer")
            }

            function p(e, t, r, n, o) {
                var i, s = 1,
                    u = e.length,
                    a = t.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                    if (e.length < 2 || t.length < 2) return -1;
                    u /= s = 2, a /= 2, r /= 2
                }

                function c(e, t) {
                    return 1 === s ? e[t] : e.readUInt16BE(t * s)
                }
                if (o) {
                    var f = -1;
                    for (i = r; i < u; i++)
                        if (c(e, i) === c(t, -1 === f ? 0 : i - f)) {
                            if (-1 === f && (f = i), i - f + 1 === a) return f * s
                        } else -1 !== f && (i -= i - f), f = -1
                } else
                    for (u < r + a && (r = u - a), i = r; 0 <= i; i--) {
                        for (var h = !0, l = 0; l < a; l++)
                            if (c(e, i + l) !== c(t, l)) {
                                h = !1;
                                break
                            } if (h) return i
                    }
                return -1
            }

            function y(e, t, r, n) {
                r = Number(r) || 0;
                var o = e.length - r;
                n ? o < (n = Number(n)) && (n = o) : n = o;
                var i = t.length;
                i / 2 < n && (n = i / 2);
                for (var s = 0; s < n; ++s) {
                    var u = parseInt(t.substr(2 * s, 2), 16);
                    if (U(u)) return s;
                    e[r + s] = u
                }
                return s
            }

            function g(e, t, r, n) {
                return C(function(e) {
                    for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                    return t
                }(t), e, r, n)
            }

            function v(e, t, r) {
                return 0 === t && r === e.length ? base64Js.fromByteArray(e) : base64Js.fromByteArray(e.slice(t, r))
            }

            function m(e, t, r) {
                r = Math.min(e.length, r);
                for (var n = [], o = t; o < r;) {
                    var i, s, u, a, c = e[o],
                        f = null,
                        h = 239 < c ? 4 : 223 < c ? 3 : 191 < c ? 2 : 1;
                    if (o + h <= r) switch (h) {
                        case 1:
                            c < 128 && (f = c);
                            break;
                        case 2:
                            128 == (192 & (i = e[o + 1])) && 127 < (a = (31 & c) << 6 | 63 & i) && (f = a);
                            break;
                        case 3:
                            i = e[o + 1], s = e[o + 2], 128 == (192 & i) && 128 == (192 & s) && 2047 < (a = (15 & c) << 12 | (63 & i) << 6 | 63 & s) && (a < 55296 || 57343 < a) && (f = a);
                            break;
                        case 4:
                            i = e[o + 1], s = e[o + 2], u = e[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & u) && 65535 < (a = (15 & c) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & u) && a < 1114112 && (f = a)
                    }
                    null === f ? (f = 65533, h = 1) : 65535 < f && (f -= 65536, n.push(f >>> 10 & 1023 | 55296), f = 56320 | 1023 & f), n.push(f), o += h
                }
                return function(e) {
                    var t = e.length;
                    if (t <= _) return String.fromCharCode.apply(String, e);
                    var r = "",
                        n = 0;
                    for (; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += _));
                    return r
                }(n)
            }
            r.kMaxLength = n, (h.TYPED_ARRAY_SUPPORT = function() {
                try {
                    var e = new Uint8Array(1);
                    return e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    }, 42 === e.foo()
                } catch (e) {
                    return !1
                }
            }()) || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(h.prototype, "parent", {
                enumerable: !0,
                get: function() {
                    if (h.isBuffer(this)) return this.buffer
                }
            }), Object.defineProperty(h.prototype, "offset", {
                enumerable: !0,
                get: function() {
                    if (h.isBuffer(this)) return this.byteOffset
                }
            }), "undefined" != typeof Symbol && null != Symbol.species && h[Symbol.species] === h && Object.defineProperty(h, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1
            }), h.poolSize = 8192, h.from = function(e, t, r) {
                return o(e, t, r)
            }, h.prototype.__proto__ = Uint8Array.prototype, h.__proto__ = Uint8Array, h.alloc = function(e, t, r) {
                return o = t, i = r, u(n = e), n <= 0 ? s(n) : void 0 !== o ? "string" == typeof i ? s(n).fill(o, i) : s(n).fill(o) : s(n);
                var n, o, i
            }, h.allocUnsafe = function(e) {
                return i(e)
            }, h.allocUnsafeSlow = function(e) {
                return i(e)
            }, h.isBuffer = function(e) {
                return null != e && !0 === e._isBuffer && e !== h.prototype
            }, h.compare = function(e, t) {
                if ($(e, Uint8Array) && (e = h.from(e, e.offset, e.byteLength)), $(t, Uint8Array) && (t = h.from(t, t.offset, t.byteLength)), !h.isBuffer(e) || !h.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                if (e === t) return 0;
                for (var r = e.length, n = t.length, o = 0, i = Math.min(r, n); o < i; ++o)
                    if (e[o] !== t[o]) {
                        r = e[o], n = t[o];
                        break
                    } return r < n ? -1 : n < r ? 1 : 0
            }, h.isEncoding = function(e) {
                switch (String(e).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, h.concat = function(e, t) {
                if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === e.length) return h.alloc(0);
                var r;
                if (void 0 === t)
                    for (r = t = 0; r < e.length; ++r) t += e[r].length;
                var n = h.allocUnsafe(t),
                    o = 0;
                for (r = 0; r < e.length; ++r) {
                    var i = e[r];
                    if ($(i, Uint8Array) && (i = h.from(i)), !h.isBuffer(i)) throw new TypeError('"list" argument must be an Array of Buffers');
                    i.copy(n, o), o += i.length
                }
                return n
            }, h.byteLength = f, h.prototype._isBuffer = !0, h.prototype.swap16 = function() {
                var e = this.length;
                if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var t = 0; t < e; t += 2) l(this, t, t + 1);
                return this
            }, h.prototype.swap32 = function() {
                var e = this.length;
                if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var t = 0; t < e; t += 4) l(this, t, t + 3), l(this, t + 1, t + 2);
                return this
            }, h.prototype.swap64 = function() {
                var e = this.length;
                if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var t = 0; t < e; t += 8) l(this, t, t + 7), l(this, t + 1, t + 6), l(this, t + 2, t + 5), l(this, t + 3, t + 4);
                return this
            }, h.prototype.toLocaleString = h.prototype.toString = function() {
                var e = this.length;
                return 0 === e ? "" : 0 === arguments.length ? m(this, 0, e) : function(e, t, r) {
                    var n = !1;
                    if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                    if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                    if ((r >>>= 0) <= (t >>>= 0)) return "";
                    for (e || (e = "utf8");;) switch (e) {
                        case "hex":
                            return b(this, t, r);
                        case "utf8":
                        case "utf-8":
                            return m(this, t, r);
                        case "ascii":
                            return E(this, t, r);
                        case "latin1":
                        case "binary":
                            return A(this, t, r);
                        case "base64":
                            return v(this, t, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return w(this, t, r);
                        default:
                            if (n) throw new TypeError("Unknown encoding: " + e);
                            e = (e + "").toLowerCase(), n = !0
                    }
                }.apply(this, arguments)
            }, h.prototype.equals = function(e) {
                if (!h.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === h.compare(this, e)
            }, h.prototype.inspect = function() {
                var e = "",
                    t = r.INSPECT_MAX_BYTES;
                return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">"
            }, h.prototype.compare = function(e, t, r, n, o) {
                if ($(e, Uint8Array) && (e = h.from(e, e.offset, e.byteLength)), !h.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
                if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === o && (o = this.length), t < 0 || r > e.length || n < 0 || o > this.length) throw new RangeError("out of range index");
                if (o <= n && r <= t) return 0;
                if (o <= n) return -1;
                if (r <= t) return 1;
                if (this === e) return 0;
                for (var i = (o >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (t >>>= 0), u = Math.min(i, s), a = this.slice(n, o), c = e.slice(t, r), f = 0; f < u; ++f)
                    if (a[f] !== c[f]) {
                        i = a[f], s = c[f];
                        break
                    } return i < s ? -1 : s < i ? 1 : 0
            }, h.prototype.includes = function(e, t, r) {
                return -1 !== this.indexOf(e, t, r)
            }, h.prototype.indexOf = function(e, t, r) {
                return d(this, e, t, r, !0)
            }, h.prototype.lastIndexOf = function(e, t, r) {
                return d(this, e, t, r, !1)
            }, h.prototype.write = function(e, t, r, n) {
                if (void 0 === t) n = "utf8", r = this.length, t = 0;
                else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;
                else {
                    if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    t >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                }
                var o = this.length - t;
                if ((void 0 === r || o < r) && (r = o), 0 < e.length && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");
                for (var i, s, u, a, c, f, h, l, d, p = !1;;) switch (n) {
                    case "hex":
                        return y(this, e, t, r);
                    case "utf8":
                    case "utf-8":
                        return l = t, d = r, C(B(e, (h = this).length - l), h, l, d);
                    case "ascii":
                        return g(this, e, t, r);
                    case "latin1":
                    case "binary":
                        return g(this, e, t, r);
                    case "base64":
                        return a = this, c = t, f = r, C(P(e), a, c, f);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return s = t, u = r, C(function(e, t) {
                            for (var r, n, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) r = e.charCodeAt(s), n = r >> 8, o = r % 256, i.push(o), i.push(n);
                            return i
                        }(e, (i = this).length - s), i, s, u);
                    default:
                        if (p) throw new TypeError("Unknown encoding: " + n);
                        n = ("" + n).toLowerCase(), p = !0
                }
            }, h.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };
            var _ = 4096;

            function E(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var o = t; o < r; ++o) n += String.fromCharCode(127 & e[o]);
                return n
            }

            function A(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var o = t; o < r; ++o) n += String.fromCharCode(e[o]);
                return n
            }

            function b(e, t, r) {
                var n = e.length;
                (!t || t < 0) && (t = 0), (!r || r < 0 || n < r) && (r = n);
                for (var o = "", i = t; i < r; ++i) o += I(e[i]);
                return o
            }

            function w(e, t, r) {
                for (var n = e.slice(t, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
                return o
            }

            function S(e, t, r) {
                if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                if (r < e + t) throw new RangeError("Trying to access beyond buffer length")
            }

            function R(e, t, r, n, o, i) {
                if (!h.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (o < t || t < i) throw new RangeError('"value" argument is out of bounds');
                if (r + n > e.length) throw new RangeError("Index out of range")
            }

            function T(e, t, r, n, o, i) {
                if (r + n > e.length) throw new RangeError("Index out of range");
                if (r < 0) throw new RangeError("Index out of range")
            }

            function O(e, t, r, n, o) {
                return t = +t, r >>>= 0, o || T(e, 0, r, 4), ieee754.write(e, t, r, n, 23, 4), r + 4
            }

            function N(e, t, r, n, o) {
                return t = +t, r >>>= 0, o || T(e, 0, r, 8), ieee754.write(e, t, r, n, 52, 8), r + 8
            }
            h.prototype.slice = function(e, t) {
                var r = this.length;
                (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : r < e && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : r < t && (t = r), t < e && (t = e);
                var n = this.subarray(e, t);
                return n.__proto__ = h.prototype, n
            }, h.prototype.readUIntLE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || S(e, t, this.length);
                for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
                return n
            }, h.prototype.readUIntBE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || S(e, t, this.length);
                for (var n = this[e + --t], o = 1; 0 < t && (o *= 256);) n += this[e + --t] * o;
                return n
            }, h.prototype.readUInt8 = function(e, t) {
                return e >>>= 0, t || S(e, 1, this.length), this[e]
            }, h.prototype.readUInt16LE = function(e, t) {
                return e >>>= 0, t || S(e, 2, this.length), this[e] | this[e + 1] << 8
            }, h.prototype.readUInt16BE = function(e, t) {
                return e >>>= 0, t || S(e, 2, this.length), this[e] << 8 | this[e + 1]
            }, h.prototype.readUInt32LE = function(e, t) {
                return e >>>= 0, t || S(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }, h.prototype.readUInt32BE = function(e, t) {
                return e >>>= 0, t || S(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }, h.prototype.readIntLE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || S(e, t, this.length);
                for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
                return (o *= 128) <= n && (n -= Math.pow(2, 8 * t)), n
            }, h.prototype.readIntBE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || S(e, t, this.length);
                for (var n = t, o = 1, i = this[e + --n]; 0 < n && (o *= 256);) i += this[e + --n] * o;
                return (o *= 128) <= i && (i -= Math.pow(2, 8 * t)), i
            }, h.prototype.readInt8 = function(e, t) {
                return e >>>= 0, t || S(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            }, h.prototype.readInt16LE = function(e, t) {
                e >>>= 0, t || S(e, 2, this.length);
                var r = this[e] | this[e + 1] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, h.prototype.readInt16BE = function(e, t) {
                e >>>= 0, t || S(e, 2, this.length);
                var r = this[e + 1] | this[e] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, h.prototype.readInt32LE = function(e, t) {
                return e >>>= 0, t || S(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }, h.prototype.readInt32BE = function(e, t) {
                return e >>>= 0, t || S(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }, h.prototype.readFloatLE = function(e, t) {
                return e >>>= 0, t || S(e, 4, this.length), ieee754.read(this, e, !0, 23, 4)
            }, h.prototype.readFloatBE = function(e, t) {
                return e >>>= 0, t || S(e, 4, this.length), ieee754.read(this, e, !1, 23, 4)
            }, h.prototype.readDoubleLE = function(e, t) {
                return e >>>= 0, t || S(e, 8, this.length), ieee754.read(this, e, !0, 52, 8)
            }, h.prototype.readDoubleBE = function(e, t) {
                return e >>>= 0, t || S(e, 8, this.length), ieee754.read(this, e, !1, 52, 8)
            }, h.prototype.writeUIntLE = function(e, t, r, n) {
                (e = +e, t >>>= 0, r >>>= 0, n) || R(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                var o = 1,
                    i = 0;
                for (this[t] = 255 & e; ++i < r && (o *= 256);) this[t + i] = e / o & 255;
                return t + r
            }, h.prototype.writeUIntBE = function(e, t, r, n) {
                (e = +e, t >>>= 0, r >>>= 0, n) || R(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                var o = r - 1,
                    i = 1;
                for (this[t + o] = 255 & e; 0 <= --o && (i *= 256);) this[t + o] = e / i & 255;
                return t + r
            }, h.prototype.writeUInt8 = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
            }, h.prototype.writeUInt16LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
            }, h.prototype.writeUInt16BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
            }, h.prototype.writeUInt32LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
            }, h.prototype.writeUInt32BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
            }, h.prototype.writeIntLE = function(e, t, r, n) {
                if (e = +e, t >>>= 0, !n) {
                    var o = Math.pow(2, 8 * r - 1);
                    R(this, e, t, r, o - 1, -o)
                }
                var i = 0,
                    s = 1,
                    u = 0;
                for (this[t] = 255 & e; ++i < r && (s *= 256);) e < 0 && 0 === u && 0 !== this[t + i - 1] && (u = 1), this[t + i] = (e / s >> 0) - u & 255;
                return t + r
            }, h.prototype.writeIntBE = function(e, t, r, n) {
                if (e = +e, t >>>= 0, !n) {
                    var o = Math.pow(2, 8 * r - 1);
                    R(this, e, t, r, o - 1, -o)
                }
                var i = r - 1,
                    s = 1,
                    u = 0;
                for (this[t + i] = 255 & e; 0 <= --i && (s *= 256);) e < 0 && 0 === u && 0 !== this[t + i + 1] && (u = 1), this[t + i] = (e / s >> 0) - u & 255;
                return t + r
            }, h.prototype.writeInt8 = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
            }, h.prototype.writeInt16LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
            }, h.prototype.writeInt16BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
            }, h.prototype.writeInt32LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
            }, h.prototype.writeInt32BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
            }, h.prototype.writeFloatLE = function(e, t, r) {
                return O(this, e, t, !0, r)
            }, h.prototype.writeFloatBE = function(e, t, r) {
                return O(this, e, t, !1, r)
            }, h.prototype.writeDoubleLE = function(e, t, r) {
                return N(this, e, t, !0, r)
            }, h.prototype.writeDoubleBE = function(e, t, r) {
                return N(this, e, t, !1, r)
            }, h.prototype.copy = function(e, t, r, n) {
                if (!h.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), 0 < n && n < r && (n = r), n === r) return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (t < 0) throw new RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
                if (n < 0) throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
                var o = n - r;
                if (this === e && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(t, r, n);
                else if (this === e && r < t && t < n)
                    for (var i = o - 1; 0 <= i; --i) e[i + t] = this[i + r];
                else Uint8Array.prototype.set.call(e, this.subarray(r, n), t);
                return o
            }, h.prototype.fill = function(e, t, r, n) {
                if ("string" == typeof e) {
                    if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                    if ("string" == typeof n && !h.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                    if (1 === e.length) {
                        var o = e.charCodeAt(0);
                        ("utf8" === n && o < 128 || "latin1" === n) && (e = o)
                    }
                } else "number" == typeof e && (e &= 255);
                if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
                if (r <= t) return this;
                var i;
                if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e)
                    for (i = t; i < r; ++i) this[i] = e;
                else {
                    var s = h.isBuffer(e) ? e : h.from(e, n),
                        u = s.length;
                    if (0 === u) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                    for (i = 0; i < r - t; ++i) this[i + t] = s[i % u]
                }
                return this
            };
            var t = /[^+/0-9A-Za-z-_]/g;

            function I(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16)
            }

            function B(e, t) {
                var r;
                t = t || 1 / 0;
                for (var n = e.length, o = null, i = [], s = 0; s < n; ++s) {
                    if (55295 < (r = e.charCodeAt(s)) && r < 57344) {
                        if (!o) {
                            if (56319 < r) {
                                -1 < (t -= 3) && i.push(239, 191, 189);
                                continue
                            }
                            if (s + 1 === n) {
                                -1 < (t -= 3) && i.push(239, 191, 189);
                                continue
                            }
                            o = r;
                            continue
                        }
                        if (r < 56320) {
                            -1 < (t -= 3) && i.push(239, 191, 189), o = r;
                            continue
                        }
                        r = 65536 + (o - 55296 << 10 | r - 56320)
                    } else o && -1 < (t -= 3) && i.push(239, 191, 189);
                    if (o = null, r < 128) {
                        if ((t -= 1) < 0) break;
                        i.push(r)
                    } else if (r < 2048) {
                        if ((t -= 2) < 0) break;
                        i.push(r >> 6 | 192, 63 & r | 128)
                    } else if (r < 65536) {
                        if ((t -= 3) < 0) break;
                        i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                    } else {
                        if (!(r < 1114112)) throw new Error("Invalid code point");
                        if ((t -= 4) < 0) break;
                        i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                    }
                }
                return i
            }

            function P(e) {
                return base64Js.toByteArray(function(e) {
                    if ((e = (e = e.split("=")[0]).trim().replace(t, "")).length < 2) return "";
                    for (; e.length % 4 != 0;) e += "=";
                    return e
                }(e))
            }

            function C(e, t, r, n) {
                for (var o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o) t[o + r] = e[o];
                return o
            }

            function $(e, t) {
                return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
            }

            function U(e) {
                return e != e
            }
        }),
        buffer_1 = buffer.Buffer,
        buffer_2 = buffer.SlowBuffer,
        buffer_3 = buffer.INSPECT_MAX_BYTES,
        buffer_4 = buffer.kMaxLength,
        commonjsGlobal$1 = "undefined" != typeof window ? window : void 0 !== global$1 ? global$1 : "undefined" != typeof self ? self : {};

    function createCommonjsModule$1(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }
    var map = createCommonjsModule$1(function(e) {
            if (void 0 !== commonjsGlobal$1.Map) e.exports = commonjsGlobal$1.Map, e.exports.Map = commonjsGlobal$1.Map;
            else {
                var t = function(e) {
                    this._keys = [], this._values = {};
                    for (var t = 0; t < e.length; t++)
                        if (null != e[t]) {
                            var r = e[t],
                                n = r[0],
                                o = r[1];
                            this._keys.push(n), this._values[n] = {
                                v: o,
                                i: this._keys.length - 1
                            }
                        }
                };
                t.prototype.clear = function() {
                    this._keys = [], this._values = {}
                }, t.prototype.delete = function(e) {
                    var t = this._values[e];
                    return null != t && (delete this._values[e], this._keys.splice(t.i, 1), !0)
                }, t.prototype.entries = function() {
                    var t = this,
                        r = 0;
                    return {
                        next: function() {
                            var e = t._keys[r++];
                            return {
                                value: void 0 !== e ? [e, t._values[e].v] : void 0,
                                done: void 0 === e
                            }
                        }
                    }
                }, t.prototype.forEach = function(e, t) {
                    t = t || this;
                    for (var r = 0; r < this._keys.length; r++) {
                        var n = this._keys[r];
                        e.call(t, this._values[n].v, n, t)
                    }
                }, t.prototype.get = function(e) {
                    return this._values[e] ? this._values[e].v : void 0
                }, t.prototype.has = function(e) {
                    return null != this._values[e]
                }, t.prototype.keys = function() {
                    var t = this,
                        r = 0;
                    return {
                        next: function() {
                            var e = t._keys[r++];
                            return {
                                value: void 0 !== e ? e : void 0,
                                done: void 0 === e
                            }
                        }
                    }
                }, t.prototype.set = function(e, t) {
                    return this._values[e] ? this._values[e].v = t : (this._keys.push(e), this._values[e] = {
                        v: t,
                        i: this._keys.length - 1
                    }), this
                }, t.prototype.values = function() {
                    var t = this,
                        r = 0;
                    return {
                        next: function() {
                            var e = t._keys[r++];
                            return {
                                value: void 0 !== e ? t._values[e].v : void 0,
                                done: void 0 === e
                            }
                        }
                    }
                }, Object.defineProperty(t.prototype, "size", {
                    enumerable: !0,
                    get: function() {
                        return this._keys.length
                    }
                }), e.exports = t
            }
        }),
        map_1 = map.Map;
    long_1.prototype.toExtendedJSON = function(e) {
        return e && e.relaxed ? this.toNumber() : {
            $numberLong: this.toString()
        }
    }, long_1.fromExtendedJSON = function(e, t) {
        var r = long_1.fromString(e.$numberLong);
        return t && t.relaxed ? r.toNumber() : r
    }, Object.defineProperty(long_1.prototype, "_bsontype", {
        value: "Long"
    });
    var long_1$1 = long_1;

    function _classCallCheck(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass(e, t, r) {
        return t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e
    }
    var Double = function() {
        function r(e) {
            _classCallCheck(this, r), this.value = e
        }
        return _createClass(r, [{
            key: "valueOf",
            value: function() {
                return this.value
            }
        }, {
            key: "toJSON",
            value: function() {
                return this.value
            }
        }, {
            key: "toExtendedJSON",
            value: function(e) {
                return e && e.relaxed && isFinite(this.value) ? this.value : {
                    $numberDouble: this.value.toString()
                }
            }
        }], [{
            key: "fromExtendedJSON",
            value: function(e, t) {
                return t && t.relaxed ? parseFloat(e.$numberDouble) : new r(parseFloat(e.$numberDouble))
            }
        }]), r
    }();
    Object.defineProperty(Double.prototype, "_bsontype", {
        value: "Double"
    });
    var double_1 = Double;

    function _typeof(e) {
        return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function _classCallCheck$1(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$1(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$1(e, t, r) {
        return t && _defineProperties$1(e.prototype, t), r && _defineProperties$1(e, r), e
    }

    function _possibleConstructorReturn(e, t) {
        return !t || "object" !== _typeof(t) && "function" != typeof t ? _assertThisInitialized(e) : t
    }

    function _assertThisInitialized(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function _getPrototypeOf(e) {
        return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function _inherits(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), t && _setPrototypeOf(e, t)
    }

    function _setPrototypeOf(e, t) {
        return (_setPrototypeOf = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var Timestamp = function(e) {
        function r(e, t) {
            return _classCallCheck$1(this, r), _possibleConstructorReturn(long_1$1.isLong(e) ? _possibleConstructorReturn(this, _getPrototypeOf(r).call(this, e.low, e.high)) : _possibleConstructorReturn(this, _getPrototypeOf(r).call(this, e, t)))
        }
        return _inherits(r, long_1$1), _createClass$1(r, [{
            key: "toJSON",
            value: function() {
                return {
                    $timestamp: this.toString()
                }
            }
        }, {
            key: "toExtendedJSON",
            value: function() {
                return {
                    $timestamp: {
                        t: this.high,
                        i: this.low
                    }
                }
            }
        }], [{
            key: "fromInt",
            value: function(e) {
                return new r(long_1$1.fromInt(e))
            }
        }, {
            key: "fromNumber",
            value: function(e) {
                return new r(long_1$1.fromNumber(e))
            }
        }, {
            key: "fromBits",
            value: function(e, t) {
                return new r(e, t)
            }
        }, {
            key: "fromString",
            value: function(e, t) {
                return new r(long_1$1.fromString(e, t))
            }
        }, {
            key: "fromExtendedJSON",
            value: function(e) {
                return new r(e.$timestamp.i, e.$timestamp.t)
            }
        }]), r
    }();
    Object.defineProperty(Timestamp.prototype, "_bsontype", {
        value: "Timestamp"
    });
    var timestamp = Timestamp,
        require$$0 = {};

    function normalizedFunctionString(e) {
        return e.toString().replace("function(", "function (")
    }

    function insecureRandomBytes(e) {
        for (var t = new Uint8Array(e), r = 0; r < e; ++r) t[r] = Math.floor(256 * Math.random());
        return t
    }
    var randomBytes = insecureRandomBytes;
    if ("undefined" != typeof window && window.crypto && window.crypto.getRandomValues) randomBytes = function(e) {
        return window.crypto.getRandomValues(new Uint8Array(e))
    };
    else {
        try {
            randomBytes = require$$0.randomBytes
        } catch (e) {}
        null == randomBytes && (randomBytes = insecureRandomBytes)
    }
    var utils = {
        normalizedFunctionString: normalizedFunctionString,
        randomBytes: randomBytes
    };

    function defaultSetTimout() {
        throw new Error("setTimeout has not been defined")
    }

    function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined")
    }
    var cachedSetTimeout = defaultSetTimout,
        cachedClearTimeout = defaultClearTimeout;

    function runTimeout(t) {
        if (cachedSetTimeout === setTimeout) return setTimeout(t, 0);
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, setTimeout(t, 0);
        try {
            return cachedSetTimeout(t, 0)
        } catch (e) {
            try {
                return cachedSetTimeout.call(null, t, 0)
            } catch (e) {
                return cachedSetTimeout.call(this, t, 0)
            }
        }
    }

    function runClearTimeout(t) {
        if (cachedClearTimeout === clearTimeout) return clearTimeout(t);
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, clearTimeout(t);
        try {
            return cachedClearTimeout(t)
        } catch (e) {
            try {
                return cachedClearTimeout.call(null, t)
            } catch (e) {
                return cachedClearTimeout.call(this, t)
            }
        }
    }
    "function" == typeof global$1.setTimeout && (cachedSetTimeout = setTimeout), "function" == typeof global$1.clearTimeout && (cachedClearTimeout = clearTimeout);
    var queue = [],
        draining = !1,
        currentQueue, queueIndex = -1;

    function cleanUpNextTick() {
        draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue())
    }

    function drainQueue() {
        if (!draining) {
            var e = runTimeout(cleanUpNextTick);
            draining = !0;
            for (var t = queue.length; t;) {
                for (currentQueue = queue, queue = []; ++queueIndex < t;) currentQueue && currentQueue[queueIndex].run();
                queueIndex = -1, t = queue.length
            }
            currentQueue = null, draining = !1, runClearTimeout(e)
        }
    }

    function nextTick(e) {
        var t = new Array(arguments.length - 1);
        if (1 < arguments.length)
            for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        queue.push(new Item(e, t)), 1 !== queue.length || draining || runTimeout(drainQueue)
    }

    function Item(e, t) {
        this.fun = e, this.array = t
    }
    Item.prototype.run = function() {
        this.fun.apply(null, this.array)
    };
    var title = "browser",
        platform = "browser",
        browser = !0,
        env = {},
        argv = [],
        version = "",
        versions = {},
        release = {},
        config = {};

    function noop() {}
    var on = noop,
        addListener = noop,
        once = noop,
        off = noop,
        removeListener = noop,
        removeAllListeners = noop,
        emit = noop;

    function binding(e) {
        throw new Error("process.binding is not supported")
    }

    function cwd() {
        return "/"
    }

    function chdir(e) {
        throw new Error("process.chdir is not supported")
    }

    function umask() {
        return 0
    }
    var performance = global$1.performance || {},
        performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
            return (new Date).getTime()
        };

    function hrtime(e) {
        var t = .001 * performanceNow.call(performance),
            r = Math.floor(t),
            n = Math.floor(t % 1 * 1e9);
        return e && (r -= e[0], (n -= e[1]) < 0 && (r--, n += 1e9)), [r, n]
    }
    var startTime = new Date;

    function uptime() {
        return (new Date - startTime) / 1e3
    }
    var process = {
            nextTick: nextTick,
            title: title,
            browser: browser,
            env: env,
            argv: argv,
            version: version,
            versions: versions,
            on: on,
            addListener: addListener,
            once: once,
            off: off,
            removeListener: removeListener,
            removeAllListeners: removeAllListeners,
            emit: emit,
            binding: binding,
            cwd: cwd,
            chdir: chdir,
            umask: umask,
            hrtime: hrtime,
            platform: platform,
            release: release,
            config: config,
            uptime: uptime
        },
        inherits;
    inherits = "function" == typeof Object.create ? function(e, t) {
        e.super_ = t, e.prototype = Object.create(t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    } : function(e, t) {
        e.super_ = t;
        var r = function() {};
        r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
    };
    var inherits$1 = inherits;

    function _typeof$1(e) {
        return (_typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var formatRegExp = /%[sdj%]/g;

    function format(e) {
        if (!isString(e)) {
            for (var t = [], r = 0; r < arguments.length; r++) t.push(inspect(arguments[r]));
            return t.join(" ")
        }
        r = 1;
        for (var n = arguments, o = n.length, i = String(e).replace(formatRegExp, function(e) {
                if ("%%" === e) return "%";
                if (o <= r) return e;
                switch (e) {
                    case "%s":
                        return String(n[r++]);
                    case "%d":
                        return Number(n[r++]);
                    case "%j":
                        try {
                            return JSON.stringify(n[r++])
                        } catch (e) {
                            return "[Circular]"
                        }
                        default:
                            return e
                }
            }), s = n[r]; r < o; s = n[++r]) isNull(s) || !isObject(s) ? i += " " + s : i += " " + inspect(s);
        return i
    }

    function deprecate(e, t) {
        if (isUndefined(global$1.process)) return function() {
            return deprecate(e, t).apply(this, arguments)
        };
        var r = !1;
        return function() {
            return r || (console.error(t), r = !0), e.apply(this, arguments)
        }
    }
    var debugs = {},
        debugEnviron;

    function debuglog(t) {
        if (isUndefined(debugEnviron) && (debugEnviron = process.env.NODE_DEBUG || ""), t = t.toUpperCase(), !debugs[t])
            if (new RegExp("\\b" + t + "\\b", "i").test(debugEnviron)) {
                debugs[t] = function() {
                    var e = format.apply(null, arguments);
                    console.error("%s %d: %s", t, 0, e)
                }
            } else debugs[t] = function() {};
        return debugs[t]
    }

    function inspect(e, t) {
        var r = {
            seen: [],
            stylize: stylizeNoColor
        };
        return 3 <= arguments.length && (r.depth = arguments[2]), 4 <= arguments.length && (r.colors = arguments[3]), isBoolean(t) ? r.showHidden = t : t && _extend(r, t), isUndefined(r.showHidden) && (r.showHidden = !1), isUndefined(r.depth) && (r.depth = 2), isUndefined(r.colors) && (r.colors = !1), isUndefined(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = stylizeWithColor), formatValue(r, e, r.depth)
    }

    function stylizeWithColor(e, t) {
        var r = inspect.styles[t];
        return r ? "[" + inspect.colors[r][0] + "m" + e + "[" + inspect.colors[r][1] + "m" : e
    }

    function stylizeNoColor(e, t) {
        return e
    }

    function arrayToHash(e) {
        var r = {};
        return e.forEach(function(e, t) {
            r[e] = !0
        }), r
    }

    function formatValue(t, r, n) {
        if (t.customInspect && r && isFunction(r.inspect) && r.inspect !== inspect && (!r.constructor || r.constructor.prototype !== r)) {
            var e = r.inspect(n, t);
            return isString(e) || (e = formatValue(t, e, n)), e
        }
        var o = formatPrimitive(t, r);
        if (o) return o;
        var i = Object.keys(r),
            s = arrayToHash(i);
        if (t.showHidden && (i = Object.getOwnPropertyNames(r)), isError(r) && (0 <= i.indexOf("message") || 0 <= i.indexOf("description"))) return formatError(r);
        if (0 === i.length) {
            if (isFunction(r)) {
                var u = r.name ? ": " + r.name : "";
                return t.stylize("[Function" + u + "]", "special")
            }
            if (isRegExp(r)) return t.stylize(RegExp.prototype.toString.call(r), "regexp");
            if (isDate(r)) return t.stylize(Date.prototype.toString.call(r), "date");
            if (isError(r)) return formatError(r)
        }
        var a, c = "",
            f = !1,
            h = ["{", "}"];
        (isArray$1(r) && (f = !0, h = ["[", "]"]), isFunction(r)) && (c = " [Function" + (r.name ? ": " + r.name : "") + "]");
        return isRegExp(r) && (c = " " + RegExp.prototype.toString.call(r)), isDate(r) && (c = " " + Date.prototype.toUTCString.call(r)), isError(r) && (c = " " + formatError(r)), 0 !== i.length || f && 0 != r.length ? n < 0 ? isRegExp(r) ? t.stylize(RegExp.prototype.toString.call(r), "regexp") : t.stylize("[Object]", "special") : (t.seen.push(r), a = f ? formatArray(t, r, n, s, i) : i.map(function(e) {
            return formatProperty(t, r, n, s, e, f)
        }), t.seen.pop(), reduceToSingleString(a, c, h)) : h[0] + c + h[1]
    }

    function formatPrimitive(e, t) {
        if (isUndefined(t)) return e.stylize("undefined", "undefined");
        if (isString(t)) {
            var r = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return e.stylize(r, "string")
        }
        return isNumber(t) ? e.stylize("" + t, "number") : isBoolean(t) ? e.stylize("" + t, "boolean") : isNull(t) ? e.stylize("null", "null") : void 0
    }

    function formatError(e) {
        return "[" + Error.prototype.toString.call(e) + "]"
    }

    function formatArray(t, r, n, o, e) {
        for (var i = [], s = 0, u = r.length; s < u; ++s) hasOwnProperty(r, String(s)) ? i.push(formatProperty(t, r, n, o, String(s), !0)) : i.push("");
        return e.forEach(function(e) {
            e.match(/^\d+$/) || i.push(formatProperty(t, r, n, o, e, !0))
        }), i
    }

    function formatProperty(e, t, r, n, o, i) {
        var s, u, a;
        if ((a = Object.getOwnPropertyDescriptor(t, o) || {
                value: t[o]
            }).get ? u = a.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : a.set && (u = e.stylize("[Setter]", "special")), hasOwnProperty(n, o) || (s = "[" + o + "]"), u || (e.seen.indexOf(a.value) < 0 ? -1 < (u = isNull(r) ? formatValue(e, a.value, null) : formatValue(e, a.value, r - 1)).indexOf("\n") && (u = i ? u.split("\n").map(function(e) {
                return "  " + e
            }).join("\n").substr(2) : "\n" + u.split("\n").map(function(e) {
                return "   " + e
            }).join("\n")) : u = e.stylize("[Circular]", "special")), isUndefined(s)) {
            if (i && o.match(/^\d+$/)) return u;
            (s = JSON.stringify("" + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), s = e.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), s = e.stylize(s, "string"))
        }
        return s + ": " + u
    }

    function reduceToSingleString(e, t, r) {
        return 60 < e.reduce(function(e, t) {
            return t.indexOf("\n"), e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
        }, 0) ? r[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + r[1] : r[0] + t + " " + e.join(", ") + " " + r[1]
    }

    function isArray$1(e) {
        return Array.isArray(e)
    }

    function isBoolean(e) {
        return "boolean" == typeof e
    }

    function isNull(e) {
        return null === e
    }

    function isNullOrUndefined(e) {
        return null == e
    }

    function isNumber(e) {
        return "number" == typeof e
    }

    function isString(e) {
        return "string" == typeof e
    }

    function isSymbol(e) {
        return "symbol" === _typeof$1(e)
    }

    function isUndefined(e) {
        return void 0 === e
    }

    function isRegExp(e) {
        return isObject(e) && "[object RegExp]" === objectToString(e)
    }

    function isObject(e) {
        return "object" === _typeof$1(e) && null !== e
    }

    function isDate(e) {
        return isObject(e) && "[object Date]" === objectToString(e)
    }

    function isError(e) {
        return isObject(e) && ("[object Error]" === objectToString(e) || e instanceof Error)
    }

    function isFunction(e) {
        return "function" == typeof e
    }

    function isPrimitive(e) {
        return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" === _typeof$1(e) || void 0 === e
    }

    function isBuffer$1(e) {
        return isBuffer(e)
    }

    function objectToString(e) {
        return Object.prototype.toString.call(e)
    }

    function pad(e) {
        return e < 10 ? "0" + e.toString(10) : e.toString(10)
    }
    inspect.colors = {
        bold: [1, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        white: [37, 39],
        grey: [90, 39],
        black: [30, 39],
        blue: [34, 39],
        cyan: [36, 39],
        green: [32, 39],
        magenta: [35, 39],
        red: [31, 39],
        yellow: [33, 39]
    }, inspect.styles = {
        special: "cyan",
        number: "yellow",
        boolean: "yellow",
        undefined: "grey",
        null: "bold",
        string: "green",
        date: "magenta",
        regexp: "red"
    };
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function timestamp$1() {
        var e = new Date,
            t = [pad(e.getHours()), pad(e.getMinutes()), pad(e.getSeconds())].join(":");
        return [e.getDate(), months[e.getMonth()], t].join(" ")
    }

    function log() {
        console.log("%s - %s", timestamp$1(), format.apply(null, arguments))
    }

    function _extend(e, t) {
        if (!t || !isObject(t)) return e;
        for (var r = Object.keys(t), n = r.length; n--;) e[r[n]] = t[r[n]];
        return e
    }

    function hasOwnProperty(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    var util = {
        inherits: inherits$1,
        _extend: _extend,
        log: log,
        isBuffer: isBuffer$1,
        isPrimitive: isPrimitive,
        isFunction: isFunction,
        isError: isError,
        isDate: isDate,
        isObject: isObject,
        isRegExp: isRegExp,
        isUndefined: isUndefined,
        isSymbol: isSymbol,
        isString: isString,
        isNumber: isNumber,
        isNullOrUndefined: isNullOrUndefined,
        isNull: isNull,
        isBoolean: isBoolean,
        isArray: isArray$1,
        inspect: inspect,
        deprecate: deprecate,
        format: format,
        debuglog: debuglog
    };

    function _classCallCheck$2(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$2(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$2(e, t, r) {
        return t && _defineProperties$2(e.prototype, t), r && _defineProperties$2(e, r), e
    }
    var Buffer$1 = buffer.Buffer,
        randomBytes$1 = utils.randomBytes,
        deprecate$1 = util.deprecate,
        PROCESS_UNIQUE = randomBytes$1(5),
        checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$"),
        hasBufferType = !1;
    try {
        Buffer$1 && Buffer$1.from && (hasBufferType = !0)
    } catch (e) {
        hasBufferType = !1
    }
    for (var hexTable = [], _i = 0; _i < 256; _i++) hexTable[_i] = (_i <= 15 ? "0" : "") + _i.toString(16);
    for (var decodeLookup = [], i$1 = 0; i$1 < 10;) decodeLookup[48 + i$1] = i$1++;
    for (; i$1 < 16;) decodeLookup[55 + i$1] = decodeLookup[87 + i$1] = i$1++;
    var _Buffer = Buffer$1;

    function convertToHex(e) {
        return e.toString("hex")
    }

    function makeObjectIdError(e, t) {
        var r = e[t];
        return new TypeError('ObjectId string "'.concat(e, '" contains invalid character "').concat(r, '" with character code (').concat(e.charCodeAt(t), "). All character codes for a non-hex string must be less than 256."))
    }
    var ObjectId = function() {
        function o(e) {
            if (_classCallCheck$2(this, o), e instanceof o) return e;
            if (null == e || "number" == typeof e) return this.id = o.generate(e), void(o.cacheHexString && (this.__id = this.toString("hex")));
            var t = o.isValid(e);
            if (!t && null != e) throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
            if (t && "string" == typeof e && 24 === e.length && hasBufferType) return new o(Buffer$1.from(e, "hex"));
            if (t && "string" == typeof e && 24 === e.length) return o.createFromHexString(e);
            if (null == e || 12 !== e.length) {
                if (null != e && e.toHexString) return o.createFromHexString(e.toHexString());
                throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters")
            }
            this.id = e, o.cacheHexString && (this.__id = this.toString("hex"))
        }
        return _createClass$2(o, [{
            key: "toHexString",
            value: function() {
                if (o.cacheHexString && this.__id) return this.__id;
                var e = "";
                if (!this.id || !this.id.length) throw new TypeError("invalid ObjectId, ObjectId.id must be either a string or a Buffer, but is [" + JSON.stringify(this.id) + "]");
                if (this.id instanceof _Buffer) return e = convertToHex(this.id), o.cacheHexString && (this.__id = e), e;
                for (var t = 0; t < this.id.length; t++) {
                    var r = hexTable[this.id.charCodeAt(t)];
                    if ("string" != typeof r) throw makeObjectIdError(this.id, t);
                    e += r
                }
                return o.cacheHexString && (this.__id = e), e
            }
        }, {
            key: "toString",
            value: function(e) {
                return this.id && this.id.copy ? this.id.toString("string" == typeof e ? e : "hex") : this.toHexString()
            }
        }, {
            key: "toJSON",
            value: function() {
                return this.toHexString()
            }
        }, {
            key: "equals",
            value: function(e) {
                return e instanceof o ? this.toString() === e.toString() : "string" == typeof e && o.isValid(e) && 12 === e.length && this.id instanceof _Buffer ? e === this.id.toString("binary") : "string" == typeof e && o.isValid(e) && 24 === e.length ? e.toLowerCase() === this.toHexString() : "string" == typeof e && o.isValid(e) && 12 === e.length ? e === this.id : !(null == e || !(e instanceof o || e.toHexString)) && e.toHexString() === this.toHexString()
            }
        }, {
            key: "getTimestamp",
            value: function() {
                var e = new Date,
                    t = this.id.readUInt32BE(0);
                return e.setTime(1e3 * Math.floor(t)), e
            }
        }, {
            key: "toExtendedJSON",
            value: function() {
                return this.toHexString ? {
                    $oid: this.toHexString()
                } : {
                    $oid: this.toString("hex")
                }
            }
        }], [{
            key: "getInc",
            value: function() {
                return o.index = (o.index + 1) % 16777215
            }
        }, {
            key: "generate",
            value: function(e) {
                "number" != typeof e && (e = ~~(Date.now() / 1e3));
                var t = o.getInc(),
                    r = Buffer$1.alloc(12);
                return r[3] = 255 & e, r[2] = e >> 8 & 255, r[1] = e >> 16 & 255, r[0] = e >> 24 & 255, r[4] = PROCESS_UNIQUE[0], r[5] = PROCESS_UNIQUE[1], r[6] = PROCESS_UNIQUE[2], r[7] = PROCESS_UNIQUE[3], r[8] = PROCESS_UNIQUE[4], r[11] = 255 & t, r[10] = t >> 8 & 255, r[9] = t >> 16 & 255, r
            }
        }, {
            key: "createPk",
            value: function() {
                return new o
            }
        }, {
            key: "createFromTime",
            value: function(e) {
                var t = Buffer$1.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                return t[3] = 255 & e, t[2] = e >> 8 & 255, t[1] = e >> 16 & 255, t[0] = e >> 24 & 255, new o(t)
            }
        }, {
            key: "createFromHexString",
            value: function(e) {
                if (void 0 === e || null != e && 24 !== e.length) throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
                if (hasBufferType) return new o(Buffer$1.from(e, "hex"));
                for (var t = new _Buffer(12), r = 0, n = 0; n < 24;) t[r++] = decodeLookup[e.charCodeAt(n++)] << 4 | decodeLookup[e.charCodeAt(n++)];
                return new o(t)
            }
        }, {
            key: "isValid",
            value: function(e) {
                return null != e && ("number" == typeof e || ("string" == typeof e ? 12 === e.length || 24 === e.length && checkForHexRegExp.test(e) : e instanceof o || (e instanceof _Buffer && 12 === e.length || !!e.toHexString && (12 === e.id.length || 24 === e.id.length && checkForHexRegExp.test(e.id)))))
            }
        }, {
            key: "fromExtendedJSON",
            value: function(e) {
                return new o(e.$oid)
            }
        }]), o
    }();
    ObjectId.get_inc = deprecate$1(function() {
        return ObjectId.getInc()
    }, "Please use the static `ObjectId.getInc()` instead"), ObjectId.prototype.get_inc = deprecate$1(function() {
        return ObjectId.getInc()
    }, "Please use the static `ObjectId.getInc()` instead"), ObjectId.prototype.getInc = deprecate$1(function() {
        return ObjectId.getInc()
    }, "Please use the static `ObjectId.getInc()` instead"), ObjectId.prototype.generate = deprecate$1(function(e) {
        return ObjectId.generate(e)
    }, "Please use the static `ObjectId.generate(time)` instead"), Object.defineProperty(ObjectId.prototype, "generationTime", {
        enumerable: !0,
        get: function() {
            return this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24
        },
        set: function(e) {
            this.id[3] = 255 & e, this.id[2] = e >> 8 & 255, this.id[1] = e >> 16 & 255, this.id[0] = e >> 24 & 255
        }
    }), ObjectId.prototype[util.inspect.custom || "inspect"] = ObjectId.prototype.toString, ObjectId.index = ~~(16777215 * Math.random()), Object.defineProperty(ObjectId.prototype, "_bsontype", {
        value: "ObjectID"
    });
    var objectid = ObjectId;

    function _classCallCheck$3(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$3(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$3(e, t, r) {
        return t && _defineProperties$3(e.prototype, t), r && _defineProperties$3(e, r), e
    }

    function alphabetize(e) {
        return e.split("").sort().join("")
    }
    var BSONRegExp = function() {
        function n(e, t) {
            _classCallCheck$3(this, n), this.pattern = e || "", this.options = t ? alphabetize(t) : "";
            for (var r = 0; r < this.options.length; r++)
                if ("i" !== this.options[r] && "m" !== this.options[r] && "x" !== this.options[r] && "l" !== this.options[r] && "s" !== this.options[r] && "u" !== this.options[r]) throw new Error("The regular expression option [".concat(this.options[r], "] is not supported"))
        }
        return _createClass$3(n, [{
            key: "toExtendedJSON",
            value: function() {
                return {
                    $regularExpression: {
                        pattern: this.pattern,
                        options: this.options
                    }
                }
            }
        }], [{
            key: "fromExtendedJSON",
            value: function(e) {
                return new n(e.$regularExpression.pattern, e.$regularExpression.options.split("").sort().join(""))
            }
        }]), n
    }();
    Object.defineProperty(BSONRegExp.prototype, "_bsontype", {
        value: "BSONRegExp"
    });
    var regexp = BSONRegExp;

    function _classCallCheck$4(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$4(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$4(e, t, r) {
        return t && _defineProperties$4(e.prototype, t), r && _defineProperties$4(e, r), e
    }
    var BSONSymbol = function() {
        function t(e) {
            _classCallCheck$4(this, t), this.value = e
        }
        return _createClass$4(t, [{
            key: "valueOf",
            value: function() {
                return this.value
            }
        }, {
            key: "toString",
            value: function() {
                return this.value
            }
        }, {
            key: "inspect",
            value: function() {
                return this.value
            }
        }, {
            key: "toJSON",
            value: function() {
                return this.value
            }
        }, {
            key: "toExtendedJSON",
            value: function() {
                return {
                    $symbol: this.value
                }
            }
        }], [{
            key: "fromExtendedJSON",
            value: function(e) {
                return new t(e.$symbol)
            }
        }]), t
    }();
    Object.defineProperty(BSONSymbol.prototype, "_bsontype", {
        value: "Symbol"
    });
    var symbol = BSONSymbol;

    function _classCallCheck$5(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$5(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$5(e, t, r) {
        return t && _defineProperties$5(e.prototype, t), r && _defineProperties$5(e, r), e
    }
    var Int32 = function() {
        function r(e) {
            _classCallCheck$5(this, r), this.value = e
        }
        return _createClass$5(r, [{
            key: "valueOf",
            value: function() {
                return this.value
            }
        }, {
            key: "toJSON",
            value: function() {
                return this.value
            }
        }, {
            key: "toExtendedJSON",
            value: function(e) {
                return e && e.relaxed ? this.value : {
                    $numberInt: this.value.toString()
                }
            }
        }], [{
            key: "fromExtendedJSON",
            value: function(e, t) {
                return t && t.relaxed ? parseInt(e.$numberInt, 10) : new r(e.$numberInt)
            }
        }]), r
    }();
    Object.defineProperty(Int32.prototype, "_bsontype", {
        value: "Int32"
    });
    var int_32 = Int32;

    function _classCallCheck$6(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$6(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$6(e, t, r) {
        return t && _defineProperties$6(e.prototype, t), r && _defineProperties$6(e, r), e
    }
    var Code = function() {
        function r(e, t) {
            _classCallCheck$6(this, r), this.code = e, this.scope = t
        }
        return _createClass$6(r, [{
            key: "toJSON",
            value: function() {
                return {
                    scope: this.scope,
                    code: this.code
                }
            }
        }, {
            key: "toExtendedJSON",
            value: function() {
                return this.scope ? {
                    $code: this.code,
                    $scope: this.scope
                } : {
                    $code: this.code
                }
            }
        }], [{
            key: "fromExtendedJSON",
            value: function(e) {
                return new r(e.$code, e.$scope)
            }
        }]), r
    }();
    Object.defineProperty(Code.prototype, "_bsontype", {
        value: "Code"
    });
    var code$1 = Code,
        Buffer$2 = buffer.Buffer,
        PARSE_STRING_REGEXP = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/,
        PARSE_INF_REGEXP = /^(\+|-)?(Infinity|inf)$/i,
        PARSE_NAN_REGEXP = /^(\+|-)?NaN$/i,
        EXPONENT_MAX = 6111,
        EXPONENT_MIN = -6176,
        EXPONENT_BIAS = 6176,
        MAX_DIGITS = 34,
        NAN_BUFFER = [124, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
        INF_NEGATIVE_BUFFER = [248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
        INF_POSITIVE_BUFFER = [120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
        EXPONENT_REGEX = /^([-+])?(\d+)?$/;

    function isDigit(e) {
        return !isNaN(parseInt(e, 10))
    }

    function divideu128(e) {
        var t = long_1$1.fromNumber(1e9),
            r = long_1$1.fromNumber(0);
        if (!(e.parts[0] || e.parts[1] || e.parts[2] || e.parts[3])) return {
            quotient: e,
            rem: r
        };
        for (var n = 0; n <= 3; n++) r = (r = r.shiftLeft(32)).add(new long_1$1(e.parts[n], 0)), e.parts[n] = r.div(t).low, r = r.modulo(t);
        return {
            quotient: e,
            rem: r
        }
    }

    function multiply64x2(e, t) {
        if (!e && !t) return {
            high: long_1$1.fromNumber(0),
            low: long_1$1.fromNumber(0)
        };
        var r = e.shiftRightUnsigned(32),
            n = new long_1$1(e.getLowBits(), 0),
            o = t.shiftRightUnsigned(32),
            i = new long_1$1(t.getLowBits(), 0),
            s = r.multiply(o),
            u = r.multiply(i),
            a = n.multiply(o),
            c = n.multiply(i);
        return s = s.add(u.shiftRightUnsigned(32)), u = new long_1$1(u.getLowBits(), 0).add(a).add(c.shiftRightUnsigned(32)), {
            high: s = s.add(u.shiftRightUnsigned(32)),
            low: c = u.shiftLeft(32).add(new long_1$1(c.getLowBits(), 0))
        }
    }

    function lessThan(e, t) {
        var r = e.high >>> 0,
            n = t.high >>> 0;
        return r < n || r === n && e.low >>> 0 < t.low >>> 0
    }

    function invalidErr(e, t) {
        throw new TypeError('"'.concat(e, '" is not a valid Decimal128 string - ').concat(t))
    }

    function Decimal128(e) {
        this.bytes = e
    }
    Decimal128.fromString = function(e) {
        var t, r = !1,
            n = !1,
            o = !1,
            i = 0,
            s = 0,
            u = 0,
            a = 0,
            c = 0,
            f = [0],
            h = 0,
            l = 0,
            d = 0,
            p = 0,
            y = 0,
            g = 0,
            v = [0, 0],
            m = [0, 0],
            _ = 0;
        if (7e3 <= e.length) throw new TypeError(e + " not a valid Decimal128 string");
        var E = e.match(PARSE_STRING_REGEXP),
            A = e.match(PARSE_INF_REGEXP),
            b = e.match(PARSE_NAN_REGEXP);
        if (!E && !A && !b || 0 === e.length) throw new TypeError(e + " not a valid Decimal128 string");
        if (E) {
            var w = E[2],
                S = E[4],
                R = E[5],
                T = E[6];
            S && void 0 === T && invalidErr(e, "missing exponent power"), S && void 0 === w && invalidErr(e, "missing exponent base"), void 0 === S && (R || T) && invalidErr(e, "missing e before exponent")
        }
        if ("+" !== e[_] && "-" !== e[_] || (r = "-" === e[_++]), !isDigit(e[_]) && "." !== e[_]) {
            if ("i" === e[_] || "I" === e[_]) return new Decimal128(Buffer$2.from(r ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
            if ("N" === e[_]) return new Decimal128(Buffer$2.from(NAN_BUFFER))
        }
        for (; isDigit(e[_]) || "." === e[_];) "." !== e[_] ? (h < 34 && ("0" !== e[_] || o) && (o || (c = s), o = !0, f[l++] = parseInt(e[_], 10), h += 1), o && (u += 1), n && (a += 1), s += 1) : (n && invalidErr(e, "contains multiple periods"), n = !0), _ += 1;
        if (n && !s) throw new TypeError(e + " not a valid Decimal128 string");
        if ("e" === e[_] || "E" === e[_]) {
            var O = e.substr(++_).match(EXPONENT_REGEX);
            if (!O || !O[2]) return new Decimal128(Buffer$2.from(NAN_BUFFER));
            y = parseInt(O[0], 10), _ += O[0].length
        }
        if (e[_]) return new Decimal128(Buffer$2.from(NAN_BUFFER));
        if (d = 0, h) {
            if (p = h - 1, 1 !== (i = u))
                for (;
                    "0" === e[c + i - 1];) i -= 1
        } else h = u = 1, i = f[p = d = 0] = 0;
        for (y <= a && 16384 < a - y ? y = EXPONENT_MIN : y -= a; EXPONENT_MAX < y;) {
            if (MAX_DIGITS < (p += 1) - d) {
                if (f.join("").match(/^0+$/)) {
                    y = EXPONENT_MAX;
                    break
                }
                invalidErr(e, "overflow")
            }
            y -= 1
        }
        for (; y < EXPONENT_MIN || h < u;) {
            if (0 === p && i < h) {
                y = EXPONENT_MIN, i = 0;
                break
            }
            if (h < u ? u -= 1 : p -= 1, y < EXPONENT_MAX) y += 1;
            else {
                if (f.join("").match(/^0+$/)) {
                    y = EXPONENT_MAX;
                    break
                }
                invalidErr(e, "overflow")
            }
        }
        if (p - d + 1 < i) {
            var N = s;
            n && (c += 1, N += 1), r && (c += 1, N += 1);
            var I = parseInt(e[c + p + 1], 10),
                B = 0;
            if (5 <= I && (B = 1, 5 === I))
                for (B = f[p] % 2 == 1, g = c + p + 2; g < N; g++)
                    if (parseInt(e[g], 10)) {
                        B = 1;
                        break
                    } if (B)
                for (var P = p; 0 <= P; P--)
                    if (9 < ++f[P] && (f[P] = 0) === P) {
                        if (!(y < EXPONENT_MAX)) return new Decimal128(Buffer$2.from(r ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
                        y += 1, f[P] = 1
                    }
        }
        if (v = long_1$1.fromNumber(0), m = long_1$1.fromNumber(0), 0 === i) v = long_1$1.fromNumber(0), m = long_1$1.fromNumber(0);
        else if (p - d < 17) {
            var C = d;
            for (m = long_1$1.fromNumber(f[C++]), v = new long_1$1(0, 0); C <= p; C++) m = (m = m.multiply(long_1$1.fromNumber(10))).add(long_1$1.fromNumber(f[C]))
        } else {
            var $ = d;
            for (v = long_1$1.fromNumber(f[$++]); $ <= p - 17; $++) v = (v = v.multiply(long_1$1.fromNumber(10))).add(long_1$1.fromNumber(f[$]));
            for (m = long_1$1.fromNumber(f[$++]); $ <= p; $++) m = (m = m.multiply(long_1$1.fromNumber(10))).add(long_1$1.fromNumber(f[$]))
        }
        var U = multiply64x2(v, long_1$1.fromString("100000000000000000"));
        U.low = U.low.add(m), lessThan(U.low, m) && (U.high = U.high.add(long_1$1.fromNumber(1))), t = y + EXPONENT_BIAS;
        var D = {
            low: long_1$1.fromNumber(0),
            high: long_1$1.fromNumber(0)
        };
        U.high.shiftRightUnsigned(49).and(long_1$1.fromNumber(1)).equals(long_1$1.fromNumber(1)) ? (D.high = D.high.or(long_1$1.fromNumber(3).shiftLeft(61)), D.high = D.high.or(long_1$1.fromNumber(t).and(long_1$1.fromNumber(16383).shiftLeft(47))), D.high = D.high.or(U.high.and(long_1$1.fromNumber(0x7fffffffffff)))) : (D.high = D.high.or(long_1$1.fromNumber(16383 & t).shiftLeft(49)), D.high = D.high.or(U.high.and(long_1$1.fromNumber(562949953421311)))), D.low = U.low, r && (D.high = D.high.or(long_1$1.fromString("9223372036854775808")));
        var x = Buffer$2.alloc(16);
        return _ = 0, x[_++] = 255 & D.low.low, x[_++] = D.low.low >> 8 & 255, x[_++] = D.low.low >> 16 & 255, x[_++] = D.low.low >> 24 & 255, x[_++] = 255 & D.low.high, x[_++] = D.low.high >> 8 & 255, x[_++] = D.low.high >> 16 & 255, x[_++] = D.low.high >> 24 & 255, x[_++] = 255 & D.high.low, x[_++] = D.high.low >> 8 & 255, x[_++] = D.high.low >> 16 & 255, x[_++] = D.high.low >> 24 & 255, x[_++] = 255 & D.high.high, x[_++] = D.high.high >> 8 & 255, x[_++] = D.high.high >> 16 & 255, x[_++] = D.high.high >> 24 & 255, new Decimal128(x)
    };
    var COMBINATION_MASK = 31,
        EXPONENT_MASK = 16383,
        COMBINATION_INFINITY = 30,
        COMBINATION_NAN = 31;
    Decimal128.prototype.toString = function() {
        for (var e, t, r, n, o, i, s = 0, u = new Array(36), a = 0; a < u.length; a++) u[a] = 0;
        var c, f, h, l, d, p = 0,
            y = !1,
            g = {
                parts: new Array(4)
            },
            v = [];
        p = 0;
        var m = this.bytes;
        if (n = m[p++] | m[p++] << 8 | m[p++] << 16 | m[p++] << 24, r = m[p++] | m[p++] << 8 | m[p++] << 16 | m[p++] << 24, t = m[p++] | m[p++] << 8 | m[p++] << 16 | m[p++] << 24, e = m[p++] | m[p++] << 8 | m[p++] << 16 | m[p++] << 24, p = 0, {
                low: new long_1$1(n, r),
                high: new long_1$1(t, e)
            }.high.lessThan(long_1$1.ZERO) && v.push("-"), (o = e >> 26 & COMBINATION_MASK) >> 3 == 3) {
            if (o === COMBINATION_INFINITY) return v.join("") + "Infinity";
            if (o === COMBINATION_NAN) return "NaN";
            i = e >> 15 & EXPONENT_MASK, h = 8 + (e >> 14 & 1)
        } else h = e >> 14 & 7, i = e >> 17 & EXPONENT_MASK;
        if (c = i - EXPONENT_BIAS, g.parts[0] = (16383 & e) + ((15 & h) << 14), g.parts[1] = t, g.parts[2] = r, g.parts[3] = n, 0 === g.parts[0] && 0 === g.parts[1] && 0 === g.parts[2] && 0 === g.parts[3]) y = !0;
        else
            for (d = 3; 0 <= d; d--) {
                var _ = 0,
                    E = divideu128(g);
                if (g = E.quotient, _ = E.rem.low)
                    for (l = 8; 0 <= l; l--) u[9 * d + l] = _ % 10, _ = Math.floor(_ / 10)
            }
        if (y) s = 1, u[p] = 0;
        else
            for (s = 36; !u[p];) s -= 1, p += 1;
        if (34 <= (f = s - 1 + c) || f <= -7 || 0 < c) {
            if (34 < s) return v.push(0), 0 < c ? v.push("E+" + c) : c < 0 && v.push("E" + c), v.join("");
            v.push(u[p++]), (s -= 1) && v.push(".");
            for (var A = 0; A < s; A++) v.push(u[p++]);
            v.push("E"), 0 < f ? v.push("+" + f) : v.push(f)
        } else if (0 <= c)
            for (var b = 0; b < s; b++) v.push(u[p++]);
        else {
            var w = s + c;
            if (0 < w)
                for (var S = 0; S < w; S++) v.push(u[p++]);
            else v.push("0");
            for (v.push("."); w++ < 0;) v.push("0");
            for (var R = 0; R < s - Math.max(w - 1, 0); R++) v.push(u[p++])
        }
        return v.join("")
    }, Decimal128.prototype.toJSON = function() {
        return {
            $numberDecimal: this.toString()
        }
    }, Decimal128.prototype.toExtendedJSON = function() {
        return {
            $numberDecimal: this.toString()
        }
    }, Decimal128.fromExtendedJSON = function(e) {
        return Decimal128.fromString(e.$numberDecimal)
    }, Object.defineProperty(Decimal128.prototype, "_bsontype", {
        value: "Decimal128"
    });
    var decimal128 = Decimal128;

    function _classCallCheck$7(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$7(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$7(e, t, r) {
        return t && _defineProperties$7(e.prototype, t), r && _defineProperties$7(e, r), e
    }
    var MinKey = function() {
        function e() {
            _classCallCheck$7(this, e)
        }
        return _createClass$7(e, [{
            key: "toExtendedJSON",
            value: function() {
                return {
                    $minKey: 1
                }
            }
        }], [{
            key: "fromExtendedJSON",
            value: function() {
                return new e
            }
        }]), e
    }();
    Object.defineProperty(MinKey.prototype, "_bsontype", {
        value: "MinKey"
    });
    var min_key = MinKey;

    function _classCallCheck$8(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$8(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$8(e, t, r) {
        return t && _defineProperties$8(e.prototype, t), r && _defineProperties$8(e, r), e
    }
    var MaxKey = function() {
        function e() {
            _classCallCheck$8(this, e)
        }
        return _createClass$8(e, [{
            key: "toExtendedJSON",
            value: function() {
                return {
                    $maxKey: 1
                }
            }
        }], [{
            key: "fromExtendedJSON",
            value: function() {
                return new e
            }
        }]), e
    }();
    Object.defineProperty(MaxKey.prototype, "_bsontype", {
        value: "MaxKey"
    });
    var max_key = MaxKey;

    function _classCallCheck$9(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$9(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$9(e, t, r) {
        return t && _defineProperties$9(e.prototype, t), r && _defineProperties$9(e, r), e
    }
    var DBRef = function() {
        function i(e, t, r, n) {
            _classCallCheck$9(this, i);
            var o = e.split(".");
            2 === o.length && (r = o.shift(), e = o.shift()), this.collection = e, this.oid = t, this.db = r, this.fields = n || {}
        }
        return _createClass$9(i, [{
            key: "toJSON",
            value: function() {
                var e = Object.assign({
                    $ref: this.collection,
                    $id: this.oid
                }, this.fields);
                return null != this.db && (e.$db = this.db), e
            }
        }, {
            key: "toExtendedJSON",
            value: function() {
                var e = {
                    $ref: this.collection,
                    $id: this.oid
                };
                return this.db && (e.$db = this.db), e = Object.assign(e, this.fields)
            }
        }], [{
            key: "fromExtendedJSON",
            value: function(e) {
                var t = Object.assign({}, e);
                return ["$ref", "$id", "$db"].forEach(function(e) {
                    return delete t[e]
                }), new i(e.$ref, e.$id, e.$db, t)
            }
        }]), i
    }();
    Object.defineProperty(DBRef.prototype, "_bsontype", {
        value: "DBRef"
    }), Object.defineProperty(DBRef.prototype, "namespace", {
        get: function() {
            return this.collection
        },
        set: function(e) {
            this.collection = e
        },
        configurable: !1
    });
    var db_ref = DBRef;

    function _classCallCheck$a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$a(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$a(e, t, r) {
        return t && _defineProperties$a(e.prototype, t), r && _defineProperties$a(e, r), e
    }
    var Buffer$3 = buffer.Buffer,
        Binary = function() {
            function i(e, t) {
                if (_classCallCheck$a(this, i), !(null == e || "string" == typeof e || Buffer$3.isBuffer(e) || e instanceof Uint8Array || Array.isArray(e))) throw new TypeError("only String, Buffer, Uint8Array or Array accepted");
                if (this.sub_type = null == t ? BSON_BINARY_SUBTYPE_DEFAULT : t, this.position = 0, null == e || e instanceof Number) void 0 !== Buffer$3 ? this.buffer = Buffer$3.alloc(i.BUFFER_SIZE) : "undefined" != typeof Uint8Array ? this.buffer = new Uint8Array(new ArrayBuffer(i.BUFFER_SIZE)) : this.buffer = new Array(i.BUFFER_SIZE);
                else {
                    if ("string" == typeof e)
                        if (void 0 !== Buffer$3) this.buffer = Buffer$3.from(e);
                        else {
                            if ("undefined" == typeof Uint8Array && !Array.isArray(e)) throw new TypeError("only String, Buffer, Uint8Array or Array accepted");
                            this.buffer = writeStringToArray(e)
                        }
                    else this.buffer = e;
                    this.position = e.length
                }
            }
            return _createClass$a(i, [{
                key: "put",
                value: function(e) {
                    if (null != e.length && "number" != typeof e && 1 !== e.length) throw new TypeError("only accepts single character String, Uint8Array or Array");
                    if ("number" != typeof e && e < 0 || 255 < e) throw new TypeError("only accepts number in a valid unsigned byte range 0-255");
                    var t = null;
                    if (t = "string" == typeof e ? e.charCodeAt(0) : null != e.length ? e[0] : e, this.buffer.length > this.position) this.buffer[this.position++] = t;
                    else if (void 0 !== Buffer$3 && Buffer$3.isBuffer(this.buffer)) {
                        var r = Buffer$3.alloc(i.BUFFER_SIZE + this.buffer.length);
                        this.buffer.copy(r, 0, 0, this.buffer.length), this.buffer = r, this.buffer[this.position++] = t
                    } else {
                        var n = null;
                        n = isUint8Array(this.buffer) ? new Uint8Array(new ArrayBuffer(i.BUFFER_SIZE + this.buffer.length)) : new Array(i.BUFFER_SIZE + this.buffer.length);
                        for (var o = 0; o < this.buffer.length; o++) n[o] = this.buffer[o];
                        this.buffer = n, this.buffer[this.position++] = t
                    }
                }
            }, {
                key: "write",
                value: function(e, t) {
                    if (t = "number" == typeof t ? t : this.position, this.buffer.length < t + e.length) {
                        var r = null;
                        if (void 0 !== Buffer$3 && Buffer$3.isBuffer(this.buffer)) r = Buffer$3.alloc(this.buffer.length + e.length), this.buffer.copy(r, 0, 0, this.buffer.length);
                        else if (isUint8Array(this.buffer)) {
                            r = new Uint8Array(new ArrayBuffer(this.buffer.length + e.length));
                            for (var n = 0; n < this.position; n++) r[n] = this.buffer[n]
                        }
                        this.buffer = r
                    }
                    if (void 0 !== Buffer$3 && Buffer$3.isBuffer(e) && Buffer$3.isBuffer(this.buffer)) e.copy(this.buffer, t, 0, e.length), this.position = t + e.length > this.position ? t + e.length : this.position;
                    else if (void 0 !== Buffer$3 && "string" == typeof e && Buffer$3.isBuffer(this.buffer)) this.buffer.write(e, t, "binary"), this.position = t + e.length > this.position ? t + e.length : this.position;
                    else if (isUint8Array(e) || Array.isArray(e) && "string" != typeof e) {
                        for (var o = 0; o < e.length; o++) this.buffer[t++] = e[o];
                        this.position = t > this.position ? t : this.position
                    } else if ("string" == typeof e) {
                        for (var i = 0; i < e.length; i++) this.buffer[t++] = e.charCodeAt(i);
                        this.position = t > this.position ? t : this.position
                    }
                }
            }, {
                key: "read",
                value: function(e, t) {
                    if (t = t && 0 < t ? t : this.position, this.buffer.slice) return this.buffer.slice(e, e + t);
                    for (var r = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(t)) : new Array(t), n = 0; n < t; n++) r[n] = this.buffer[e++];
                    return r
                }
            }, {
                key: "value",
                value: function(e) {
                    if ((e = null != e && e) && void 0 !== Buffer$3 && Buffer$3.isBuffer(this.buffer) && this.buffer.length === this.position) return this.buffer;
                    if (void 0 !== Buffer$3 && Buffer$3.isBuffer(this.buffer)) return e ? this.buffer.slice(0, this.position) : this.buffer.toString("binary", 0, this.position);
                    if (e) {
                        if (null != this.buffer.slice) return this.buffer.slice(0, this.position);
                        for (var t = isUint8Array(this.buffer) ? new Uint8Array(new ArrayBuffer(this.position)) : new Array(this.position), r = 0; r < this.position; r++) t[r] = this.buffer[r];
                        return t
                    }
                    return convertArraytoUtf8BinaryString(this.buffer, 0, this.position)
                }
            }, {
                key: "length",
                value: function() {
                    return this.position
                }
            }, {
                key: "toJSON",
                value: function() {
                    return null != this.buffer ? this.buffer.toString("base64") : ""
                }
            }, {
                key: "toString",
                value: function(e) {
                    return null != this.buffer ? this.buffer.slice(0, this.position).toString(e) : ""
                }
            }, {
                key: "toExtendedJSON",
                value: function() {
                    var e = Buffer$3.isBuffer(this.buffer) ? this.buffer.toString("base64") : Buffer$3.from(this.buffer).toString("base64"),
                        t = Number(this.sub_type).toString(16);
                    return {
                        $binary: {
                            base64: e,
                            subType: 1 === t.length ? "0" + t : t
                        }
                    }
                }
            }], [{
                key: "fromExtendedJSON",
                value: function(e) {
                    var t = e.$binary.subType ? parseInt(e.$binary.subType, 16) : 0;
                    return new i(Buffer$3.from(e.$binary.base64, "base64"), t)
                }
            }]), i
        }(),
        BSON_BINARY_SUBTYPE_DEFAULT = 0;

    function isUint8Array(e) {
        return "[object Uint8Array]" === Object.prototype.toString.call(e)
    }

    function writeStringToArray(e) {
        for (var t = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(e.length)) : new Array(e.length), r = 0; r < e.length; r++) t[r] = e.charCodeAt(r);
        return t
    }

    function convertArraytoUtf8BinaryString(e, t, r) {
        for (var n = "", o = t; o < r; o++) n += String.fromCharCode(e[o]);
        return n
    }
    Binary.BUFFER_SIZE = 256, Binary.SUBTYPE_DEFAULT = 0, Binary.SUBTYPE_FUNCTION = 1, Binary.SUBTYPE_BYTE_ARRAY = 2, Binary.SUBTYPE_UUID_OLD = 3, Binary.SUBTYPE_UUID = 4, Binary.SUBTYPE_MD5 = 5, Binary.SUBTYPE_USER_DEFINED = 128, Object.defineProperty(Binary.prototype, "_bsontype", {
        value: "Binary"
    });
    var binary = Binary,
        constants = {
            BSON_INT32_MAX: 2147483647,
            BSON_INT32_MIN: -2147483648,
            BSON_INT64_MAX: Math.pow(2, 63) - 1,
            BSON_INT64_MIN: -Math.pow(2, 63),
            JS_INT_MAX: 9007199254740992,
            JS_INT_MIN: -9007199254740992,
            BSON_DATA_NUMBER: 1,
            BSON_DATA_STRING: 2,
            BSON_DATA_OBJECT: 3,
            BSON_DATA_ARRAY: 4,
            BSON_DATA_BINARY: 5,
            BSON_DATA_UNDEFINED: 6,
            BSON_DATA_OID: 7,
            BSON_DATA_BOOLEAN: 8,
            BSON_DATA_DATE: 9,
            BSON_DATA_NULL: 10,
            BSON_DATA_REGEXP: 11,
            BSON_DATA_DBPOINTER: 12,
            BSON_DATA_CODE: 13,
            BSON_DATA_SYMBOL: 14,
            BSON_DATA_CODE_W_SCOPE: 15,
            BSON_DATA_INT: 16,
            BSON_DATA_TIMESTAMP: 17,
            BSON_DATA_LONG: 18,
            BSON_DATA_DECIMAL128: 19,
            BSON_DATA_MIN_KEY: 255,
            BSON_DATA_MAX_KEY: 127,
            BSON_BINARY_SUBTYPE_DEFAULT: 0,
            BSON_BINARY_SUBTYPE_FUNCTION: 1,
            BSON_BINARY_SUBTYPE_BYTE_ARRAY: 2,
            BSON_BINARY_SUBTYPE_UUID: 3,
            BSON_BINARY_SUBTYPE_MD5: 4,
            BSON_BINARY_SUBTYPE_USER_DEFINED: 128
        };

    function _typeof$2(e) {
        return (_typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var keysToCodecs = {
        $oid: objectid,
        $binary: binary,
        $symbol: symbol,
        $numberInt: int_32,
        $numberDecimal: decimal128,
        $numberDouble: double_1,
        $numberLong: long_1$1,
        $minKey: min_key,
        $maxKey: max_key,
        $regularExpression: regexp,
        $timestamp: timestamp
    };

    function deserializeValue(e, t, r, n) {
        if ("number" == typeof r) {
            if (n.relaxed) return r;
            if (Math.floor(r) === r) {
                if (BSON_INT32_MIN <= r && r <= BSON_INT32_MAX) return new int_32(r);
                if (BSON_INT64_MIN <= r && r <= BSON_INT64_MAX) return new long_1$1.fromNumber(r)
            }
            return new double_1(r)
        }
        if (null == r || "object" !== _typeof$2(r)) return r;
        if (r.$undefined) return null;
        for (var o = Object.keys(r).filter(function(e) {
                return e.startsWith("$") && null != r[e]
            }), i = 0; i < o.length; i++) {
            var s = keysToCodecs[o[i]];
            if (s) return s.fromExtendedJSON(r, n)
        }
        if (null != r.$date) {
            var u = r.$date,
                a = new Date;
            return "string" == typeof u ? a.setTime(Date.parse(u)) : long_1$1.isLong(u) ? a.setTime(u.toNumber()) : "number" == typeof u && n.relaxed && a.setTime(u), a
        }
        if (null != r.$code) {
            var c = Object.assign({}, r);
            return r.$scope && (c.$scope = deserializeValue(e, null, r.$scope)), code$1.fromExtendedJSON(r)
        }
        if (null != r.$ref || null != r.$dbPointer) {
            var f = r.$ref ? r : r.$dbPointer;
            if (f instanceof db_ref) return f;
            var h = Object.keys(f).filter(function(e) {
                    return e.startsWith("$")
                }),
                l = !0;
            if (h.forEach(function(e) {
                    -1 === ["$ref", "$id", "$db"].indexOf(e) && (l = !1)
                }), l) return db_ref.fromExtendedJSON(f)
        }
        return r
    }

    function parse(e, r) {
        var n = this;
        return "boolean" == typeof(r = Object.assign({}, {
            relaxed: !0
        }, r)).relaxed && (r.strict = !r.relaxed), "boolean" == typeof r.strict && (r.relaxed = !r.strict), JSON.parse(e, function(e, t) {
            return deserializeValue(n, e, t, r)
        })
    }
    var BSON_INT32_MAX = 2147483647,
        BSON_INT32_MIN = -2147483648,
        BSON_INT64_MAX = 0x8000000000000000,
        BSON_INT64_MIN = -0x8000000000000000;

    function stringify(e, t, r, n) {
        null != r && "object" === _typeof$2(r) && (n = r, r = 0), null == t || "object" !== _typeof$2(t) || Array.isArray(t) || (n = t, t = null, r = 0), n = Object.assign({}, {
            relaxed: !0
        }, n);
        var o = Array.isArray(e) ? serializeArray(e, n) : serializeDocument(e, n);
        return JSON.stringify(o, t, r)
    }

    function serialize(e, t) {
        return t = t || {}, JSON.parse(stringify(e, t))
    }

    function deserialize(e, t) {
        return t = t || {}, parse(JSON.stringify(e), t)
    }

    function serializeArray(e, t) {
        return e.map(function(e) {
            return serializeValue(e, t)
        })
    }

    function getISOString(e) {
        var t = e.toISOString();
        return 0 !== e.getUTCMilliseconds() ? t : t.slice(0, -5) + "Z"
    }

    function serializeValue(e, t) {
        if (Array.isArray(e)) return serializeArray(e, t);
        if (void 0 === e) return null;
        if (e instanceof Date) {
            var r = e.getTime(),
                n = -1 < r && r < 2534023188e5;
            return t.relaxed && n ? {
                $date: getISOString(e)
            } : {
                $date: {
                    $numberLong: e.getTime().toString()
                }
            }
        }
        if ("number" == typeof e && !t.relaxed) {
            if (Math.floor(e) === e) {
                var o = BSON_INT64_MIN <= e && e <= BSON_INT64_MAX;
                if (BSON_INT32_MIN <= e && e <= BSON_INT32_MAX) return {
                    $numberInt: e.toString()
                };
                if (o) return {
                    $numberLong: e.toString()
                }
            }
            return {
                $numberDouble: e.toString()
            }
        }
        if (e instanceof RegExp) {
            var i = e.flags;
            return void 0 === i && (i = e.toString().match(/[gimuy]*$/)[0]), new regexp(e.source, i).toExtendedJSON()
        }
        return null != e && "object" === _typeof$2(e) ? serializeDocument(e, t) : e
    }
    var BSON_TYPE_MAPPINGS = {
        Binary: function(e) {
            return new binary(e.value(), e.subtype)
        },
        Code: function(e) {
            return new code$1(e.code, e.scope)
        },
        DBRef: function(e) {
            return new db_ref(e.collection || e.namespace, e.oid, e.db, e.fields)
        },
        Decimal128: function(e) {
            return new decimal128(e.bytes)
        },
        Double: function(e) {
            return new double_1(e.value)
        },
        Int32: function(e) {
            return new int_32(e.value)
        },
        Long: function(e) {
            return long_1$1.fromBits(null != e.low ? e.low : e.low_, null != e.low ? e.high : e.high_, null != e.low ? e.unsigned : e.unsigned_)
        },
        MaxKey: function() {
            return new max_key
        },
        MinKey: function() {
            return new min_key
        },
        ObjectID: function(e) {
            return new objectid(e)
        },
        ObjectId: function(e) {
            return new objectid(e)
        },
        BSONRegExp: function(e) {
            return new regexp(e.pattern, e.options)
        },
        Symbol: function(e) {
            return new symbol(e.value)
        },
        Timestamp: function(e) {
            return timestamp.fromBits(e.low, e.high)
        }
    };

    function serializeDocument(e, t) {
        if (null == e || "object" !== _typeof$2(e)) throw new Error("not an object instance");
        var r = e._bsontype;
        if (void 0 === r) {
            var n = {};
            for (var o in e) n[o] = serializeValue(e[o], t);
            return n
        }
        if ("string" == typeof r) {
            var i = e;
            if ("function" != typeof i.toExtendedJSON) {
                var s = BSON_TYPE_MAPPINGS[r];
                if (!s) throw new TypeError("Unrecognized or invalid _bsontype: " + r);
                i = s(i)
            }
            return "Code" === r && i.scope ? i = new code$1(i.code, serializeValue(i.scope, t)) : "DBRef" === r && i.oid && (i = new db_ref(i.collection, serializeValue(i.oid, t), i.db, i.fields)), i.toExtendedJSON(t)
        }
        throw new Error("_bsontype must be a string, but was: " + _typeof$2(r))
    }
    var extended_json = {
            parse: parse,
            deserialize: deserialize,
            serialize: serialize,
            stringify: stringify
        },
        FIRST_BIT = 128,
        FIRST_TWO_BITS = 192,
        FIRST_THREE_BITS = 224,
        FIRST_FOUR_BITS = 240,
        FIRST_FIVE_BITS = 248,
        TWO_BIT_CHAR = 192,
        THREE_BIT_CHAR = 224,
        FOUR_BIT_CHAR = 240,
        CONTINUING_CHAR = 128;

    function validateUtf8(e, t, r) {
        for (var n = 0, o = t; o < r; o += 1) {
            var i = e[o];
            if (n) {
                if ((i & FIRST_TWO_BITS) !== CONTINUING_CHAR) return !1;
                n -= 1
            } else if (i & FIRST_BIT)
                if ((i & FIRST_THREE_BITS) === TWO_BIT_CHAR) n = 1;
                else if ((i & FIRST_FOUR_BITS) === THREE_BIT_CHAR) n = 2;
            else {
                if ((i & FIRST_FIVE_BITS) !== FOUR_BIT_CHAR) return !1;
                n = 3
            }
        }
        return !n
    }
    var validateUtf8_1 = validateUtf8,
        validate_utf8 = {
            validateUtf8: validateUtf8_1
        },
        Buffer$4 = buffer.Buffer,
        validateUtf8$1 = validate_utf8.validateUtf8,
        JS_INT_MAX_LONG = long_1$1.fromNumber(constants.JS_INT_MAX),
        JS_INT_MIN_LONG = long_1$1.fromNumber(constants.JS_INT_MIN),
        functionCache = {};

    function deserialize$1(e, t, r) {
        var n = (t = null == t ? {} : t) && t.index ? t.index : 0,
            o = e[n] | e[n + 1] << 8 | e[n + 2] << 16 | e[n + 3] << 24;
        if (o < 5) throw new Error("bson size must be >= 5, is ".concat(o));
        if (t.allowObjectSmallerThanBufferSize && e.length < o) throw new Error("buffer length ".concat(e.length, " must be >= bson size ").concat(o));
        if (!t.allowObjectSmallerThanBufferSize && e.length !== o) throw new Error("buffer length ".concat(e.length, " must === bson size ").concat(o));
        if (o + n > e.length) throw new Error("(bson size ".concat(o, " + options.index ").concat(n, " must be <= buffer length ").concat(Buffer$4.byteLength(e), ")"));
        if (0 !== e[n + o - 1]) throw new Error("One object, sized correctly, with a spot for an EOO, but the EOO isn't 0x00");
        return deserializeObject(e, n, t, r)
    }

    function deserializeObject(e, t, r, n) {
        var o = null != r.evalFunctions && r.evalFunctions,
            i = null != r.cacheFunctions && r.cacheFunctions,
            s = null != r.cacheFunctionsCrc32 && r.cacheFunctionsCrc32;
        if (!s) var u = null;
        var a = null == r.fieldsAsRaw ? null : r.fieldsAsRaw,
            c = null != r.raw && r.raw,
            f = "boolean" == typeof r.bsonRegExp && r.bsonRegExp,
            h = null != r.promoteBuffers && r.promoteBuffers,
            l = null == r.promoteLongs || r.promoteLongs,
            d = null == r.promoteValues || r.promoteValues,
            p = t;
        if (e.length < 5) throw new Error("corrupt bson message < 5 bytes long");
        var y = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
        if (y < 5 || y > e.length) throw new Error("corrupt bson message");
        for (var g = n ? [] : {}, v = 0;;) {
            var m = e[t++];
            if (0 === m) break;
            for (var _ = t; 0 !== e[_] && _ < e.length;) _++;
            if (_ >= Buffer$4.byteLength(e)) throw new Error("Bad BSON Document: illegal CString");
            var E = n ? v++ : e.toString("utf8", t, _);
            if (t = _ + 1, m === constants.BSON_DATA_STRING) {
                var A = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                if (A <= 0 || A > e.length - t || 0 !== e[t + A - 1]) throw new Error("bad string length in bson");
                if (!validateUtf8$1(e, t, t + A - 1)) throw new Error("Invalid UTF-8 string in BSON document");
                var b = e.toString("utf8", t, t + A - 1);
                g[E] = b, t += A
            } else if (m === constants.BSON_DATA_OID) {
                var w = Buffer$4.alloc(12);
                e.copy(w, 0, t, t + 12), g[E] = new objectid(w), t += 12
            } else if (m === constants.BSON_DATA_INT && !1 === d) g[E] = new int_32(e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24);
            else if (m === constants.BSON_DATA_INT) g[E] = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
            else if (m === constants.BSON_DATA_NUMBER && !1 === d) g[E] = new double_1(e.readDoubleLE(t)), t += 8;
            else if (m === constants.BSON_DATA_NUMBER) g[E] = e.readDoubleLE(t), t += 8;
            else if (m === constants.BSON_DATA_DATE) {
                var S = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24,
                    R = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                g[E] = new Date(new long_1$1(S, R).toNumber())
            } else if (m === constants.BSON_DATA_BOOLEAN) {
                if (0 !== e[t] && 1 !== e[t]) throw new Error("illegal boolean type value");
                g[E] = 1 === e[t++]
            } else if (m === constants.BSON_DATA_OBJECT) {
                var T = t,
                    O = e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24;
                if (O <= 0 || O > e.length - t) throw new Error("bad embedded document length in bson");
                g[E] = c ? e.slice(t, t + O) : deserializeObject(e, T, r, !1), t += O
            } else if (m === constants.BSON_DATA_ARRAY) {
                var N = t,
                    I = e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24,
                    B = r,
                    P = t + I;
                if (a && a[E]) {
                    for (var C in B = {}, r) B[C] = r[C];
                    B.raw = !0
                }
                if (g[E] = deserializeObject(e, N, B, !0), 0 !== e[(t += I) - 1]) throw new Error("invalid array terminator byte");
                if (t !== P) throw new Error("corrupted array bson")
            } else if (m === constants.BSON_DATA_UNDEFINED) g[E] = void 0;
            else if (m === constants.BSON_DATA_NULL) g[E] = null;
            else if (m === constants.BSON_DATA_LONG) {
                var $ = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24,
                    U = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24,
                    D = new long_1$1($, U);
                g[E] = l && !0 === d && D.lessThanOrEqual(JS_INT_MAX_LONG) && D.greaterThanOrEqual(JS_INT_MIN_LONG) ? D.toNumber() : D
            } else if (m === constants.BSON_DATA_DECIMAL128) {
                var x = Buffer$4.alloc(16);
                e.copy(x, 0, t, t + 16), t += 16;
                var L = new decimal128(x);
                g[E] = L.toObject ? L.toObject() : L
            } else if (m === constants.BSON_DATA_BINARY) {
                var F = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24,
                    k = F,
                    M = e[t++];
                if (F < 0) throw new Error("Negative binary type element size found");
                if (F > Buffer$4.byteLength(e)) throw new Error("Binary type size larger than document size");
                if (null != e.slice) {
                    if (M === binary.SUBTYPE_BYTE_ARRAY) {
                        if ((F = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24) < 0) throw new Error("Negative binary type element size found for subtype 0x02");
                        if (k - 4 < F) throw new Error("Binary type with subtype 0x02 contains to long binary size");
                        if (F < k - 4) throw new Error("Binary type with subtype 0x02 contains to short binary size")
                    }
                    g[E] = h && d ? e.slice(t, t + F) : new binary(e.slice(t, t + F), M)
                } else {
                    var j = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(F)) : new Array(F);
                    if (M === binary.SUBTYPE_BYTE_ARRAY) {
                        if ((F = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24) < 0) throw new Error("Negative binary type element size found for subtype 0x02");
                        if (k - 4 < F) throw new Error("Binary type with subtype 0x02 contains to long binary size");
                        if (F < k - 4) throw new Error("Binary type with subtype 0x02 contains to short binary size")
                    }
                    for (_ = 0; _ < F; _++) j[_] = e[t + _];
                    g[E] = h && d ? j : new binary(j, M)
                }
                t += F
            } else if (m === constants.BSON_DATA_REGEXP && !1 === f) {
                for (_ = t; 0 !== e[_] && _ < e.length;) _++;
                if (_ >= e.length) throw new Error("Bad BSON Document: illegal CString");
                var z = e.toString("utf8", t, _);
                for (_ = t = _ + 1; 0 !== e[_] && _ < e.length;) _++;
                if (_ >= e.length) throw new Error("Bad BSON Document: illegal CString");
                var q = e.toString("utf8", t, _);
                t = _ + 1;
                var V = new Array(q.length);
                for (_ = 0; _ < q.length; _++) switch (q[_]) {
                    case "m":
                        V[_] = "m";
                        break;
                    case "s":
                        V[_] = "g";
                        break;
                    case "i":
                        V[_] = "i"
                }
                g[E] = new RegExp(z, V.join(""))
            } else if (m === constants.BSON_DATA_REGEXP && !0 === f) {
                for (_ = t; 0 !== e[_] && _ < e.length;) _++;
                if (_ >= e.length) throw new Error("Bad BSON Document: illegal CString");
                var Y = e.toString("utf8", t, _);
                for (_ = t = _ + 1; 0 !== e[_] && _ < e.length;) _++;
                if (_ >= e.length) throw new Error("Bad BSON Document: illegal CString");
                var K = e.toString("utf8", t, _);
                t = _ + 1, g[E] = new regexp(Y, K)
            } else if (m === constants.BSON_DATA_SYMBOL) {
                var W = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                if (W <= 0 || W > e.length - t || 0 !== e[t + W - 1]) throw new Error("bad string length in bson");
                g[E] = e.toString("utf8", t, t + W - 1), t += W
            } else if (m === constants.BSON_DATA_TIMESTAMP) {
                var H = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24,
                    G = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                g[E] = new timestamp(H, G)
            } else if (m === constants.BSON_DATA_MIN_KEY) g[E] = new min_key;
            else if (m === constants.BSON_DATA_MAX_KEY) g[E] = new max_key;
            else if (m === constants.BSON_DATA_CODE) {
                var J = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                if (J <= 0 || J > e.length - t || 0 !== e[t + J - 1]) throw new Error("bad string length in bson");
                var X = e.toString("utf8", t, t + J - 1);
                if (o)
                    if (i) {
                        var Z = s ? u(X) : X;
                        g[E] = isolateEvalWithHash(functionCache, Z, X, g)
                    } else g[E] = isolateEval(X);
                else g[E] = new code$1(X);
                t += J
            } else if (m === constants.BSON_DATA_CODE_W_SCOPE) {
                var Q = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                if (Q < 13) throw new Error("code_w_scope total size shorter minimum expected length");
                var ee = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                if (ee <= 0 || ee > e.length - t || 0 !== e[t + ee - 1]) throw new Error("bad string length in bson");
                var te = e.toString("utf8", t, t + ee - 1),
                    re = t += ee,
                    ne = e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24,
                    oe = deserializeObject(e, re, r, !1);
                if (t += ne, Q < 8 + ne + ee) throw new Error("code_w_scope total size is to short, truncating scope");
                if (8 + ne + ee < Q) throw new Error("code_w_scope total size is to long, clips outer document");
                if (o) {
                    if (i) {
                        var ie = s ? u(te) : te;
                        g[E] = isolateEvalWithHash(functionCache, ie, te, g)
                    } else g[E] = isolateEval(te);
                    g[E].scope = oe
                } else g[E] = new code$1(te, oe)
            } else {
                if (m !== constants.BSON_DATA_DBPOINTER) throw new Error("Detected unknown BSON type " + m.toString(16) + ' for fieldname "' + E + '", are you using the latest BSON parser?');
                var se = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                if (se <= 0 || se > e.length - t || 0 !== e[t + se - 1]) throw new Error("bad string length in bson");
                if (!validateUtf8$1(e, t, t + se - 1)) throw new Error("Invalid UTF-8 string in BSON document");
                var ue = e.toString("utf8", t, t + se - 1);
                t += se;
                var ae = Buffer$4.alloc(12);
                e.copy(ae, 0, t, t + 12);
                var ce = new objectid(ae);
                t += 12, g[E] = new db_ref(ue, ce)
            }
        }
        if (y !== t - p) {
            if (n) throw new Error("corrupt array bson");
            throw new Error("corrupt object bson")
        }
        var fe = Object.keys(g).filter(function(e) {
                return e.startsWith("$")
            }),
            he = !0;
        if (fe.forEach(function(e) {
                -1 === ["$ref", "$id", "$db"].indexOf(e) && (he = !1)
            }), !he) return g;
        if (null != g.$id && null != g.$ref) {
            var le = Object.assign({}, g);
            return delete le.$ref, delete le.$id, delete le.$db, new db_ref(g.$ref, g.$id, g.$db || null, le)
        }
        return g
    }

    function isolateEvalWithHash(functionCache, hash, functionString, object) {
        var value = null;
        return null == functionCache[hash] && (eval("value = " + functionString), functionCache[hash] = value), functionCache[hash].bind(object)
    }

    function isolateEval(functionString) {
        var value = null;
        return eval("value = " + functionString), value
    }
    var deserializer = deserialize$1;

    function readIEEE754(e, t, r, n, o) {
        var i, s, u = "big" === r,
            a = 8 * o - n - 1,
            c = (1 << a) - 1,
            f = c >> 1,
            h = -7,
            l = u ? 0 : o - 1,
            d = u ? 1 : -1,
            p = e[t + l];
        for (l += d, i = p & (1 << -h) - 1, p >>= -h, h += a; 0 < h; i = 256 * i + e[t + l], l += d, h -= 8);
        for (s = i & (1 << -h) - 1, i >>= -h, h += n; 0 < h; s = 256 * s + e[t + l], l += d, h -= 8);
        if (0 === i) i = 1 - f;
        else {
            if (i === c) return s ? NaN : 1 / 0 * (p ? -1 : 1);
            s += Math.pow(2, n), i -= f
        }
        return (p ? -1 : 1) * s * Math.pow(2, i - n)
    }

    function writeIEEE754(e, t, r, n, o, i) {
        var s, u, a, c = "big" === n,
            f = 8 * i - o - 1,
            h = (1 << f) - 1,
            l = h >> 1,
            d = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            p = c ? i - 1 : 0,
            y = c ? -1 : 1,
            g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (u = isNaN(t) ? 1 : 0, s = h) : (s = Math.floor(Math.log(t) / Math.LN2), t * (a = Math.pow(2, -s)) < 1 && (s--, a *= 2), 2 <= (t += 1 <= s + l ? d / a : d * Math.pow(2, 1 - l)) * a && (s++, a /= 2), h <= s + l ? (u = 0, s = h) : 1 <= s + l ? (u = (t * a - 1) * Math.pow(2, o), s += l) : (u = t * Math.pow(2, l - 1) * Math.pow(2, o), s = 0)), isNaN(t) && (u = 0); 8 <= o;) e[r + p] = 255 & u, p += y, u /= 256, o -= 8;
        for (s = s << o | u, isNaN(t) && (s += 8), f += o; 0 < f;) e[r + p] = 255 & s, p += y, s /= 256, f -= 8;
        e[r + p - y] |= 128 * g
    }
    var float_parser = {
        readIEEE754: readIEEE754,
        writeIEEE754: writeIEEE754
    };

    function _typeof$3(e) {
        return (_typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var Buffer$5 = buffer.Buffer,
        writeIEEE754$1 = float_parser.writeIEEE754,
        normalizedFunctionString$1 = utils.normalizedFunctionString,
        regexp$1 = /\x00/,
        ignoreKeys = new Set(["$db", "$ref", "$id", "$clusterTime"]),
        isDate$1 = function(e) {
            return "object" === _typeof$3(e) && "[object Date]" === Object.prototype.toString.call(e)
        },
        isRegExp$1 = function(e) {
            return "[object RegExp]" === Object.prototype.toString.call(e)
        };

    function serializeString(e, t, r, n, o) {
        e[n++] = constants.BSON_DATA_STRING;
        var i = o ? e.write(t, n, "ascii") : e.write(t, n, "utf8");
        e[(n = n + i + 1) - 1] = 0;
        var s = e.write(r, n + 4, "utf8");
        return e[n + 3] = s + 1 >> 24 & 255, e[n + 2] = s + 1 >> 16 & 255, e[n + 1] = s + 1 >> 8 & 255, e[n] = s + 1 & 255, n = n + 4 + s, e[n++] = 0, n
    }

    function serializeNumber(e, t, r, n, o) {
        if (Math.floor(r) === r && r >= constants.JS_INT_MIN && r <= constants.JS_INT_MAX)
            if (r >= constants.BSON_INT32_MIN && r <= constants.BSON_INT32_MAX) e[n++] = constants.BSON_DATA_INT, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, e[n++] = 255 & r, e[n++] = r >> 8 & 255, e[n++] = r >> 16 & 255, e[n++] = r >> 24 & 255;
            else if (r >= constants.JS_INT_MIN && r <= constants.JS_INT_MAX) {
            e[n++] = constants.BSON_DATA_NUMBER, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, writeIEEE754$1(e, r, n, "little", 52, 8), n += 8
        } else {
            e[n++] = constants.BSON_DATA_LONG, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var i = long_1$1.fromNumber(r),
                s = i.getLowBits(),
                u = i.getHighBits();
            e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255, e[n++] = 255 & u, e[n++] = u >> 8 & 255, e[n++] = u >> 16 & 255, e[n++] = u >> 24 & 255
        } else e[n++] = constants.BSON_DATA_NUMBER, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, writeIEEE754$1(e, r, n, "little", 52, 8), n += 8;
        return n
    }

    function serializeNull(e, t, r, n, o) {
        return e[n++] = constants.BSON_DATA_NULL, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, n
    }

    function serializeBoolean(e, t, r, n, o) {
        return e[n++] = constants.BSON_DATA_BOOLEAN, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, e[n++] = r ? 1 : 0, n
    }

    function serializeDate(e, t, r, n, o) {
        e[n++] = constants.BSON_DATA_DATE, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var i = long_1$1.fromNumber(r.getTime()),
            s = i.getLowBits(),
            u = i.getHighBits();
        return e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255, e[n++] = 255 & u, e[n++] = u >> 8 & 255, e[n++] = u >> 16 & 255, e[n++] = u >> 24 & 255, n
    }

    function serializeRegExp(e, t, r, n, o) {
        if (e[n++] = constants.BSON_DATA_REGEXP, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, r.source && null != r.source.match(regexp$1)) throw Error("value " + r.source + " must not contain null bytes");
        return n += e.write(r.source, n, "utf8"), e[n++] = 0, r.ignoreCase && (e[n++] = 105), r.global && (e[n++] = 115), r.multiline && (e[n++] = 109), e[n++] = 0, n
    }

    function serializeBSONRegExp(e, t, r, n, o) {
        if (e[n++] = constants.BSON_DATA_REGEXP, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, null != r.pattern.match(regexp$1)) throw Error("pattern " + r.pattern + " must not contain null bytes");
        return n += e.write(r.pattern, n, "utf8"), e[n++] = 0, n += e.write(r.options.split("").sort().join(""), n, "utf8"), e[n++] = 0, n
    }

    function serializeMinMax(e, t, r, n, o) {
        return null === r ? e[n++] = constants.BSON_DATA_NULL : "MinKey" === r._bsontype ? e[n++] = constants.BSON_DATA_MIN_KEY : e[n++] = constants.BSON_DATA_MAX_KEY, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, n
    }

    function serializeObjectId(e, t, r, n, o) {
        if (e[n++] = constants.BSON_DATA_OID, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, "string" == typeof r.id) e.write(r.id, n, "binary");
        else {
            if (!r.id || !r.id.copy) throw new TypeError("object [" + JSON.stringify(r) + "] is not a valid ObjectId");
            r.id.copy(e, n, 0, 12)
        }
        return n + 12
    }

    function serializeBuffer(e, t, r, n, o) {
        e[n++] = constants.BSON_DATA_BINARY, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var i = r.length;
        return e[n++] = 255 & i, e[n++] = i >> 8 & 255, e[n++] = i >> 16 & 255, e[n++] = i >> 24 & 255, e[n++] = constants.BSON_BINARY_SUBTYPE_DEFAULT, r.copy(e, n, 0, i), n += i
    }

    function serializeObject(e, t, r, n, o, i, s, u, a, c) {
        for (var f = 0; f < c.length; f++)
            if (c[f] === r) throw new Error("cyclic dependency detected");
        c.push(r), e[n++] = Array.isArray(r) ? constants.BSON_DATA_ARRAY : constants.BSON_DATA_OBJECT, n += a ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var h = serializeInto(e, r, o, n, i + 1, s, u, c);
        return c.pop(), h
    }

    function serializeDecimal128(e, t, r, n, o) {
        return e[n++] = constants.BSON_DATA_DECIMAL128, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, r.bytes.copy(e, n, 0, 16), n + 16
    }

    function serializeLong(e, t, r, n, o) {
        e[n++] = "Long" === r._bsontype ? constants.BSON_DATA_LONG : constants.BSON_DATA_TIMESTAMP, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var i = r.getLowBits(),
            s = r.getHighBits();
        return e[n++] = 255 & i, e[n++] = i >> 8 & 255, e[n++] = i >> 16 & 255, e[n++] = i >> 24 & 255, e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255, n
    }

    function serializeInt32(e, t, r, n, o) {
        return e[n++] = constants.BSON_DATA_INT, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, e[n++] = 255 & r, e[n++] = r >> 8 & 255, e[n++] = r >> 16 & 255, e[n++] = r >> 24 & 255, n
    }

    function serializeDouble(e, t, r, n, o) {
        return e[n++] = constants.BSON_DATA_NUMBER, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, writeIEEE754$1(e, r.value, n, "little", 52, 8), n += 8
    }

    function serializeFunction(e, t, r, n, o, i, s) {
        e[n++] = constants.BSON_DATA_CODE, n += s ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var u = normalizedFunctionString$1(r),
            a = e.write(u, n + 4, "utf8") + 1;
        return e[n] = 255 & a, e[n + 1] = a >> 8 & 255, e[n + 2] = a >> 16 & 255, e[n + 3] = a >> 24 & 255, n = n + 4 + a - 1, e[n++] = 0, n
    }

    function serializeCode(e, t, r, n, o, i, s, u, a) {
        if (r.scope && "object" === _typeof$3(r.scope)) {
            e[n++] = constants.BSON_DATA_CODE_W_SCOPE, n += a ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var c = n,
                f = "string" == typeof r.code ? r.code : r.code.toString();
            n += 4;
            var h = e.write(f, n + 4, "utf8") + 1;
            e[n] = 255 & h, e[n + 1] = h >> 8 & 255, e[n + 2] = h >> 16 & 255, e[n + 3] = h >> 24 & 255, e[n + 4 + h - 1] = 0, n = n + h + 4;
            var l = serializeInto(e, r.scope, o, n, i + 1, s, u);
            n = l - 1;
            var d = l - c;
            e[c++] = 255 & d, e[c++] = d >> 8 & 255, e[c++] = d >> 16 & 255, e[c++] = d >> 24 & 255, e[n++] = 0
        } else {
            e[n++] = constants.BSON_DATA_CODE, n += a ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var p = r.code.toString(),
                y = e.write(p, n + 4, "utf8") + 1;
            e[n] = 255 & y, e[n + 1] = y >> 8 & 255, e[n + 2] = y >> 16 & 255, e[n + 3] = y >> 24 & 255, n = n + 4 + y - 1, e[n++] = 0
        }
        return n
    }

    function serializeBinary(e, t, r, n, o) {
        e[n++] = constants.BSON_DATA_BINARY, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var i = r.value(!0),
            s = r.position;
        return r.sub_type === binary.SUBTYPE_BYTE_ARRAY && (s += 4), e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255, e[n++] = r.sub_type, r.sub_type === binary.SUBTYPE_BYTE_ARRAY && (s -= 4, e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255), i.copy(e, n, 0, r.position), n += r.position
    }

    function serializeSymbol(e, t, r, n, o) {
        e[n++] = constants.BSON_DATA_SYMBOL, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var i = e.write(r.value, n + 4, "utf8") + 1;
        return e[n] = 255 & i, e[n + 1] = i >> 8 & 255, e[n + 2] = i >> 16 & 255, e[n + 3] = i >> 24 & 255, n = n + 4 + i - 1, e[n++] = 0, n
    }

    function serializeDBRef(e, t, r, n, o, i, s) {
        e[n++] = constants.BSON_DATA_OBJECT, n += s ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var u, a = n,
            c = {
                $ref: r.collection || r.namespace,
                $id: r.oid
            };
        null != r.db && (c.$db = r.db);
        var f = (u = serializeInto(e, c = Object.assign(c, r.fields), !1, n, o + 1, i)) - a;
        return e[a++] = 255 & f, e[a++] = f >> 8 & 255, e[a++] = f >> 16 & 255, e[a++] = f >> 24 & 255, u
    }

    function serializeInto(e, t, r, n, o, i, s, u) {
        n = n || 0, (u = u || []).push(t);
        var a = n + 4;
        if (Array.isArray(t))
            for (var c = 0; c < t.length; c++) {
                var f = "" + c,
                    h = t[c];
                if (h && h.toBSON) {
                    if ("function" != typeof h.toBSON) throw new TypeError("toBSON is not a function");
                    h = h.toBSON()
                }
                var l = _typeof$3(h);
                if ("string" === l) a = serializeString(e, f, h, a, !0);
                else if ("number" === l) a = serializeNumber(e, f, h, a, !0);
                else if ("boolean" === l) a = serializeBoolean(e, f, h, a, !0);
                else if (h instanceof Date || isDate$1(h)) a = serializeDate(e, f, h, a, !0);
                else if (void 0 === h) a = serializeNull(e, f, h, a, !0);
                else if (null === h) a = serializeNull(e, f, h, a, !0);
                else if ("ObjectId" === h._bsontype || "ObjectID" === h._bsontype) a = serializeObjectId(e, f, h, a, !0);
                else if (Buffer$5.isBuffer(h)) a = serializeBuffer(e, f, h, a, !0);
                else if (h instanceof RegExp || isRegExp$1(h)) a = serializeRegExp(e, f, h, a, !0);
                else if ("object" === l && null == h._bsontype) a = serializeObject(e, f, h, a, r, o, i, s, !0, u);
                else if ("object" === l && "Decimal128" === h._bsontype) a = serializeDecimal128(e, f, h, a, !0);
                else if ("Long" === h._bsontype || "Timestamp" === h._bsontype) a = serializeLong(e, f, h, a, !0);
                else if ("Double" === h._bsontype) a = serializeDouble(e, f, h, a, !0);
                else if ("function" == typeof h && i) a = serializeFunction(e, f, h, a, r, o, i, !0);
                else if ("Code" === h._bsontype) a = serializeCode(e, f, h, a, r, o, i, s, !0);
                else if ("Binary" === h._bsontype) a = serializeBinary(e, f, h, a, !0);
                else if ("Symbol" === h._bsontype) a = serializeSymbol(e, f, h, a, !0);
                else if ("DBRef" === h._bsontype) a = serializeDBRef(e, f, h, a, o, i, !0);
                else if ("BSONRegExp" === h._bsontype) a = serializeBSONRegExp(e, f, h, a, !0);
                else if ("Int32" === h._bsontype) a = serializeInt32(e, f, h, a, !0);
                else if ("MinKey" === h._bsontype || "MaxKey" === h._bsontype) a = serializeMinMax(e, f, h, a, !0);
                else if (void 0 !== h._bsontype) throw new TypeError("Unrecognized or invalid _bsontype: " + h._bsontype)
            } else if (t instanceof map)
                for (var d = t.entries(), p = !1; !p;) {
                    var y = d.next();
                    if (!(p = y.done)) {
                        var g = y.value[0],
                            v = y.value[1],
                            m = _typeof$3(v);
                        if ("string" == typeof g && !ignoreKeys.has(g)) {
                            if (null != g.match(regexp$1)) throw Error("key " + g + " must not contain null bytes");
                            if (r) {
                                if ("$" === g[0]) throw Error("key " + g + " must not start with '$'");
                                if (~g.indexOf(".")) throw Error("key " + g + " must not contain '.'")
                            }
                        }
                        if ("string" === m) a = serializeString(e, g, v, a);
                        else if ("number" === m) a = serializeNumber(e, g, v, a);
                        else if ("boolean" === m) a = serializeBoolean(e, g, v, a);
                        else if (v instanceof Date || isDate$1(v)) a = serializeDate(e, g, v, a);
                        else if (null === v || void 0 === v && !1 === s) a = serializeNull(e, g, v, a);
                        else if ("ObjectId" === v._bsontype || "ObjectID" === v._bsontype) a = serializeObjectId(e, g, v, a);
                        else if (Buffer$5.isBuffer(v)) a = serializeBuffer(e, g, v, a);
                        else if (v instanceof RegExp || isRegExp$1(v)) a = serializeRegExp(e, g, v, a);
                        else if ("object" === m && null == v._bsontype) a = serializeObject(e, g, v, a, r, o, i, s, !1, u);
                        else if ("object" === m && "Decimal128" === v._bsontype) a = serializeDecimal128(e, g, v, a);
                        else if ("Long" === v._bsontype || "Timestamp" === v._bsontype) a = serializeLong(e, g, v, a);
                        else if ("Double" === v._bsontype) a = serializeDouble(e, g, v, a);
                        else if ("Code" === v._bsontype) a = serializeCode(e, g, v, a, r, o, i, s);
                        else if ("function" == typeof v && i) a = serializeFunction(e, g, v, a, r, o, i);
                        else if ("Binary" === v._bsontype) a = serializeBinary(e, g, v, a);
                        else if ("Symbol" === v._bsontype) a = serializeSymbol(e, g, v, a);
                        else if ("DBRef" === v._bsontype) a = serializeDBRef(e, g, v, a, o, i);
                        else if ("BSONRegExp" === v._bsontype) a = serializeBSONRegExp(e, g, v, a);
                        else if ("Int32" === v._bsontype) a = serializeInt32(e, g, v, a);
                        else if ("MinKey" === v._bsontype || "MaxKey" === v._bsontype) a = serializeMinMax(e, g, v, a);
                        else if (void 0 !== v._bsontype) throw new TypeError("Unrecognized or invalid _bsontype: " + v._bsontype)
                    }
                } else {
                    if (t.toBSON) {
                        if ("function" != typeof t.toBSON) throw new TypeError("toBSON is not a function");
                        if (null != (t = t.toBSON()) && "object" !== _typeof$3(t)) throw new TypeError("toBSON function did not return an object")
                    }
                    for (var _ in t) {
                        var E = t[_];
                        if (E && E.toBSON) {
                            if ("function" != typeof E.toBSON) throw new TypeError("toBSON is not a function");
                            E = E.toBSON()
                        }
                        var A = _typeof$3(E);
                        if ("string" == typeof _ && !ignoreKeys.has(_)) {
                            if (null != _.match(regexp$1)) throw Error("key " + _ + " must not contain null bytes");
                            if (r) {
                                if ("$" === _[0]) throw Error("key " + _ + " must not start with '$'");
                                if (~_.indexOf(".")) throw Error("key " + _ + " must not contain '.'")
                            }
                        }
                        if ("string" === A) a = serializeString(e, _, E, a);
                        else if ("number" === A) a = serializeNumber(e, _, E, a);
                        else if ("boolean" === A) a = serializeBoolean(e, _, E, a);
                        else if (E instanceof Date || isDate$1(E)) a = serializeDate(e, _, E, a);
                        else if (void 0 === E) !1 === s && (a = serializeNull(e, _, E, a));
                        else if (null === E) a = serializeNull(e, _, E, a);
                        else if ("ObjectId" === E._bsontype || "ObjectID" === E._bsontype) a = serializeObjectId(e, _, E, a);
                        else if (Buffer$5.isBuffer(E)) a = serializeBuffer(e, _, E, a);
                        else if (E instanceof RegExp || isRegExp$1(E)) a = serializeRegExp(e, _, E, a);
                        else if ("object" === A && null == E._bsontype) a = serializeObject(e, _, E, a, r, o, i, s, !1, u);
                        else if ("object" === A && "Decimal128" === E._bsontype) a = serializeDecimal128(e, _, E, a);
                        else if ("Long" === E._bsontype || "Timestamp" === E._bsontype) a = serializeLong(e, _, E, a);
                        else if ("Double" === E._bsontype) a = serializeDouble(e, _, E, a);
                        else if ("Code" === E._bsontype) a = serializeCode(e, _, E, a, r, o, i, s);
                        else if ("function" == typeof E && i) a = serializeFunction(e, _, E, a, r, o, i);
                        else if ("Binary" === E._bsontype) a = serializeBinary(e, _, E, a);
                        else if ("Symbol" === E._bsontype) a = serializeSymbol(e, _, E, a);
                        else if ("DBRef" === E._bsontype) a = serializeDBRef(e, _, E, a, o, i);
                        else if ("BSONRegExp" === E._bsontype) a = serializeBSONRegExp(e, _, E, a);
                        else if ("Int32" === E._bsontype) a = serializeInt32(e, _, E, a);
                        else if ("MinKey" === E._bsontype || "MaxKey" === E._bsontype) a = serializeMinMax(e, _, E, a);
                        else if (void 0 !== E._bsontype) throw new TypeError("Unrecognized or invalid _bsontype: " + E._bsontype)
                    }
                }
        u.pop(), e[a++] = 0;
        var b = a - n;
        return e[n++] = 255 & b, e[n++] = b >> 8 & 255, e[n++] = b >> 16 & 255, e[n++] = b >> 24 & 255, a
    }
    var serializer = serializeInto;

    function _typeof$4(e) {
        return (_typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var Buffer$6 = buffer.Buffer,
        normalizedFunctionString$2 = utils.normalizedFunctionString;

    function isDate$2(e) {
        return "object" === _typeof$4(e) && "[object Date]" === Object.prototype.toString.call(e)
    }

    function calculateObjectSize(e, t, r) {
        var n = 5;
        if (Array.isArray(e))
            for (var o = 0; o < e.length; o++) n += calculateElement(o.toString(), e[o], t, !0, r);
        else
            for (var i in e.toBSON && (e = e.toBSON()), e) n += calculateElement(i, e[i], t, !1, r);
        return n
    }

    function calculateElement(e, t, r, n, o) {
        switch (t && t.toBSON && (t = t.toBSON()), _typeof$4(t)) {
            case "string":
                return 1 + Buffer$6.byteLength(e, "utf8") + 1 + 4 + Buffer$6.byteLength(t, "utf8") + 1;
            case "number":
                return Math.floor(t) === t && t >= constants.JS_INT_MIN && t <= constants.JS_INT_MAX && t >= constants.BSON_INT32_MIN && t <= constants.BSON_INT32_MAX ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 5 : (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 9;
            case "undefined":
                return n || !o ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 : 0;
            case "boolean":
                return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 2;
            case "object":
                if (null == t || "MinKey" === t._bsontype || "MaxKey" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1;
                if ("ObjectId" === t._bsontype || "ObjectID" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 13;
                if (t instanceof Date || isDate$2(t)) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 9;
                if (void 0 !== Buffer$6 && Buffer$6.isBuffer(t)) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 6 + t.length;
                if ("Long" === t._bsontype || "Double" === t._bsontype || "Timestamp" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 9;
                if ("Decimal128" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 17;
                if ("Code" === t._bsontype) return null != t.scope && 0 < Object.keys(t.scope).length ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + 4 + Buffer$6.byteLength(t.code.toString(), "utf8") + 1 + calculateObjectSize(t.scope, r, o) : (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + Buffer$6.byteLength(t.code.toString(), "utf8") + 1;
                if ("Binary" === t._bsontype) return t.sub_type === binary.SUBTYPE_BYTE_ARRAY ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + (t.position + 1 + 4 + 1 + 4) : (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + (t.position + 1 + 4 + 1);
                if ("Symbol" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + Buffer$6.byteLength(t.value, "utf8") + 4 + 1 + 1;
                if ("DBRef" === t._bsontype) {
                    var i = Object.assign({
                        $ref: t.collection,
                        $id: t.oid
                    }, t.fields);
                    return null != t.db && (i.$db = t.db), (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + calculateObjectSize(i, r, o)
                }
                return t instanceof RegExp || "[object RegExp]" === Object.prototype.toString.call(t) ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + Buffer$6.byteLength(t.source, "utf8") + 1 + (t.global ? 1 : 0) + (t.ignoreCase ? 1 : 0) + (t.multiline ? 1 : 0) + 1 : "BSONRegExp" === t._bsontype ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + Buffer$6.byteLength(t.pattern, "utf8") + 1 + Buffer$6.byteLength(t.options, "utf8") + 1 : (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + calculateObjectSize(t, r, o) + 1;
            case "function":
                if (t instanceof RegExp || "[object RegExp]" === Object.prototype.toString.call(t) || "[object RegExp]" === String.call(t)) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + Buffer$6.byteLength(t.source, "utf8") + 1 + (t.global ? 1 : 0) + (t.ignoreCase ? 1 : 0) + (t.multiline ? 1 : 0) + 1;
                if (r && null != t.scope && 0 < Object.keys(t.scope).length) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + 4 + Buffer$6.byteLength(normalizedFunctionString$2(t), "utf8") + 1 + calculateObjectSize(t.scope, r, o);
                if (r) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + Buffer$6.byteLength(normalizedFunctionString$2(t), "utf8") + 1
        }
        return 0
    }
    var calculate_size = calculateObjectSize,
        Buffer$7 = buffer.Buffer,
        ensure_buffer = function(e) {
            if (e instanceof Buffer$7) return e;
            if (e instanceof Uint8Array) return Buffer$7.from(e.buffer);
            throw new TypeError("Must use either Buffer or Uint8Array")
        },
        Buffer$8 = buffer.Buffer,
        MAXSIZE = 17825792,
        buffer$1 = Buffer$8.alloc(MAXSIZE);

    function setInternalBufferSize(e) {
        buffer$1.length < e && (buffer$1 = Buffer$8.alloc(e))
    }

    function serialize$1(e, t) {
        var r = "boolean" == typeof(t = t || {}).checkKeys && t.checkKeys,
            n = "boolean" == typeof t.serializeFunctions && t.serializeFunctions,
            o = "boolean" != typeof t.ignoreUndefined || t.ignoreUndefined,
            i = "number" == typeof t.minInternalBufferSize ? t.minInternalBufferSize : MAXSIZE;
        buffer$1.length < i && (buffer$1 = Buffer$8.alloc(i));
        var s = serializer(buffer$1, e, r, 0, 0, n, o, []),
            u = Buffer$8.alloc(s);
        return buffer$1.copy(u, 0, 0, u.length), u
    }

    function serializeWithBufferAndIndex(e, t, r) {
        var n = "boolean" == typeof(r = r || {}).checkKeys && r.checkKeys,
            o = "boolean" == typeof r.serializeFunctions && r.serializeFunctions,
            i = "boolean" != typeof r.ignoreUndefined || r.ignoreUndefined,
            s = "number" == typeof r.index ? r.index : 0,
            u = serializer(buffer$1, e, n, 0, 0, o, i);
        return buffer$1.copy(t, s, 0, u), s + u - 1
    }

    function deserialize$2(e, t) {
        return e = ensure_buffer(e), deserializer(e, t)
    }

    function calculateObjectSize$1(e, t) {
        var r = "boolean" == typeof(t = t || {}).serializeFunctions && t.serializeFunctions,
            n = "boolean" != typeof t.ignoreUndefined || t.ignoreUndefined;
        return calculate_size(e, r, n)
    }

    function deserializeStream(e, t, r, n, o, i) {
        i = Object.assign({
            allowObjectSmallerThanBufferSize: !0
        }, i), e = ensure_buffer(e);
        for (var s = t, u = 0; u < r; u++) {
            var a = e[s] | e[s + 1] << 8 | e[s + 2] << 16 | e[s + 3] << 24;
            i.index = s, n[o + u] = deserializer(e, i), s += a
        }
        return s
    }
    var bson = {
            BSON_INT32_MAX: constants.BSON_INT32_MAX,
            BSON_INT32_MIN: constants.BSON_INT32_MIN,
            BSON_INT64_MAX: constants.BSON_INT64_MAX,
            BSON_INT64_MIN: constants.BSON_INT64_MIN,
            JS_INT_MAX: constants.JS_INT_MAX,
            JS_INT_MIN: constants.JS_INT_MIN,
            BSON_DATA_NUMBER: constants.BSON_DATA_NUMBER,
            BSON_DATA_STRING: constants.BSON_DATA_STRING,
            BSON_DATA_OBJECT: constants.BSON_DATA_OBJECT,
            BSON_DATA_ARRAY: constants.BSON_DATA_ARRAY,
            BSON_DATA_BINARY: constants.BSON_DATA_BINARY,
            BSON_DATA_UNDEFINED: constants.BSON_DATA_UNDEFINED,
            BSON_DATA_OID: constants.BSON_DATA_OID,
            BSON_DATA_BOOLEAN: constants.BSON_DATA_BOOLEAN,
            BSON_DATA_DATE: constants.BSON_DATA_DATE,
            BSON_DATA_NULL: constants.BSON_DATA_NULL,
            BSON_DATA_REGEXP: constants.BSON_DATA_REGEXP,
            BSON_DATA_DBPOINTER: constants.BSON_DATA_DBPOINTER,
            BSON_DATA_CODE: constants.BSON_DATA_CODE,
            BSON_DATA_SYMBOL: constants.BSON_DATA_SYMBOL,
            BSON_DATA_CODE_W_SCOPE: constants.BSON_DATA_CODE_W_SCOPE,
            BSON_DATA_INT: constants.BSON_DATA_INT,
            BSON_DATA_TIMESTAMP: constants.BSON_DATA_TIMESTAMP,
            BSON_DATA_LONG: constants.BSON_DATA_LONG,
            BSON_DATA_DECIMAL128: constants.BSON_DATA_DECIMAL128,
            BSON_DATA_MIN_KEY: constants.BSON_DATA_MIN_KEY,
            BSON_DATA_MAX_KEY: constants.BSON_DATA_MAX_KEY,
            BSON_BINARY_SUBTYPE_DEFAULT: constants.BSON_BINARY_SUBTYPE_DEFAULT,
            BSON_BINARY_SUBTYPE_FUNCTION: constants.BSON_BINARY_SUBTYPE_FUNCTION,
            BSON_BINARY_SUBTYPE_BYTE_ARRAY: constants.BSON_BINARY_SUBTYPE_BYTE_ARRAY,
            BSON_BINARY_SUBTYPE_UUID: constants.BSON_BINARY_SUBTYPE_UUID,
            BSON_BINARY_SUBTYPE_MD5: constants.BSON_BINARY_SUBTYPE_MD5,
            BSON_BINARY_SUBTYPE_USER_DEFINED: constants.BSON_BINARY_SUBTYPE_USER_DEFINED,
            Code: code$1,
            Map: map,
            BSONSymbol: symbol,
            DBRef: db_ref,
            Binary: binary,
            ObjectId: objectid,
            Long: long_1$1,
            Timestamp: timestamp,
            Double: double_1,
            Int32: int_32,
            MinKey: min_key,
            MaxKey: max_key,
            BSONRegExp: regexp,
            Decimal128: decimal128,
            serialize: serialize$1,
            serializeWithBufferAndIndex: serializeWithBufferAndIndex,
            deserialize: deserialize$2,
            calculateObjectSize: calculateObjectSize$1,
            deserializeStream: deserializeStream,
            setInternalBufferSize: setInternalBufferSize,
            ObjectID: objectid,
            EJSON: extended_json
        },
        bson_54 = bson.EJSON,
        AuthEventKind, wO;
    wO = AuthEventKind || (AuthEventKind = {}), wO[wO.ActiveUserChanged = 0] = "ActiveUserChanged", wO[wO.ListenerRegistered = 1] = "ListenerRegistered", wO[wO.UserAdded = 2] = "UserAdded", wO[wO.UserLinked = 3] = "UserLinked", wO[wO.UserLoggedIn = 4] = "UserLoggedIn", wO[wO.UserLoggedOut = 5] = "UserLoggedOut", wO[wO.UserRemoved = 6] = "UserRemoved";
    var AuthInfo = function() {
            function r(e, t, r, n, o, i, s, u) {
                this.userId = e, this.deviceId = t, this.accessToken = r, this.refreshToken = n, this.loggedInProviderType = o, this.loggedInProviderName = i, this.lastAuthActivity = s, this.userProfile = u
            }
            return r.empty = function() {
                return new r(void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0)
            }, Object.defineProperty(r.prototype, "hasUser", {
                get: function() {
                    return void 0 !== this.userId
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(r.prototype, "isEmpty", {
                get: function() {
                    return void 0 === this.deviceId
                },
                enumerable: !0,
                configurable: !0
            }), r.prototype.loggedOut = function() {
                return new r(this.userId, this.deviceId, void 0, void 0, this.loggedInProviderType, this.loggedInProviderName, new Date, this.userProfile)
            }, r.prototype.withClearedUser = function() {
                return new r(void 0, this.deviceId, void 0, void 0, void 0, void 0, void 0, void 0)
            }, r.prototype.withAuthProvider = function(e, t) {
                return new r(this.userId, this.deviceId, this.accessToken, this.refreshToken, e, t, new Date, this.userProfile)
            }, r.prototype.withNewAuthActivityTime = function() {
                return new r(this.userId, this.deviceId, this.accessToken, this.refreshToken, this.loggedInProviderType, this.loggedInProviderName, new Date, this.userProfile)
            }, Object.defineProperty(r.prototype, "isLoggedIn", {
                get: function() {
                    return void 0 !== this.accessToken && void 0 !== this.refreshToken
                },
                enumerable: !0,
                configurable: !0
            }), r.prototype.merge = function(e) {
                return new r(void 0 === e.userId ? this.userId : e.userId, void 0 === e.deviceId ? this.deviceId : e.deviceId, void 0 === e.accessToken ? this.accessToken : e.accessToken, void 0 === e.refreshToken ? this.refreshToken : e.refreshToken, void 0 === e.loggedInProviderType ? this.loggedInProviderType : e.loggedInProviderType, void 0 === e.loggedInProviderName ? this.loggedInProviderName : e.loggedInProviderName, void 0 === e.lastAuthActivity ? this.lastAuthActivity : e.lastAuthActivity, void 0 === e.userProfile ? this.userProfile : e.userProfile)
            }, r
        }(),
        __extends = (JO = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                JO(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        JO, _Error = function(e) {
            Error.call(this, e), Error.captureStackTrace && Error.captureStackTrace(this), this.message = e, this.name = this.constructor.name
        };
    _Error.prototype = Object.create(Error.prototype);
    var StitchError = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e), t
        }(_Error),
        _a, VO;
    VO = exports.StitchRequestErrorCode || (exports.StitchRequestErrorCode = {}), VO[VO.TRANSPORT_ERROR = 0] = "TRANSPORT_ERROR", VO[VO.DECODING_ERROR = 1] = "DECODING_ERROR", VO[VO.ENCODING_ERROR = 2] = "ENCODING_ERROR";
    var requestErrorCodeDescs = (_a = {}, _a[exports.StitchRequestErrorCode.TRANSPORT_ERROR] = "the request transport encountered an error communicating with Stitch", _a[exports.StitchRequestErrorCode.DECODING_ERROR] = "an error occurred while decoding a response from Stitch", _a[exports.StitchRequestErrorCode.ENCODING_ERROR] = "an error occurred while encoding a request for Stitch", _a),
        __extends$1 = (WO = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                WO(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        WO, StitchRequestError = function(o) {
            function e(e, t) {
                var r = this,
                    n = "(" + exports.StitchRequestErrorCode[t] + "): " + requestErrorCodeDescs[t] + ": " + e.message;
                return (r = o.call(this, n) || this).underlyingError = e, r.errorCode = t, r.errorCodeName = exports.StitchRequestErrorCode[t], r
            }
            return __extends$1(e, o), e
        }(StitchError),
        jP;
    jP = exports.StitchServiceErrorCode || (exports.StitchServiceErrorCode = {}), jP[jP.MissingAuthReq = 0] = "MissingAuthReq", jP[jP.InvalidSession = 1] = "InvalidSession", jP[jP.UserAppDomainMismatch = 2] = "UserAppDomainMismatch", jP[jP.DomainNotAllowed = 3] = "DomainNotAllowed", jP[jP.ReadSizeLimitExceeded = 4] = "ReadSizeLimitExceeded", jP[jP.InvalidParameter = 5] = "InvalidParameter", jP[jP.MissingParameter = 6] = "MissingParameter", jP[jP.TwilioError = 7] = "TwilioError", jP[jP.GCMError = 8] = "GCMError", jP[jP.HTTPError = 9] = "HTTPError", jP[jP.AWSError = 10] = "AWSError", jP[jP.MongoDBError = 11] = "MongoDBError", jP[jP.ArgumentsNotAllowed = 12] = "ArgumentsNotAllowed", jP[jP.FunctionExecutionError = 13] = "FunctionExecutionError", jP[jP.NoMatchingRuleFound = 14] = "NoMatchingRuleFound", jP[jP.InternalServerError = 15] = "InternalServerError", jP[jP.AuthProviderNotFound = 16] = "AuthProviderNotFound", jP[jP.AuthProviderAlreadyExists = 17] = "AuthProviderAlreadyExists", jP[jP.ServiceNotFound = 18] = "ServiceNotFound", jP[jP.ServiceTypeNotFound = 19] = "ServiceTypeNotFound", jP[jP.ServiceAlreadyExists = 20] = "ServiceAlreadyExists", jP[jP.ServiceCommandNotFound = 21] = "ServiceCommandNotFound", jP[jP.ValueNotFound = 22] = "ValueNotFound", jP[jP.ValueAlreadyExists = 23] = "ValueAlreadyExists", jP[jP.ValueDuplicateName = 24] = "ValueDuplicateName", jP[jP.FunctionNotFound = 25] = "FunctionNotFound", jP[jP.FunctionAlreadyExists = 26] = "FunctionAlreadyExists", jP[jP.FunctionDuplicateName = 27] = "FunctionDuplicateName", jP[jP.FunctionSyntaxError = 28] = "FunctionSyntaxError", jP[jP.FunctionInvalid = 29] = "FunctionInvalid", jP[jP.IncomingWebhookNotFound = 30] = "IncomingWebhookNotFound", jP[jP.IncomingWebhookAlreadyExists = 31] = "IncomingWebhookAlreadyExists", jP[jP.IncomingWebhookDuplicateName = 32] = "IncomingWebhookDuplicateName", jP[jP.RuleNotFound = 33] = "RuleNotFound", jP[jP.ApiKeyNotFound = 34] = "ApiKeyNotFound", jP[jP.RuleAlreadyExists = 35] = "RuleAlreadyExists", jP[jP.RuleDuplicateName = 36] = "RuleDuplicateName", jP[jP.AuthProviderDuplicateName = 37] = "AuthProviderDuplicateName", jP[jP.RestrictedHost = 38] = "RestrictedHost", jP[jP.ApiKeyAlreadyExists = 39] = "ApiKeyAlreadyExists", jP[jP.IncomingWebhookAuthFailed = 40] = "IncomingWebhookAuthFailed", jP[jP.ExecutionTimeLimitExceeded = 41] = "ExecutionTimeLimitExceeded", jP[jP.FunctionNotCallable = 42] = "FunctionNotCallable", jP[jP.UserAlreadyConfirmed = 43] = "UserAlreadyConfirmed", jP[jP.UserNotFound = 44] = "UserNotFound", jP[jP.UserDisabled = 45] = "UserDisabled", jP[jP.Unknown = 46] = "Unknown";
    var apiErrorCodes = {
        APIKeyAlreadyExists: exports.StitchServiceErrorCode.ApiKeyAlreadyExists,
        APIKeyNotFound: exports.StitchServiceErrorCode.ApiKeyNotFound,
        AWSError: exports.StitchServiceErrorCode.AWSError,
        ArgumentsNotAllowed: exports.StitchServiceErrorCode.ArgumentsNotAllowed,
        AuthProviderAlreadyExists: exports.StitchServiceErrorCode.AuthProviderAlreadyExists,
        AuthProviderDuplicateName: exports.StitchServiceErrorCode.AuthProviderDuplicateName,
        AuthProviderNotFound: exports.StitchServiceErrorCode.AuthProviderNotFound,
        DomainNotAllowed: exports.StitchServiceErrorCode.DomainNotAllowed,
        ExecutionTimeLimitExceeded: exports.StitchServiceErrorCode.ExecutionTimeLimitExceeded,
        FunctionAlreadyExists: exports.StitchServiceErrorCode.FunctionAlreadyExists,
        FunctionDuplicateName: exports.StitchServiceErrorCode.FunctionDuplicateName,
        FunctionExecutionError: exports.StitchServiceErrorCode.FunctionExecutionError,
        FunctionInvalid: exports.StitchServiceErrorCode.FunctionInvalid,
        FunctionNotCallable: exports.StitchServiceErrorCode.FunctionNotCallable,
        FunctionNotFound: exports.StitchServiceErrorCode.FunctionNotFound,
        FunctionSyntaxError: exports.StitchServiceErrorCode.FunctionSyntaxError,
        GCMError: exports.StitchServiceErrorCode.GCMError,
        HTTPError: exports.StitchServiceErrorCode.HTTPError,
        IncomingWebhookAlreadyExists: exports.StitchServiceErrorCode.IncomingWebhookAlreadyExists,
        IncomingWebhookAuthFailed: exports.StitchServiceErrorCode.IncomingWebhookAuthFailed,
        IncomingWebhookDuplicateName: exports.StitchServiceErrorCode.IncomingWebhookDuplicateName,
        IncomingWebhookNotFound: exports.StitchServiceErrorCode.IncomingWebhookNotFound,
        InternalServerError: exports.StitchServiceErrorCode.InternalServerError,
        InvalidParameter: exports.StitchServiceErrorCode.InvalidParameter,
        InvalidSession: exports.StitchServiceErrorCode.InvalidSession,
        MissingAuthReq: exports.StitchServiceErrorCode.MissingAuthReq,
        MissingParameter: exports.StitchServiceErrorCode.MissingParameter,
        MongoDBError: exports.StitchServiceErrorCode.MongoDBError,
        NoMatchingRuleFound: exports.StitchServiceErrorCode.NoMatchingRuleFound,
        ReadSizeLimitExceeded: exports.StitchServiceErrorCode.ReadSizeLimitExceeded,
        RestrictedHost: exports.StitchServiceErrorCode.RestrictedHost,
        RuleAlreadyExists: exports.StitchServiceErrorCode.RuleAlreadyExists,
        RuleDuplicateName: exports.StitchServiceErrorCode.RuleDuplicateName,
        RuleNotFound: exports.StitchServiceErrorCode.RuleNotFound,
        ServiceAlreadyExists: exports.StitchServiceErrorCode.ServiceAlreadyExists,
        ServiceCommandNotFound: exports.StitchServiceErrorCode.ServiceCommandNotFound,
        ServiceNotFound: exports.StitchServiceErrorCode.ServiceNotFound,
        ServiceTypeNotFound: exports.StitchServiceErrorCode.ServiceTypeNotFound,
        TwilioError: exports.StitchServiceErrorCode.TwilioError,
        UserAlreadyConfirmed: exports.StitchServiceErrorCode.UserAlreadyConfirmed,
        UserAppDomainMismatch: exports.StitchServiceErrorCode.UserAppDomainMismatch,
        UserDisabled: exports.StitchServiceErrorCode.UserDisabled,
        UserNotFound: exports.StitchServiceErrorCode.UserNotFound,
        ValueAlreadyExists: exports.StitchServiceErrorCode.ValueAlreadyExists,
        ValueDuplicateName: exports.StitchServiceErrorCode.ValueDuplicateName,
        ValueNotFound: exports.StitchServiceErrorCode.ValueNotFound
    };

    function stitchServiceErrorCodeFromApi(e) {
        return e in apiErrorCodes ? apiErrorCodes[e] : exports.StitchServiceErrorCode.Unknown
    }
    var __extends$2 = (lP = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                lP(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        lP, StitchServiceError = function(n) {
            function e(e, t) {
                void 0 === t && (t = exports.StitchServiceErrorCode.Unknown);
                var r = n.call(this, e) || this;
                return r.message = e, r.errorCode = t, r.errorCodeName = exports.StitchServiceErrorCode[t], r
            }
            return __extends$2(e, n), e
        }(StitchError),
        ContentTypes = function() {
            function e() {}
            return e.APPLICATION_JSON = "application/json", e.TEXT_EVENT_STREAM = "text/event-stream", e
        }(),
        Headers = function() {
            function t() {}
            return t.getAuthorizationBearer = function(e) {
                return t.AUTHORIZATION_BEARER + " " + e
            }, t.CONTENT_TYPE = (t.CONTENT_TYPE_CANON = "Content-Type").toLocaleLowerCase(), t.AUTHORIZATION = (t.AUTHORIZATION_CANON = "Authorization").toLocaleLowerCase(), t.ACCEPT = (t.ACCEPT_CANON = "Accept").toLocaleLowerCase(), t.AUTHORIZATION_BEARER = "Bearer", t
        }(),
        Fields, CP, Method, OP;

    function wrapDecodingError(e) {
        return e instanceof StitchError ? e : new StitchRequestError(e, exports.StitchRequestErrorCode.DECODING_ERROR)
    }

    function handleRequestError(t) {
        if (void 0 === t.body) throw new StitchServiceError("received unexpected status code " + t.statusCode, exports.StitchServiceErrorCode.Unknown);
        var e;
        try {
            e = t.body
        } catch (e) {
            throw new StitchServiceError("received unexpected status code " + t.statusCode, exports.StitchServiceErrorCode.Unknown)
        }
        var r = handleRichError(t, e);
        throw new StitchServiceError(r, exports.StitchServiceErrorCode.Unknown)
    }

    function handleRichError(e, t) {
        if (void 0 === e.headers[Headers.CONTENT_TYPE] || void 0 !== e.headers[Headers.CONTENT_TYPE] && e.headers[Headers.CONTENT_TYPE] !== ContentTypes.APPLICATION_JSON) return t;
        var r = JSON.parse(t);
        if (!(r instanceof Object)) return t;
        var n = r;
        if (void 0 === n[Fields.ERROR]) return t;
        var o = n[Fields.ERROR];
        if (void 0 === n[Fields.ERROR_CODE]) return o;
        var i = n[Fields.ERROR_CODE];
        throw new StitchServiceError(o, stitchServiceErrorCodeFromApi(i))
    }
    CP = Fields || (Fields = {}), CP.ERROR = "error", CP.ERROR_CODE = "error_code", OP = Method || (Method = {}), OP.GET = "GET", OP.POST = "POST", OP.PUT = "PUT", OP.DELETE = "DELETE", OP.HEAD = "HEAD", OP.OPTIONS = "OPTIONS", OP.TRACE = "TRACE", OP.PATCH = "PATCH";
    var Method$1 = Method,
        StitchRequest = function() {
            function e(e, t, r, n, o) {
                this.method = e, this.path = t, this.headers = r, this.body = o, this.startedAt = n
            }
            return Object.defineProperty(e.prototype, "builder", {
                get: function() {
                    return new e.Builder(this)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        VP, WP;
    VP = StitchRequest || (StitchRequest = {}), WP = function() {
        function e(e) {
            void 0 !== e && (this.method = e.method, this.path = e.path, this.headers = e.headers, this.body = e.body, this.startedAt = e.startedAt)
        }
        return e.prototype.withMethod = function(e) {
            return this.method = e, this
        }, e.prototype.withPath = function(e) {
            return this.path = e, this
        }, e.prototype.withHeaders = function(e) {
            return this.headers = e, this
        }, e.prototype.withBody = function(e) {
            return this.body = e, this
        }, e.prototype.build = function() {
            if (void 0 === this.method) throw Error("must set method");
            if (void 0 === this.path) throw Error("must set non-empty path");
            return void 0 === this.startedAt && (this.startedAt = Date.now() / 1e3), new VP(this.method, this.path, void 0 === this.headers ? {} : this.headers, this.startedAt, this.body)
        }, e
    }(), VP.Builder = WP;
    var __extends$3 = (bQ = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                bQ(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        bQ, StitchAuthRequest = function(o) {
            function e(e, t, r) {
                void 0 === t && (t = !1), void 0 === r && (r = !0);
                var n = o.call(this, e.method, e.path, e.headers, e.startedAt, e.body) || this;
                return n.useRefreshToken = t, n.shouldRefreshOnFailure = r, n
            }
            return __extends$3(e, o), Object.defineProperty(e.prototype, "builder", {
                get: function() {
                    return new e.Builder(this)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(StitchRequest),
        qQ, rQ;
    qQ = StitchAuthRequest || (StitchAuthRequest = {}), rQ = function(t) {
        function e(e) {
            return t.call(this, e) || this
        }
        return __extends$3(e, t), e.prototype.withAccessToken = function() {
            return this.useRefreshToken = !1, this
        }, e.prototype.withRefreshToken = function() {
            return this.useRefreshToken = !0, this
        }, e.prototype.withShouldRefreshOnFailure = function(e) {
            return this.shouldRefreshOnFailure = e, this
        }, e.prototype.build = function() {
            return this.useRefreshToken && (this.shouldRefreshOnFailure = !1), new qQ(t.prototype.build.call(this), this.useRefreshToken, this.shouldRefreshOnFailure)
        }, e
    }(StitchRequest.Builder), qQ.Builder = rQ;
    var __extends$4 = (wQ = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                wQ(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        wQ, StitchAuthDocRequest = function(n) {
            function e(e, t) {
                var r = this;
                return (r = e instanceof StitchAuthRequest ? n.call(this, e, e.useRefreshToken, e.shouldRefreshOnFailure) || this : n.call(this, e) || this).document = t, r
            }
            return __extends$4(e, n), Object.defineProperty(e.prototype, "builder", {
                get: function() {
                    return new e.Builder(this)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(StitchAuthRequest),
        KQ, LQ;
    KQ = StitchAuthDocRequest || (StitchAuthDocRequest = {}), LQ = function(r) {
        function e(e) {
            var t = r.call(this, e) || this;
            return void 0 !== e && (t.document = e.document, t.useRefreshToken = e.useRefreshToken), t
        }
        return __extends$4(e, r), e.prototype.withDocument = function(e) {
            return this.document = e, this
        }, e.prototype.withAccessToken = function() {
            return this.useRefreshToken = !1, this
        }, e.prototype.build = function() {
            if (void 0 === this.document || !(this.document instanceof Object)) throw new Error("document must be set: " + this.document);
            return void 0 === this.headers && this.withHeaders({}), this.headers[Headers.CONTENT_TYPE] = ContentTypes.APPLICATION_JSON, this.withBody(bson_54.stringify(this.document, {
                relaxed: !1
            })), new KQ(r.prototype.build.call(this), this.document)
        }, e
    }(StitchAuthRequest.Builder), KQ.Builder = LQ;
    var __extends$5 = (RQ = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                RQ(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        RQ, StitchDocRequest = function(n) {
            function e(e, t) {
                var r = n.call(this, e.method, e.path, e.headers, e.startedAt, e.body) || this;
                return r.document = t, r
            }
            return __extends$5(e, n), Object.defineProperty(e.prototype, "builder", {
                get: function() {
                    return new e.Builder(this)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(StitchRequest),
        dR, eR, _a$1, kR;
    dR = StitchDocRequest || (StitchDocRequest = {}), eR = function(r) {
        function e(e) {
            var t = r.call(this, e) || this;
            return void 0 !== e && (t.document = e.document), t
        }
        return __extends$5(e, r), e.prototype.withDocument = function(e) {
            return this.document = e, this
        }, e.prototype.build = function() {
            if (void 0 === this.document || !(this.document instanceof Object)) throw new Error("document must be set");
            return void 0 === this.headers && this.withHeaders({}), this.headers[Headers.CONTENT_TYPE] = ContentTypes.APPLICATION_JSON, this.withBody(bson_54.stringify(this.document, {
                relaxed: !1
            })), new dR(r.prototype.build.call(this), this.document)
        }, e
    }(StitchRequest.Builder), dR.Builder = eR, kR = exports.StitchClientErrorCode || (exports.StitchClientErrorCode = {}), kR[kR.LoggedOutDuringRequest = 0] = "LoggedOutDuringRequest", kR[kR.MustAuthenticateFirst = 1] = "MustAuthenticateFirst", kR[kR.UserNoLongerValid = 2] = "UserNoLongerValid", kR[kR.UserNotFound = 3] = "UserNotFound", kR[kR.UserNotLoggedIn = 4] = "UserNotLoggedIn", kR[kR.CouldNotLoadPersistedAuthInfo = 5] = "CouldNotLoadPersistedAuthInfo", kR[kR.CouldNotPersistAuthInfo = 6] = "CouldNotPersistAuthInfo", kR[kR.StreamingNotSupported = 7] = "StreamingNotSupported", kR[kR.StreamClosed = 8] = "StreamClosed", kR[kR.UnexpectedArguments = 9] = "UnexpectedArguments";
    var clientErrorCodeDescs = (_a$1 = {}, _a$1[exports.StitchClientErrorCode.LoggedOutDuringRequest] = "logged out while making a request to Stitch", _a$1[exports.StitchClientErrorCode.MustAuthenticateFirst] = "method called requires being authenticated", _a$1[exports.StitchClientErrorCode.UserNoLongerValid] = "user instance being accessed is no longer valid; please get a new user with auth.getUser()", _a$1[exports.StitchClientErrorCode.UserNotFound] = "user not found in list of users", _a$1[exports.StitchClientErrorCode.UserNotLoggedIn] = "cannot make the active user a logged out user; please use loginWithCredential() to switch to this user", _a$1[exports.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo] = "failed to load stored auth information for Stitch", _a$1[exports.StitchClientErrorCode.CouldNotPersistAuthInfo] = "failed to save auth information for Stitch", _a$1[exports.StitchClientErrorCode.StreamingNotSupported] = "streaming not supported in this SDK", _a$1[exports.StitchClientErrorCode.StreamClosed] = "stream is closed", _a$1[exports.StitchClientErrorCode.UnexpectedArguments] = "function does not accept arguments", _a$1),
        __extends$6 = (lR = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                lR(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        lR, StitchClientError = function(n) {
            function e(e) {
                var t = this,
                    r = "(" + exports.StitchClientErrorCode[e] + "): " + clientErrorCodeDescs[e];
                return (t = n.call(this, r) || this).errorCode = e, t.errorCodeName = exports.StitchClientErrorCode[e], t
            }
            return __extends$6(e, n), e
        }(StitchError),
        Event = function() {
            function e(e, t) {
                this.eventName = e, this.data = t
            }
            return e.MESSAGE_EVENT = "message", e
        }(),
        StitchEvent = function() {
            function h(e, t, r) {
                this.eventName = e, t = t || "";
                for (var n = [], o = 0; o < t.length; o++) {
                    var i = t[o];
                    switch (i) {
                        case "%":
                            if (o + 2 >= t.length) break;
                            var s = void 0;
                            switch (t.substring(o + 1, o + 3)) {
                                case "25":
                                    s = !0, n.push("%");
                                    break;
                                case "0A":
                                    s = !0, n.push("\n");
                                    break;
                                case "0D":
                                    s = !0, n.push("\r");
                                    break;
                                default:
                                    s = !1
                            }
                            if (s) {
                                o += 2;
                                continue
                            }
                    }
                    n.push(i)
                }
                var u = n.join("");
                switch (this.eventName) {
                    case h.ERROR_EVENT_NAME:
                        var a = void 0,
                            c = void 0;
                        try {
                            var f = bson_54.parse(u, {
                                strict: !1
                            });
                            a = f[ErrorFields.Error], c = stitchServiceErrorCodeFromApi(f[ErrorFields.ErrorCode])
                        } catch (e) {
                            a = u, c = exports.StitchServiceErrorCode.Unknown
                        }
                        this.error = new StitchServiceError(a, c);
                        break;
                    case Event.MESSAGE_EVENT:
                        this.data = bson_54.parse(u, {
                            strict: !1
                        }), r && (this.data = r.decode(this.data))
                }
            }
            return h.fromEvent = function(e, t) {
                return new h(e.eventName, e.data, t)
            }, h.ERROR_EVENT_NAME = "error", h
        }(),
        ErrorFields, SR;
    SR = ErrorFields || (ErrorFields = {}), SR.Error = "error", SR.ErrorCode = "error_code";
    var Stream = function() {
            function e(e, t) {
                this.eventStream = e, this.decoder = t, this.listeners = []
            }
            return e.prototype.next = function() {
                var r = this;
                return this.eventStream.nextEvent().then(function(e) {
                    var t = StitchEvent.fromEvent(e, r.decoder);
                    if (t.eventName === StitchEvent.ERROR_EVENT_NAME) throw t.error;
                    return t.eventName === Event.MESSAGE_EVENT ? t.data : r.next()
                })
            }, e.prototype.onNext = function(r) {
                var n = this,
                    e = {
                        onEvent: function(e) {
                            var t = StitchEvent.fromEvent(e, n.decoder);
                            t.eventName === Event.MESSAGE_EVENT && r(t.data)
                        }
                    };
                this.eventStream.addListener(e)
            }, e.prototype.onError = function(r) {
                var n = this,
                    e = {
                        onEvent: function(e) {
                            var t = StitchEvent.fromEvent(e, n.decoder);
                            t.eventName === StitchEvent.ERROR_EVENT_NAME && r(t.error)
                        }
                    };
                this.eventStream.addListener(e)
            }, e.prototype.addListener = function(r) {
                var n = this,
                    e = {
                        onEvent: function(e) {
                            var t = StitchEvent.fromEvent(e, n.decoder);
                            t.eventName === StitchEvent.ERROR_EVENT_NAME ? r.onError && r.onError(t.error) : r.onNext && r.onNext(t.data)
                        }
                    };
                this.listeners.push([r, e]), this.eventStream.addListener(e)
            }, e.prototype.removeListener = function(e) {
                for (var t = -1, r = 0; r < this.listeners.length; r++)
                    if (this.listeners[r][0] === e) {
                        t = r;
                        break
                    } if (-1 !== t) {
                    var n = this.listeners[t][1];
                    this.listeners.splice(t, 1), this.eventStream.removeListener(n)
                }
            }, e.prototype.isOpen = function() {
                return this.eventStream.isOpen()
            }, e.prototype.close = function() {
                this.eventStream.close()
            }, e
        }(),
        NAME = "name",
        EMAIL = "email",
        PICTURE_URL = "picture",
        FIRST_NAME = "first_name",
        LAST_NAME = "last_name",
        GENDER = "gender",
        BIRTHDAY = "birthday",
        MIN_AGE = "min_age",
        MAX_AGE = "max_age",
        StitchUserProfileImpl = function() {
            function e(e, t, r) {
                void 0 === t && (t = {}), void 0 === r && (r = []), this.userType = e, this.data = t, this.identities = r
            }
            return e.empty = function() {
                return new e
            }, Object.defineProperty(e.prototype, "name", {
                get: function() {
                    return this.data[NAME]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "email", {
                get: function() {
                    return this.data[EMAIL]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "pictureUrl", {
                get: function() {
                    return this.data[PICTURE_URL]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "firstName", {
                get: function() {
                    return this.data[FIRST_NAME]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "lastName", {
                get: function() {
                    return this.data[LAST_NAME]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "gender", {
                get: function() {
                    return this.data[GENDER]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "birthday", {
                get: function() {
                    return this.data[BIRTHDAY]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "minAge", {
                get: function() {
                    var e = this.data[MIN_AGE];
                    if (void 0 !== e) return e
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "maxAge", {
                get: function() {
                    var e = this.data[MAX_AGE];
                    if (void 0 !== e) return e
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        CoreStitchUserImpl = function() {
            function e(e, t, r, n, o, i, s) {
                this.id = e, this.loggedInProviderType = t, this.loggedInProviderName = r, this.profile = void 0 === i ? StitchUserProfileImpl.empty() : i, this.isLoggedIn = n, this.lastAuthActivity = o, this.customData = void 0 === s ? {} : s
            }
            return Object.defineProperty(e.prototype, "userType", {
                get: function() {
                    return this.profile.userType
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "identities", {
                get: function() {
                    return this.profile.identities
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.equals = function(e) {
                return this.id === e.id && JSON.stringify(this.identities) === JSON.stringify(e.identities) && this.isLoggedIn === e.isLoggedIn && this.loggedInProviderName === e.loggedInProviderName && this.loggedInProviderType === e.loggedInProviderType && JSON.stringify(this.profile) === JSON.stringify(e.profile)
            }, e
        }(),
        AnonymousAuthProvider = function() {
            function e() {}
            return e.TYPE = "anon-user", e.DEFAULT_NAME = "anon-user", e
        }(),
        StitchAuthResponseCredential = function(e, t, r, n) {
            this.authInfo = e, this.providerType = t, this.providerName = r, this.asLink = n
        };

    function base64Decode(e) {
        var t, r = e.length % 4;
        0 != r ? t = e + "=".repeat(4 - r) : t = e;
        var n = toByteArray_1(t);
        return utf8Slice$1(n, 0, n.length)
    }

    function base64Encode(e) {
        var t;
        return "undefined" == typeof Uint8Array && (t = utf8ToBytes$1(e)), t = new Uint8Array(utf8ToBytes$1(e)), fromByteArray_1(t)
    }

    function utf8ToBytes$1(e) {
        for (var t, r = 1 / 0, n = e.length, o = null, i = [], s = 0; s < n; s++) {
            if (55295 < (t = e.charCodeAt(s)) && t < 57344) {
                if (!o) {
                    if (56319 < t) {
                        -1 < (r -= 3) && i.push(239, 191, 189);
                        continue
                    }
                    if (s + 1 === n) {
                        -1 < (r -= 3) && i.push(239, 191, 189);
                        continue
                    }
                    o = t;
                    continue
                }
                if (t < 56320) {
                    -1 < (r -= 3) && i.push(239, 191, 189), o = t;
                    continue
                }
                t = o - 55296 << 10 | t - 56320 | 65536, o = null
            } else o && (-1 < (r -= 3) && i.push(239, 191, 189), o = null);
            if (t < 128) {
                if ((r -= 1) < 0) break;
                i.push(t)
            } else if (t < 2048) {
                if ((r -= 2) < 0) break;
                i.push(t >> 6 | 192, 63 & t | 128)
            } else if (t < 65536) {
                if ((r -= 3) < 0) break;
                i.push(t >> 12 | 224, t >> 6 & 63 | 128, 63 & t | 128)
            } else {
                if (!(t < 2097152)) throw new Error("Invalid code point");
                if ((r -= 4) < 0) break;
                i.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, 63 & t | 128)
            }
        }
        return i
    }

    function utf8Slice$1(e, t, r) {
        var n = "",
            o = "";
        r = Math.min(e.length, r || 1 / 0);
        for (var i = t = t || 0; i < r; i++) e[i] <= 127 ? (n += decodeUtf8Char(o) + String.fromCharCode(e[i]), o = "") : o += "%" + e[i].toString(16);
        return n + decodeUtf8Char(o)
    }

    function decodeUtf8Char(e) {
        try {
            return decodeURIComponent(e)
        } catch (e) {
            return String.fromCharCode(65533)
        }
    }
    var EXPIRES = "exp",
        ISSUED_AT = "iat",
        USER_DATA = "user_data",
        JWT = function() {
            function n(e, t, r) {
                this.expires = e, this.issuedAt = t, this.userData = r
            }
            return n.fromEncoded = function(e) {
                var t = n.splitToken(e),
                    r = JSON.parse(base64Decode(t[1]));
                return new n(r[EXPIRES], r[ISSUED_AT], r[USER_DATA])
            }, n.splitToken = function(e) {
                var t = e.split(".");
                if (3 !== t.length) throw new Error("Malformed JWT token. The string " + e + " should have 3 parts.");
                return t
            }, n
        }(),
        SLEEP_MILLIS = 6e4,
        EXPIRATION_WINDOW_SECS = 300,
        AccessTokenRefresher = function() {
            function e(e) {
                this.auth = e
            }
            return e.prototype.shouldRefresh = function() {
                var e = this.auth;
                if (void 0 === e) return !1;
                if (!e.isLoggedIn) return !1;
                var t, r = e.authInfo;
                if (void 0 === r) return !1;
                if (!r.isLoggedIn) return !1;
                try {
                    t = JWT.fromEncoded(r.accessToken)
                } catch (e) {
                    return console.log(e), !1
                }
                return !(Date.now() / 1e3 < t.expires - EXPIRATION_WINDOW_SECS)
            }, e.prototype.run = function() {
                var e = this;
                this.shouldRefresh() ? this.auth.refreshAccessToken().then(function() {
                    e.nextTimeout = setTimeout(function() {
                        return e.run()
                    }, SLEEP_MILLIS)
                }).catch(function() {
                    e.nextTimeout = setTimeout(function() {
                        return e.run()
                    }, SLEEP_MILLIS)
                }) : this.nextTimeout = setTimeout(function() {
                    return e.run()
                }, SLEEP_MILLIS)
            }, e.prototype.stop = function() {
                clearTimeout(this.nextTimeout)
            }, e
        }(),
        __extends$7 = (yT = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                yT(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        yT, Fields$1, HT;
    HT = Fields$1 || (Fields$1 = {}), HT.USER_ID = "user_id", HT.DEVICE_ID = "device_id", HT.ACCESS_TOKEN = "access_token", HT.REFRESH_TOKEN = "refresh_token";
    var ApiAuthInfo = function(o) {
            function t(e, t, r, n) {
                return o.call(this, e, t, r, n) || this
            }
            return __extends$7(t, o), t.fromJSON = function(e) {
                return new t(e[Fields$1.USER_ID], e[Fields$1.DEVICE_ID], e[Fields$1.ACCESS_TOKEN], e[Fields$1.REFRESH_TOKEN])
            }, t.prototype.toJSON = function() {
                var e;
                return (e = {})[Fields$1.USER_ID] = this.userId, e[Fields$1.DEVICE_ID] = this.deviceId, e[Fields$1.ACCESS_TOKEN] = this.accessToken, e[Fields$1.REFRESH_TOKEN] = this.refreshToken, e
            }, t
        }(AuthInfo),
        Assertions = function() {
            function e() {}
            return e.keyPresent = function(e, t) {
                if (void 0 === t[e]) throw new Error("expected " + e + " to be present")
            }, e
        }(),
        StitchUserIdentity = function(e, t) {
            this.id = e, this.providerType = t
        },
        __extends$8 = (WT = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                WT(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        WT, Fields$2, dU;
    dU = Fields$2 || (Fields$2 = {}), dU.ID = "id", dU.PROVIDER_TYPE = "provider_type";
    var ApiStitchUserIdentity = function(r) {
            function t(e, t) {
                return r.call(this, e, t) || this
            }
            return __extends$8(t, r), t.fromJSON = function(e) {
                return new t(e[Fields$2.ID], e[Fields$2.PROVIDER_TYPE])
            }, t.prototype.toJSON = function() {
                var e;
                return (e = {})[Fields$2.ID] = this.id, e[Fields$2.PROVIDER_TYPE] = this.providerType, e
            }, t
        }(StitchUserIdentity),
        __extends$9 = (kU = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                kU(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        kU, Fields$3, tU;
    tU = Fields$3 || (Fields$3 = {}), tU.DATA = "data", tU.USER_TYPE = "type", tU.IDENTITIES = "identities";
    var ApiCoreUserProfile = function(n) {
            function t(e, t, r) {
                return n.call(this, e, t, r) || this
            }
            return __extends$9(t, n), t.fromJSON = function(e) {
                return Assertions.keyPresent(Fields$3.USER_TYPE, e), Assertions.keyPresent(Fields$3.DATA, e), Assertions.keyPresent(Fields$3.IDENTITIES, e), new t(e[Fields$3.USER_TYPE], e[Fields$3.DATA], e[Fields$3.IDENTITIES].map(ApiStitchUserIdentity.fromJSON))
            }, t.prototype.toJSON = function() {
                var e;
                return (e = {})[Fields$3.DATA] = this.data, e[Fields$3.USER_TYPE] = this.userType, e[Fields$3.IDENTITIES] = this.identities, e
            }, t
        }(StitchUserProfileImpl),
        __extends$a = (BU = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                BU(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        BU, Fields$4, KU;
    KU = Fields$4 || (Fields$4 = {}), KU.ID = "id", KU.PROVIDER_TYPE = "provider_type";
    var StoreStitchUserIdentity = function(r) {
            function t(e, t) {
                return r.call(this, e, t) || this
            }
            return __extends$a(t, r), t.decode = function(e) {
                return new t(e[Fields$4.ID], e[Fields$4.PROVIDER_TYPE])
            }, t.prototype.encode = function() {
                var e;
                return (e = {})[Fields$4.ID] = this.id, e[Fields$4.PROVIDER_TYPE] = this.providerType, e
            }, t
        }(StitchUserIdentity),
        __extends$b = (RU = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                RU(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        RU, Fields$5, $U;
    $U = Fields$5 || (Fields$5 = {}), $U.DATA = "data", $U.USER_TYPE = "type", $U.IDENTITIES = "identities";
    var StoreCoreUserProfile = function(o) {
            function t(e, t, r) {
                var n = o.call(this, e, t, r) || this;
                return n.userType = e, n.data = t, n.identities = r, n
            }
            return __extends$b(t, o), t.decode = function(e) {
                return e ? new t(e[Fields$5.USER_TYPE], e[Fields$5.DATA], e[Fields$5.IDENTITIES].map(function(e) {
                    return StoreStitchUserIdentity.decode(e)
                })) : void 0
            }, t.prototype.encode = function() {
                var e;
                return (e = {})[Fields$5.DATA] = this.data, e[Fields$5.USER_TYPE] = this.userType, e[Fields$5.IDENTITIES] = this.identities.map(function(e) {
                    return e.encode()
                }), e
            }, t
        }(StitchUserProfileImpl),
        __extends$c = (jV = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                jV(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        jV, Fields$6, sV;

    function readActiveUserFromStorage(e) {
        var t = e.get(StoreAuthInfo.ACTIVE_USER_STORAGE_NAME);
        if (t) return StoreAuthInfo.decode(JSON.parse(t))
    }

    function readCurrentUsersFromStorage(e) {
        var t = e.get(StoreAuthInfo.ALL_USERS_STORAGE_NAME);
        if (!t) return new Map;
        var r = JSON.parse(t);
        if (!Array.isArray(r)) throw new StitchClientError(exports.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo);
        var n = new Map;
        return r.forEach(function(e) {
            var t = StoreAuthInfo.decode(e);
            n.set(t.userId, t)
        }), n
    }

    function writeActiveUserAuthInfoToStorage(e, t) {
        if (e.isEmpty) t.remove(StoreAuthInfo.ACTIVE_USER_STORAGE_NAME);
        else {
            var r = new StoreAuthInfo(e.userId, e.deviceId, e.accessToken, e.refreshToken, e.loggedInProviderType, e.loggedInProviderName, e.lastAuthActivity, e.userProfile ? new StoreCoreUserProfile(e.userProfile.userType, e.userProfile.data, e.userProfile.identities.map(function(e) {
                return new StoreStitchUserIdentity(e.id, e.providerType)
            })) : void 0);
            t.set(StoreAuthInfo.ACTIVE_USER_STORAGE_NAME, JSON.stringify(r.encode()))
        }
    }

    function writeAllUsersAuthInfoToStorage(e, t) {
        var n = [];
        e.forEach(function(e, t) {
            var r = new StoreAuthInfo(t, e.deviceId, e.accessToken, e.refreshToken, e.loggedInProviderType, e.loggedInProviderName, e.lastAuthActivity, e.userProfile ? new StoreCoreUserProfile(e.userProfile.userType, e.userProfile.data, e.userProfile.identities.map(function(e) {
                return new StoreStitchUserIdentity(e.id, e.providerType)
            })) : void 0);
            n.push(r.encode())
        }), t.set(StoreAuthInfo.ALL_USERS_STORAGE_NAME, JSON.stringify(n))
    }
    sV = Fields$6 || (Fields$6 = {}), sV.USER_ID = "user_id", sV.DEVICE_ID = "device_id", sV.ACCESS_TOKEN = "access_token", sV.REFRESH_TOKEN = "refresh_token", sV.LAST_AUTH_ACTIVITY = "last_auth_activity", sV.LOGGED_IN_PROVIDER_TYPE = "logged_in_provider_type", sV.LOGGED_IN_PROVIDER_NAME = "logged_in_provider_name", sV.USER_PROFILE = "user_profile";
    var StoreAuthInfo = function(c) {
            function f(e, t, r, n, o, i, s, u) {
                var a = c.call(this, e, t, r, n, o, i, s, u) || this;
                return a.userProfile = u, a
            }
            return __extends$c(f, c), f.decode = function(e) {
                var t = e[Fields$6.USER_ID],
                    r = e[Fields$6.DEVICE_ID],
                    n = e[Fields$6.ACCESS_TOKEN],
                    o = e[Fields$6.REFRESH_TOKEN],
                    i = e[Fields$6.LOGGED_IN_PROVIDER_TYPE],
                    s = e[Fields$6.LOGGED_IN_PROVIDER_NAME],
                    u = e[Fields$6.USER_PROFILE],
                    a = e[Fields$6.LAST_AUTH_ACTIVITY];
                return new f(t, r, n, o, i, s, new Date(a), StoreCoreUserProfile.decode(u))
            }, f.prototype.encode = function() {
                var e = {};
                return e[Fields$6.USER_ID] = this.userId, e[Fields$6.ACCESS_TOKEN] = this.accessToken, e[Fields$6.REFRESH_TOKEN] = this.refreshToken, e[Fields$6.DEVICE_ID] = this.deviceId, e[Fields$6.LOGGED_IN_PROVIDER_NAME] = this.loggedInProviderName, e[Fields$6.LOGGED_IN_PROVIDER_TYPE] = this.loggedInProviderType, e[Fields$6.LAST_AUTH_ACTIVITY] = this.lastAuthActivity ? this.lastAuthActivity.getTime() : void 0, e[Fields$6.USER_PROFILE] = this.userProfile ? this.userProfile.encode() : void 0, e
            }, f.ACTIVE_USER_STORAGE_NAME = "auth_info", f.ALL_USERS_STORAGE_NAME = "all_auth_infos", f
        }(AuthInfo),
        __values = function(e) {
            var t = "function" == typeof Symbol && e[Symbol.iterator],
                r = 0;
            return t ? t.call(e) : {
                next: function() {
                    return e && r >= e.length && (e = void 0), {
                        value: e && e[r++],
                        done: !e
                    }
                }
            }
        },
        __read = function(e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e),
                s = [];
            try {
                for (;
                    (void 0 === t || 0 < t--) && !(n = i.next()).done;) s.push(n.value)
            } catch (e) {
                o = {
                    error: e
                }
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return s
        },
        OPTIONS = "options",
        DEVICE = "device",
        CoreStitchAuth = function() {
            function e(e, t, r, n) {
                var o, i;
                void 0 === n && (n = !0), this.requestClient = e, this.authRoutes = t, this.storage = r;
                try {
                    o = readCurrentUsersFromStorage(r)
                } catch (e) {
                    throw new StitchClientError(exports.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo)
                }
                this.allUsersAuthInfo = o;
                try {
                    i = readActiveUserFromStorage(r)
                } catch (e) {
                    throw new StitchClientError(exports.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo)
                }
                this.activeUserAuthInfo = void 0 === i ? AuthInfo.empty() : i, this.activeUserAuthInfo.hasUser && (this.currentUser = this.prepUser(this.activeUserAuthInfo)), n && (this.accessTokenRefresher = new AccessTokenRefresher(this), this.accessTokenRefresher.run())
            }
            return Object.defineProperty(e.prototype, "authInfo", {
                get: function() {
                    return this.activeUserAuthInfo
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "isLoggedIn", {
                get: function() {
                    return void 0 !== this.currentUser && this.currentUser.isLoggedIn
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "user", {
                get: function() {
                    return this.currentUser
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "hasDeviceId", {
                get: function() {
                    return void 0 !== this.activeUserAuthInfo.deviceId && "" !== this.activeUserAuthInfo.deviceId && "000000000000000000000000" !== this.activeUserAuthInfo.deviceId
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "deviceId", {
                get: function() {
                    if (this.hasDeviceId) return this.activeUserAuthInfo.deviceId
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.listUsers = function() {
                var t = this,
                    r = [];
                return this.allUsersAuthInfo.forEach(function(e) {
                    r.push(t.prepUser(e))
                }), r
            }, e.prototype.doAuthenticatedRequest = function(t, e) {
                var r = this;
                try {
                    return this.requestClient.doRequest(this.prepareAuthRequest(t, e || this.activeUserAuthInfo)).catch(function(e) {
                        return r.handleAuthFailure(e, t)
                    })
                } catch (e) {
                    return Promise.reject(e)
                }
            }, e.prototype.doAuthenticatedRequestWithDecoder = function(e, r) {
                return this.doAuthenticatedRequest(e).then(function(e) {
                    var t = bson_54.parse(e.body, {
                        strict: !1
                    });
                    return r ? r.decode(t) : t
                }).catch(function(e) {
                    throw wrapDecodingError(e)
                })
            }, e.prototype.openAuthenticatedEventStream = function(t, r) {
                var n = this;
                if (void 0 === r && (r = !0), !this.isLoggedIn) throw new StitchClientError(exports.StitchClientErrorCode.MustAuthenticateFirst);
                var e = t.useRefreshToken ? this.activeUserAuthInfo.refreshToken : this.activeUserAuthInfo.accessToken;
                return this.requestClient.doStreamRequest(t.builder.withPath(t.path + "&stitch_at=" + e).build(), r, function() {
                    return n.openAuthenticatedEventStream(t, !1)
                }).catch(function(e) {
                    return n.handleAuthFailureForEventStream(e, t, r)
                })
            }, e.prototype.openAuthenticatedStreamWithDecoder = function(e, t) {
                return this.openAuthenticatedEventStream(e).then(function(e) {
                    return new Stream(e, t)
                })
            }, e.prototype.refreshAccessToken = function() {
                var n = this,
                    e = (new StitchAuthRequest.Builder).withRefreshToken().withPath(this.authRoutes.sessionRoute).withMethod(Method$1.POST);
                return this.doAuthenticatedRequest(e.build()).then(function(e) {
                    try {
                        var t = ApiAuthInfo.fromJSON(JSON.parse(e.body));
                        if (n.activeUserAuthInfo = n.activeUserAuthInfo.merge(t), t.accessToken && n.user instanceof CoreStitchUserImpl) {
                            var r = JWT.fromEncoded(t.accessToken).userData;
                            n.user.customData = void 0 === r ? {} : r
                        }
                    } catch (e) {
                        throw new StitchRequestError(e, exports.StitchRequestErrorCode.DECODING_ERROR)
                    }
                    try {
                        writeActiveUserAuthInfoToStorage(n.activeUserAuthInfo, n.storage), n.allUsersAuthInfo.set(n.activeUserAuthInfo.userId, n.activeUserAuthInfo), writeAllUsersAuthInfoToStorage(n.allUsersAuthInfo, n.storage)
                    } catch (e) {
                        throw new StitchClientError(exports.StitchClientErrorCode.CouldNotPersistAuthInfo)
                    }
                })
            }, e.prototype.switchToUserWithId = function(e) {
                var t = this.allUsersAuthInfo.get(e);
                if (void 0 === t) throw new StitchClientError(exports.StitchClientErrorCode.UserNotFound);
                if (!t.isLoggedIn) throw new StitchClientError(exports.StitchClientErrorCode.UserNotLoggedIn);
                this.activeUserAuthInfo.hasUser && this.allUsersAuthInfo.set(this.activeUserAuthInfo.userId, this.activeUserAuthInfo.withNewAuthActivityTime());
                var r = t.withNewAuthActivityTime();
                this.allUsersAuthInfo.set(e, r), writeActiveUserAuthInfoToStorage(r, this.storage), this.activeUserAuthInfo = r;
                var n = this.currentUser;
                return this.currentUser = this.prepUser(r), this.onAuthEvent(), this.dispatchAuthEvent({
                    currentActiveUser: this.currentUser,
                    kind: AuthEventKind.ActiveUserChanged,
                    previousActiveUser: n
                }), this.currentUser
            }, e.prototype.loginWithCredentialInternal = function(e) {
                var t, r, n = this;
                if (e instanceof StitchAuthResponseCredential) return this.processLogin(e, e.authInfo, e.asLink).then(function(e) {
                    return n.dispatchAuthEvent({
                        kind: AuthEventKind.UserLoggedIn,
                        loggedInUser: e
                    }), e
                });
                if (e.providerCapabilities.reusesExistingSession) try {
                    for (var o = __values(this.allUsersAuthInfo), i = o.next(); !i.done; i = o.next()) {
                        var s = __read(i.value, 2),
                            u = s[0],
                            a = s[1];
                        if (a.loggedInProviderType === e.providerType) {
                            if (a.isLoggedIn) try {
                                return Promise.resolve(this.switchToUserWithId(u))
                            } catch (e) {
                                return Promise.reject(e)
                            }
                            void 0 !== a.userId && this.removeUserWithIdInternal(a.userId)
                        }
                    }
                } catch (e) {
                    t = {
                        error: e
                    }
                } finally {
                    try {
                        i && !i.done && (r = o.return) && r.call(o)
                    } finally {
                        if (t) throw t.error
                    }
                }
                return this.doLogin(e, !1)
            }, e.prototype.linkUserWithCredentialInternal = function(e, t) {
                return void 0 !== this.currentUser && e.id !== this.currentUser.id ? Promise.reject(new StitchClientError(exports.StitchClientErrorCode.UserNoLongerValid)) : this.doLogin(t, !0)
            }, e.prototype.logoutInternal = function() {
                return this.isLoggedIn && this.currentUser ? this.logoutUserWithIdInternal(this.currentUser.id) : Promise.resolve()
            }, e.prototype.logoutUserWithIdInternal = function(e) {
                var t = this,
                    r = this.allUsersAuthInfo.get(e);
                if (void 0 === r) return Promise.reject(new StitchClientError(exports.StitchClientErrorCode.UserNotFound));
                if (!r.isLoggedIn) return Promise.resolve();
                var n = function() {
                    t.clearUserAuthTokens(r.userId), r.loggedInProviderType === AnonymousAuthProvider.TYPE && t.removeUserWithIdInternal(r.userId)
                };
                return this.doLogout(r).then(function() {
                    n()
                }).catch(function() {
                    n()
                })
            }, e.prototype.removeUserInternal = function() {
                return this.isLoggedIn && void 0 !== this.currentUser ? this.removeUserWithIdInternal(this.currentUser.id) : Promise.resolve()
            }, e.prototype.removeUserWithIdInternal = function(t) {
                var r = this,
                    n = this.allUsersAuthInfo.get(t);
                if (void 0 === n) return Promise.reject(new StitchClientError(exports.StitchClientErrorCode.UserNotFound));
                var o = function() {
                    r.clearUserAuthTokens(n.userId), r.allUsersAuthInfo.delete(t), writeAllUsersAuthInfoToStorage(r.allUsersAuthInfo, r.storage);
                    var e = r.prepUser(n.loggedOut());
                    r.onAuthEvent(), r.dispatchAuthEvent({
                        kind: AuthEventKind.UserRemoved,
                        removedUser: e
                    })
                };
                return n.isLoggedIn ? this.doLogout(n).then(function() {
                    o()
                }).catch(function(e) {
                    o()
                }) : (o(), Promise.resolve())
            }, e.prototype.close = function() {
                this.accessTokenRefresher && this.accessTokenRefresher.stop()
            }, e.prototype.prepareAuthRequest = function(e, t) {
                if (!t.isLoggedIn) throw new StitchClientError(exports.StitchClientErrorCode.MustAuthenticateFirst);
                var r = e.builder,
                    n = r.headers || {};
                return e.useRefreshToken ? n[Headers.AUTHORIZATION] = Headers.getAuthorizationBearer(t.refreshToken) : n[Headers.AUTHORIZATION] = Headers.getAuthorizationBearer(t.accessToken), r.withHeaders(n), r.build()
            }, e.prototype.handleAuthFailureForEventStream = function(e, t, r) {
                var n = this;
                if (void 0 === r && (r = !0), !(e instanceof StitchServiceError) || e.errorCode !== exports.StitchServiceErrorCode.InvalidSession) throw e;
                if (t.useRefreshToken || !t.shouldRefreshOnFailure) throw this.clearActiveUserAuth(), e;
                return this.tryRefreshAccessToken(t.startedAt).then(function() {
                    return n.openAuthenticatedEventStream(t.builder.withShouldRefreshOnFailure(!1).build(), r)
                })
            }, e.prototype.handleAuthFailure = function(e, t) {
                var r = this;
                if (!(e instanceof StitchServiceError) || e.errorCode !== exports.StitchServiceErrorCode.InvalidSession) throw e;
                if (t.useRefreshToken || !t.shouldRefreshOnFailure) throw this.clearActiveUserAuth(), e;
                return this.tryRefreshAccessToken(t.startedAt).then(function() {
                    return r.doAuthenticatedRequest(t.builder.withShouldRefreshOnFailure(!1).build())
                })
            }, e.prototype.tryRefreshAccessToken = function(e) {
                if (!this.isLoggedIn) throw new StitchClientError(exports.StitchClientErrorCode.LoggedOutDuringRequest);
                try {
                    if (JWT.fromEncoded(this.activeUserAuthInfo.accessToken).issuedAt >= e) return Promise.resolve()
                } catch (e) {}
                return this.refreshAccessToken()
            }, e.prototype.prepUser = function(e) {
                return this.userFactory.makeUser(e.userId, e.loggedInProviderType, e.loggedInProviderName, e.isLoggedIn, e.lastAuthActivity, e.userProfile)
            }, e.prototype.attachAuthOptions = function(e) {
                var t = {};
                t[DEVICE] = this.deviceInfo, e[OPTIONS] = t
            }, e.prototype.doLogin = function(t, r) {
                var n = this,
                    o = this.currentUser;
                return this.doLoginRequest(t, r).then(function(e) {
                    return n.processLoginResponse(t, e, r)
                }).then(function(e) {
                    return n.onAuthEvent(), r ? n.dispatchAuthEvent({
                        kind: AuthEventKind.UserLinked,
                        linkedUser: e
                    }) : (n.dispatchAuthEvent({
                        kind: AuthEventKind.UserLoggedIn,
                        loggedInUser: e
                    }), n.dispatchAuthEvent({
                        currentActiveUser: e,
                        kind: AuthEventKind.ActiveUserChanged,
                        previousActiveUser: o
                    })), e
                })
            }, e.prototype.doLoginRequest = function(e, t) {
                var r = new StitchDocRequest.Builder;
                r.withMethod(Method$1.POST), t ? r.withPath(this.authRoutes.getAuthProviderLinkRoute(e.providerName)) : r.withPath(this.authRoutes.getAuthProviderLoginRoute(e.providerName));
                var n = e.material;
                if (this.attachAuthOptions(n), r.withDocument(n), !t) return this.requestClient.doRequest(r.build());
                var o = new StitchAuthDocRequest(r.build(), r.document);
                return this.doAuthenticatedRequest(o)
            }, e.prototype.processLogin = function(r, n, o) {
                var i = this,
                    s = this.activeUserAuthInfo,
                    u = this.currentUser;
                return n = this.activeUserAuthInfo.merge(new AuthInfo(n.userId, n.deviceId, n.accessToken, n.refreshToken, r.providerType, r.providerName, void 0, void 0)), this.activeUserAuthInfo = n, this.currentUser = this.userFactory.makeUser(this.activeUserAuthInfo.userId, r.providerType, r.providerName, this.activeUserAuthInfo.isLoggedIn, new Date, void 0, JWT.fromEncoded(n.accessToken).userData), this.doGetUserProfile().then(function(e) {
                    s.hasUser && i.allUsersAuthInfo.set(s.userId, s.withNewAuthActivityTime()), n = n.merge(new AuthInfo(n.userId, n.deviceId, n.accessToken, n.refreshToken, r.providerType, r.providerName, new Date, e));
                    var t = !i.allUsersAuthInfo.has(n.userId);
                    try {
                        writeActiveUserAuthInfoToStorage(n, i.storage), i.allUsersAuthInfo.set(n.userId, n), writeAllUsersAuthInfoToStorage(i.allUsersAuthInfo, i.storage)
                    } catch (e) {
                        throw i.activeUserAuthInfo = s, i.currentUser = u, n.userId !== s.userId && n.userId && i.allUsersAuthInfo.delete(n.userId), new StitchClientError(exports.StitchClientErrorCode.CouldNotPersistAuthInfo)
                    }
                    return i.activeUserAuthInfo = n, i.currentUser = i.userFactory.makeUser(i.activeUserAuthInfo.userId, r.providerType, r.providerName, i.activeUserAuthInfo.isLoggedIn, i.activeUserAuthInfo.lastAuthActivity, e, JWT.fromEncoded(n.accessToken).userData), t && (i.onAuthEvent(), i.dispatchAuthEvent({
                        addedUser: i.currentUser,
                        kind: AuthEventKind.UserAdded
                    })), i.currentUser
                }).catch(function(e) {
                    if (e instanceof StitchClientError) throw e;
                    if (o || s.hasUser) {
                        var t = i.activeUserAuthInfo;
                        i.activeUserAuthInfo = s, i.currentUser = u, o && (i.activeUserAuthInfo = i.activeUserAuthInfo.withAuthProvider(t.loggedInProviderType, t.loggedInProviderName))
                    } else i.clearActiveUserAuth();
                    throw e
                })
            }, e.prototype.processLoginResponse = function(e, t, r) {
                try {
                    if (!t) throw new StitchServiceError("the login response could not be processed for credential: " + e + ";response was undefined");
                    if (!t.body) throw new StitchServiceError("response with status code " + t.statusCode + " has empty body");
                    return this.processLogin(e, ApiAuthInfo.fromJSON(JSON.parse(t.body)), r)
                } catch (e) {
                    throw new StitchRequestError(e, exports.StitchRequestErrorCode.DECODING_ERROR)
                }
            }, e.prototype.doGetUserProfile = function() {
                var e = new StitchAuthRequest.Builder;
                return e.withMethod(Method$1.GET).withPath(this.authRoutes.profileRoute), this.doAuthenticatedRequest(e.build()).then(function(e) {
                    return ApiCoreUserProfile.fromJSON(JSON.parse(e.body))
                }).catch(function(e) {
                    throw e instanceof StitchError ? e : new StitchRequestError(e, exports.StitchRequestErrorCode.DECODING_ERROR)
                })
            }, e.prototype.doLogout = function(e) {
                var t = new StitchAuthRequest.Builder;
                return t.withRefreshToken().withPath(this.authRoutes.sessionRoute).withMethod(Method$1.DELETE), this.doAuthenticatedRequest(t.build(), e).then(function() {})
            }, e.prototype.clearActiveUserAuth = function() {
                this.isLoggedIn && this.clearUserAuthTokens(this.activeUserAuthInfo.userId)
            }, e.prototype.clearUserAuthTokens = function(e) {
                var t = this.allUsersAuthInfo.get(e);
                if (void 0 === t) {
                    if (this.activeUserAuthInfo.userId !== e) throw new StitchClientError(exports.StitchClientErrorCode.UserNotFound)
                } else if (!t.isLoggedIn) return;
                try {
                    var r = void 0;
                    if (t) {
                        var n = t.loggedOut();
                        this.allUsersAuthInfo.set(e, n), writeAllUsersAuthInfoToStorage(this.allUsersAuthInfo, this.storage), r = this.userFactory.makeUser(n.userId, n.loggedInProviderType, n.loggedInProviderName, n.isLoggedIn, n.lastAuthActivity, n.userProfile)
                    }
                    var o = !1;
                    this.activeUserAuthInfo.hasUser && this.activeUserAuthInfo.userId === e && (o = !0, this.activeUserAuthInfo = this.activeUserAuthInfo.withClearedUser(), this.currentUser = void 0, writeActiveUserAuthInfoToStorage(this.activeUserAuthInfo, this.storage)), r && (this.onAuthEvent(), this.dispatchAuthEvent({
                        kind: AuthEventKind.UserLoggedOut,
                        loggedOutUser: r
                    }), o && this.dispatchAuthEvent({
                        currentActiveUser: void 0,
                        kind: AuthEventKind.ActiveUserChanged,
                        previousActiveUser: r
                    }))
                } catch (e) {
                    throw new StitchClientError(exports.StitchClientErrorCode.CouldNotPersistAuthInfo)
                }
            }, e
        }(),
        DeviceFields, BY;
    BY = DeviceFields || (DeviceFields = {}), BY.DEVICE_ID = "deviceId", BY.APP_ID = "appId", BY.APP_VERSION = "appVersion", BY.PLATFORM = "platform", BY.PLATFORM_VERSION = "platformVersion", BY.SDK_VERSION = "sdkVersion";
    var DeviceFields$1 = DeviceFields,
        ProviderCapabilities = function(e) {
            void 0 === e && (e = !1), this.reusesExistingSession = e
        },
        AnonymousCredential = function(e) {
            void 0 === e && (e = AnonymousAuthProvider.DEFAULT_NAME), this.providerType = AnonymousAuthProvider.TYPE, this.material = {}, this.providerCapabilities = new ProviderCapabilities(!0), this.providerName = e
        },
        CustomAuthProvider = function() {
            function e() {}
            return e.TYPE = "custom-token", e.DEFAULT_NAME = "custom-token", e
        }(),
        Fields$7;
    (Fields$7 || (Fields$7 = {})).TOKEN = "token";
    var CustomCredential = function(e, t) {
            var r;
            void 0 === t && (t = CustomAuthProvider.DEFAULT_NAME), this.providerType = CustomAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.providerName = t, this.token = e, this.material = ((r = {})[Fields$7.TOKEN] = this.token, r)
        },
        FacebookAuthProvider = function() {
            function e() {}
            return e.TYPE = "oauth2-facebook", e.DEFAULT_NAME = "oauth2-facebook", e
        }(),
        Fields$8;
    (Fields$8 || (Fields$8 = {})).ACCESS_TOKEN = "accessToken";
    var FacebookCredential = function() {
            function e(e, t) {
                var r;
                void 0 === t && (t = FacebookAuthProvider.DEFAULT_NAME), this.providerType = FacebookAuthProvider.TYPE, this.providerName = t, this.accessToken = e, this.material = ((r = {})[Fields$8.ACCESS_TOKEN] = this.accessToken, r)
            }
            return Object.defineProperty(e.prototype, "providerCapabilities", {
                get: function() {
                    return new ProviderCapabilities(!1)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        FunctionAuthProvider = function() {
            function e() {}
            return e.TYPE = "custom-function", e.DEFAULT_NAME = "custom-function", e
        }(),
        FunctionCredential = function() {
            function e(e, t) {
                void 0 === t && (t = FunctionAuthProvider.DEFAULT_NAME), this.providerType = FunctionAuthProvider.TYPE, this.providerName = t, this.material = e
            }
            return Object.defineProperty(e.prototype, "providerCapabilities", {
                get: function() {
                    return new ProviderCapabilities(!1)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        GoogleAuthProvider = function() {
            function e() {}
            return e.TYPE = "oauth2-google", e.DEFAULT_NAME = "oauth2-google", e
        }(),
        Fields$9;
    (Fields$9 || (Fields$9 = {})).AUTH_CODE = "authCode";
    var GoogleCredential = function(e, t) {
            var r;
            void 0 === t && (t = GoogleAuthProvider.DEFAULT_NAME), this.providerType = GoogleAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.providerName = t, this.authCode = e, this.material = ((r = {})[Fields$9.AUTH_CODE] = this.authCode, r)
        },
        ServerApiKeyAuthProvider = function() {
            function e() {}
            return e.TYPE = "api-key", e.DEFAULT_NAME = "api-key", e
        }(),
        Fields$a;
    (Fields$a || (Fields$a = {})).KEY = "key";
    var ServerApiKeyCredential = function(e, t) {
            var r;
            void 0 === t && (t = ServerApiKeyAuthProvider.DEFAULT_NAME), this.providerType = ServerApiKeyAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.providerName = t, this.key = e, this.material = ((r = {})[Fields$a.KEY] = this.key, r)
        },
        CoreAuthProviderClient = function(e, t, r) {
            this.providerName = e, this.requestClient = t, this.baseRoute = r
        },
        Fields$b, kZ;
    kZ = Fields$b || (Fields$b = {}), kZ.ID = "_id", kZ.KEY = "key", kZ.NAME = "name", kZ.DISABLED = "disabled";
    var UserApiKey = function() {
            function r(e, t, r, n) {
                this.id = bson.ObjectID.createFromHexString(e), this.key = t, this.name = r, this.disabled = n
            }
            return r.readFromApi = function(e) {
                var t = "string" == typeof e ? JSON.parse(e) : e;
                return Assertions.keyPresent(Fields$b.ID, t), Assertions.keyPresent(Fields$b.NAME, t), Assertions.keyPresent(Fields$b.DISABLED, t), new r(t[Fields$b.ID], t[Fields$b.KEY], t[Fields$b.NAME], t[Fields$b.DISABLED])
            }, r.prototype.toJSON = function() {
                var e;
                return (e = {})[Fields$b.ID] = this.id, e[Fields$b.KEY] = this.key, e[Fields$b.NAME] = this.name, e[Fields$b.DISABLED] = this.disabled, e
            }, r
        }(),
        UserApiKeyAuthProvider = function() {
            function e() {}
            return e.TYPE = "api-key", e.DEFAULT_NAME = "api-key", e
        }(),
        __extends$d = (uZ = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                uZ(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        uZ, ApiKeyFields;
    (ApiKeyFields || (ApiKeyFields = {})).NAME = "name";
    var CoreUserApiKeyAuthProviderClient = function(o) {
            function e(e, t) {
                var r = t.baseAuthRoute + "/api_keys",
                    n = UserApiKeyAuthProvider.DEFAULT_NAME;
                return o.call(this, n, e, r) || this
            }
            return __extends$d(e, o), e.prototype.createApiKey = function(e) {
                var t, r = new StitchAuthDocRequest.Builder;
                return r.withMethod(Method$1.POST).withPath(this.baseRoute).withDocument((t = {}, t[ApiKeyFields.NAME] = e, t)).withRefreshToken(), this.requestClient.doAuthenticatedRequest(r.build()).then(function(e) {
                    return UserApiKey.readFromApi(e.body)
                }).catch(function(e) {
                    throw wrapDecodingError(e)
                })
            }, e.prototype.fetchApiKey = function(e) {
                var t = new StitchAuthRequest.Builder;
                return t.withMethod(Method$1.GET).withPath(this.getApiKeyRoute(e.toHexString())), t.withRefreshToken(), this.requestClient.doAuthenticatedRequest(t.build()).then(function(e) {
                    return UserApiKey.readFromApi(e.body)
                }).catch(function(e) {
                    throw wrapDecodingError(e)
                })
            }, e.prototype.fetchApiKeys = function() {
                var e = new StitchAuthRequest.Builder;
                return e.withMethod(Method$1.GET).withPath(this.baseRoute), e.withRefreshToken(), this.requestClient.doAuthenticatedRequest(e.build()).then(function(e) {
                    var t = JSON.parse(e.body);
                    if (Array.isArray(t)) return t.map(function(e) {
                        return UserApiKey.readFromApi(e)
                    });
                    throw new StitchRequestError(new Error("unexpected non-array response from server"), exports.StitchRequestErrorCode.DECODING_ERROR)
                }).catch(function(e) {
                    throw wrapDecodingError(e)
                })
            }, e.prototype.deleteApiKey = function(e) {
                var t = new StitchAuthRequest.Builder;
                return t.withMethod(Method$1.DELETE).withPath(this.getApiKeyRoute(e.toHexString())), t.withRefreshToken(), this.requestClient.doAuthenticatedRequest(t.build()).then(function() {})
            }, e.prototype.enableApiKey = function(e) {
                var t = new StitchAuthRequest.Builder;
                return t.withMethod(Method$1.PUT).withPath(this.getApiKeyEnableRoute(e.toHexString())), t.withRefreshToken(), this.requestClient.doAuthenticatedRequest(t.build()).then(function() {})
            }, e.prototype.disableApiKey = function(e) {
                var t = new StitchAuthRequest.Builder;
                return t.withMethod(Method$1.PUT).withPath(this.getApiKeyDisableRoute(e.toHexString())), t.withRefreshToken(), this.requestClient.doAuthenticatedRequest(t.build()).then(function() {})
            }, e.prototype.getApiKeyRoute = function(e) {
                return this.baseRoute + "/" + e
            }, e.prototype.getApiKeyEnableRoute = function(e) {
                return this.getApiKeyRoute(e) + "/enable"
            }, e.prototype.getApiKeyDisableRoute = function(e) {
                return this.getApiKeyRoute(e) + "/disable"
            }, e
        }(CoreAuthProviderClient),
        Fields$c;
    (Fields$c || (Fields$c = {})).KEY = "key";
    var UserApiKeyCredential = function(e, t) {
            var r;
            void 0 === t && (t = UserApiKeyAuthProvider.DEFAULT_NAME), this.providerType = UserApiKeyAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.providerName = t, this.key = e, this.material = ((r = {})[Fields$c.KEY] = this.key, r)
        },
        UserPasswordAuthProvider = function() {
            function e() {}
            return e.TYPE = "local-userpass", e.DEFAULT_NAME = "local-userpass", e
        }(),
        __extends$e = (m$ = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                m$(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        m$, RegistrationFields, v$, ActionFields, w$;
    v$ = RegistrationFields || (RegistrationFields = {}), v$.EMAIL = "email", v$.PASSWORD = "password", w$ = ActionFields || (ActionFields = {}), w$.EMAIL = "email", w$.PASSWORD = "password", w$.TOKEN = "token", w$.TOKEN_ID = "tokenId", w$.ARGS = "arguments";
    var CoreUserPasswordAuthProviderClient = function(o) {
            function e(e, t, r) {
                void 0 === e && (e = UserPasswordAuthProvider.DEFAULT_NAME);
                var n = r.getAuthProviderRoute(e);
                return o.call(this, e, t, n) || this
            }
            return __extends$e(e, o), e.prototype.registerWithEmailInternal = function(e, t) {
                var r, n = new StitchDocRequest.Builder;
                return n.withMethod(Method$1.POST).withPath(this.getRegisterWithEmailRoute()), n.withDocument(((r = {})[RegistrationFields.EMAIL] = e, r[RegistrationFields.PASSWORD] = t, r)), this.requestClient.doRequest(n.build()).then(function() {})
            }, e.prototype.confirmUserInternal = function(e, t) {
                var r, n = new StitchDocRequest.Builder;
                return n.withMethod(Method$1.POST).withPath(this.getConfirmUserRoute()), n.withDocument(((r = {})[ActionFields.TOKEN] = e, r[ActionFields.TOKEN_ID] = t, r)), this.requestClient.doRequest(n.build()).then(function() {})
            }, e.prototype.resendConfirmationEmailInternal = function(e) {
                var t, r = new StitchDocRequest.Builder;
                return r.withMethod(Method$1.POST).withPath(this.getResendConfirmationEmailRoute()), r.withDocument(((t = {})[ActionFields.EMAIL] = e, t)), this.requestClient.doRequest(r.build()).then(function() {})
            }, e.prototype.resetPasswordInternal = function(e, t, r) {
                var n, o = new StitchDocRequest.Builder;
                return o.withMethod(Method$1.POST).withPath(this.getResetPasswordRoute()), o.withDocument(((n = {})[ActionFields.TOKEN] = e, n[ActionFields.TOKEN_ID] = t, n[ActionFields.PASSWORD] = r, n)), this.requestClient.doRequest(o.build()).then(function() {})
            }, e.prototype.sendResetPasswordEmailInternal = function(e) {
                var t, r = new StitchDocRequest.Builder;
                return r.withMethod(Method$1.POST).withPath(this.getSendResetPasswordEmailRoute()), r.withDocument(((t = {})[ActionFields.EMAIL] = e, t)), this.requestClient.doRequest(r.build()).then(function() {})
            }, e.prototype.callResetPasswordFunctionInternal = function(e, t, r) {
                var n, o = new StitchDocRequest.Builder;
                return o.withMethod(Method$1.POST).withPath(this.getCallResetPasswordFunctionRoute()), o.withDocument(((n = {})[ActionFields.EMAIL] = e, n[ActionFields.PASSWORD] = t, n[ActionFields.ARGS] = r, n)), this.requestClient.doRequest(o.build()).then(function() {})
            }, e.prototype.getRegisterWithEmailRoute = function() {
                return this.getExtensionRoute("register")
            }, e.prototype.getConfirmUserRoute = function() {
                return this.getExtensionRoute("confirm")
            }, e.prototype.getResendConfirmationEmailRoute = function() {
                return this.getExtensionRoute("confirm/send")
            }, e.prototype.getResetPasswordRoute = function() {
                return this.getExtensionRoute("reset")
            }, e.prototype.getSendResetPasswordEmailRoute = function() {
                return this.getExtensionRoute("reset/send")
            }, e.prototype.getCallResetPasswordFunctionRoute = function() {
                return this.getExtensionRoute("reset/call")
            }, e.prototype.getExtensionRoute = function(e) {
                return this.baseRoute + "/" + e
            }, e
        }(CoreAuthProviderClient),
        Fields$d, b_;
    b_ = Fields$d || (Fields$d = {}), b_.USERNAME = "username", b_.PASSWORD = "password";
    var UserPasswordCredential = function(e, t, r) {
            var n;
            void 0 === r && (r = UserPasswordAuthProvider.DEFAULT_NAME), this.username = e, this.password = t, this.providerName = r, this.providerType = UserPasswordAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.material = ((n = {})[Fields$d.USERNAME] = this.username, n[Fields$d.PASSWORD] = this.password, n)
        },
        UserType, h_;
    h_ = UserType || (UserType = {}), h_.Normal = "normal", h_.Server = "server", h_.Unknown = "unknown";
    var UserType$1 = UserType,
        MemoryStorage = function() {
            function e(e) {
                this.suiteName = e, this.storage = {}
            }
            return e.prototype.get = function(e) {
                return this.storage[this.suiteName + "." + e]
            }, e.prototype.set = function(e, t) {
                this.storage[this.suiteName + "." + e] = t
            }, e.prototype.remove = function(e) {
                delete this.storage[this.suiteName + "." + e]
            }, e
        }(),
        RebindEvent = function() {},
        RebindEventType, p_;
    p_ = RebindEventType || (RebindEventType = {}), p_[p_.AUTH_EVENT = 0] = "AUTH_EVENT";
    var CoreStitchServiceClientImpl = function() {
            function e(e, t, r) {
                this.serviceField = "service", this.argumentsField = "arguments", this.requestClient = e, this.serviceRoutes = t, this.serviceName = r, this.serviceBinders = [], this.allocatedStreams = []
            }
            return e.prototype.callFunction = function(e, t, r) {
                return this.requestClient.doAuthenticatedRequestWithDecoder(this.getCallServiceFunctionRequest(e, t), r)
            }, e.prototype.streamFunction = function(e, t, r) {
                var n = this;
                return this.requestClient.openAuthenticatedStreamWithDecoder(this.getStreamServiceFunctionRequest(e, t), r).then(function(e) {
                    return n.allocatedStreams.push(e), e
                })
            }, e.prototype.bind = function(e) {
                this.serviceBinders.push(e)
            }, e.prototype.onRebindEvent = function(t) {
                switch (t.type) {
                    case RebindEventType.AUTH_EVENT:
                        t.event.kind === AuthEventKind.ActiveUserChanged && this.closeAllocatedStreams()
                }
                this.serviceBinders.forEach(function(e) {
                    e.onRebindEvent(t)
                })
            }, e.prototype.getStreamServiceFunctionRequest = function(e, t) {
                var r = {
                    name: e
                };
                void 0 !== this.serviceName && (r[this.serviceField] = this.serviceName), r[this.argumentsField] = t;
                var n = new StitchAuthRequest.Builder;
                return n.withMethod(Method$1.GET).withPath(this.serviceRoutes.functionCallRoute + "?stitch_request=" + encodeURIComponent(base64Encode(bson_54.stringify(r)))), n.build()
            }, e.prototype.getCallServiceFunctionRequest = function(e, t) {
                var r = {
                    name: e
                };
                void 0 !== this.serviceName && (r[this.serviceField] = this.serviceName), r[this.argumentsField] = t;
                var n = new StitchAuthDocRequest.Builder;
                return n.withMethod(Method$1.POST).withPath(this.serviceRoutes.functionCallRoute), n.withDocument(r), n.build()
            }, e.prototype.closeAllocatedStreams = function() {
                this.allocatedStreams.forEach(function(e) {
                    e.isOpen() && e.close()
                }), this.allocatedStreams = []
            }, e
        }(),
        CoreStitchAppClient = function() {
            function e(e, t) {
                this.functionService = new CoreStitchServiceClientImpl(e, t.serviceRoutes)
            }
            return e.prototype.callFunction = function(e, t, r) {
                return this.functionService.callFunction(e, t, r)
            }, e
        }(),
        __values$1 = function(e) {
            var t = "function" == typeof Symbol && e[Symbol.iterator],
                r = 0;
            return t ? t.call(e) : {
                next: function() {
                    return e && r >= e.length && (e = void 0), {
                        value: e && e[r++],
                        done: !e
                    }
                }
            }
        },
        BaseEventStream = function() {
            function n(e) {
                this.reconnecter = e, this.closed = !1, this.events = [], this.listeners = [], this.lastErr = void 0
            }
            return n.prototype.isOpen = function() {
                return !this.closed
            }, n.prototype.addListener = function(e) {
                var t = this;
                this.closed ? setTimeout(function() {
                    return e.onEvent(new Event(StitchEvent.ERROR_EVENT_NAME, "stream closed"))
                }, 0) : void 0 === this.lastErr ? (this.listeners.push(e), this.poll()) : setTimeout(function() {
                    return e.onEvent(new Event(StitchEvent.ERROR_EVENT_NAME, t.lastErr))
                }, 0)
            }, n.prototype.removeListener = function(e) {
                var t = this.listeners.indexOf(e); - 1 !== t && this.listeners.splice(t, 1)
            }, n.prototype.nextEvent = function() {
                var r = this;
                return this.closed ? Promise.reject(new Event(StitchEvent.ERROR_EVENT_NAME, "stream closed")) : void 0 !== this.lastErr ? Promise.reject(new Event(StitchEvent.ERROR_EVENT_NAME, this.lastErr)) : new Promise(function(t, e) {
                    r.listenOnce({
                        onEvent: function(e) {
                            t(e)
                        }
                    })
                })
            }, n.prototype.close = function() {
                this.closed || (this.closed = !0, this.afterClose())
            }, n.prototype.reconnect = function(t) {
                var r = this;
                this.reconnecter ? this.reconnecter().then(function(e) {
                    r.onReconnect(e)
                }).catch(function(e) {
                    if (!(e instanceof StitchError && e instanceof StitchRequestError)) return r.closed = !0, r.events.push(new Event(StitchEvent.ERROR_EVENT_NAME, "stream closed: " + t)), void r.poll();
                    setTimeout(function() {
                        return r.reconnect(e)
                    }, n.RETRY_TIMEOUT_MILLIS)
                }) : this.closed || (this.closed = !0, this.events.push(new Event(StitchEvent.ERROR_EVENT_NAME, "stream closed: " + t)), this.poll())
            }, n.prototype.poll = function() {
                for (var t, e; 0 !== this.events.length;) {
                    var r = this.events.pop();
                    try {
                        for (var n = __values$1(this.listeners), o = n.next(); !o.done; o = n.next()) {
                            var i = o.value;
                            i.onEvent && i.onEvent(r)
                        }
                    } catch (e) {
                        t = {
                            error: e
                        }
                    } finally {
                        try {
                            o && !o.done && (e = n.return) && e.call(n)
                        } finally {
                            if (t) throw t.error
                        }
                    }
                }
            }, n.prototype.listenOnce = function(t) {
                var r = this;
                if (this.closed) setTimeout(function() {
                    return t.onEvent(new Event(StitchEvent.ERROR_EVENT_NAME, "stream closed"))
                }, 0);
                else if (void 0 === this.lastErr) {
                    var n = {
                        onEvent: function(e) {
                            r.removeListener(n), t.onEvent(e)
                        }
                    };
                    this.addListener(n)
                } else setTimeout(function() {
                    return t.onEvent(new Event(StitchEvent.ERROR_EVENT_NAME, r.lastErr))
                }, 0)
            }, n.RETRY_TIMEOUT_MILLIS = 5e3, n
        }(),
        BasicRequest = function(e, t, r, n) {
            this.method = e, this.url = t, this.headers = r, this.body = n
        },
        A0, B0;
    A0 = BasicRequest || (BasicRequest = {}), B0 = function() {
        function e(e) {
            e && (this.method = e.method, this.url = e.url, this.headers = e.headers, this.body = e.body)
        }
        return e.prototype.withMethod = function(e) {
            return this.method = e, this
        }, e.prototype.withUrl = function(e) {
            return this.url = e, this
        }, e.prototype.withHeaders = function(e) {
            return this.headers = e, this
        }, e.prototype.withBody = function(e) {
            return this.body = e, this
        }, e.prototype.build = function() {
            if (void 0 === this.method) throw new Error("must set method");
            if (void 0 === this.url) throw new Error("must set non-empty url");
            return new A0(this.method, this.url, void 0 === this.headers ? {} : this.headers, this.body)
        }, e
    }(), A0.Builder = B0;
    var Response = function(r, e, t) {
            var n = this;
            this.statusCode = e, this.body = t, this.headers = {}, Object.keys(r).map(function(e, t) {
                n.headers[e.toLocaleLowerCase()] = r[e]
            })
        },
        BASE_ROUTE = "/api/client/v2.0";

    function getAppRoute(e) {
        return BASE_ROUTE + "/app/" + e
    }

    function getFunctionCallRoute(e) {
        return getAppRoute(e) + "/functions/call"
    }

    function getAppMetadataRoute(e) {
        return getAppRoute(e) + "/location"
    }

    function getAuthProviderRoute(e, t) {
        return getAppRoute(e) + "/auth/providers/" + t
    }

    function getAuthProviderLoginRoute(e, t) {
        return getAuthProviderRoute(e, t) + "/login"
    }

    function getAuthProviderLinkRoute(e, t) {
        return getAuthProviderLoginRoute(e, t) + "?link=true"
    }
    var StitchAppAuthRoutes = function() {
            function e(e) {
                var t = this;
                this.baseAuthRoute = BASE_ROUTE + "/auth", this.sessionRoute = t.baseAuthRoute + "/session", this.profileRoute = t.baseAuthRoute + "/profile", this.clientAppId = e
            }
            return e.prototype.getAuthProviderRoute = function(e) {
                return getAuthProviderRoute(this.clientAppId, e)
            }, e.prototype.getAuthProviderLoginRoute = function(e) {
                return getAuthProviderLoginRoute(this.clientAppId, e)
            }, e.prototype.getAuthProviderLinkRoute = function(e) {
                return getAuthProviderLinkRoute(this.clientAppId, e)
            }, e.prototype.getAuthProviderExtensionRoute = function(e, t) {
                return this.getAuthProviderRoute(e) + "/" + t
            }, e
        }(),
        Fields$e, e1;
    e1 = Fields$e || (Fields$e = {}), e1.DEPLOYMENT_MODEL = "deployment_model", e1.LOCATION = "location", e1.HOSTNAME = "hostname";
    var ApiAppMetadata = function() {
        function t(e, t, r) {
            this.deploymentModel = e, this.location = t, this.hostname = r
        }
        return t.fromJSON = function(e) {
            return new t(e[Fields$e.DEPLOYMENT_MODEL], e[Fields$e.LOCATION], e[Fields$e.HOSTNAME])
        }, t.prototype.toJSON = function() {
            var e;
            return (e = {})[Fields$e.DEPLOYMENT_MODEL] = this.deploymentModel, e[Fields$e.LOCATION] = this.location, e[Fields$e.HOSTNAME] = this.hostname, e
        }, t
    }();

    function inspectResponse(e, t, r) {
        return 200 <= r.statusCode && r.statusCode < 300 ? r : handleRequestError(r)
    }
    var BaseStitchRequestClient = function() {
            function e(e, t) {
                this.baseUrl = e, this.transport = t
            }
            return e.prototype.doRequestToURL = function(t, r) {
                return this.transport.roundTrip(this.buildRequest(t, r)).catch(function(e) {
                    throw new StitchRequestError(e, exports.StitchRequestErrorCode.TRANSPORT_ERROR)
                }).then(function(e) {
                    return inspectResponse(t, r, e)
                })
            }, e.prototype.doStreamRequestToURL = function(e, t, r, n) {
                return void 0 === r && (r = !0), this.transport.stream(this.buildRequest(e, t), r, n).catch(function(e) {
                    if (e instanceof StitchError) throw e;
                    throw new StitchRequestError(e, exports.StitchRequestErrorCode.TRANSPORT_ERROR)
                })
            }, e.prototype.buildRequest = function(e, t) {
                return (new BasicRequest.Builder).withMethod(e.method).withUrl("" + t + e.path).withHeaders(e.headers).withBody(e.body).build()
            }, e
        }(),
        StitchServiceRoutes = function(e) {
            this.clientAppId = e, this.functionCallRoute = getFunctionCallRoute(e)
        },
        StitchAppRoutes = function(e) {
            this.clientAppId = e, this.authRoutes = new StitchAppAuthRoutes(e), this.serviceRoutes = new StitchServiceRoutes(e), this.appMetadataRoute = getAppMetadataRoute(e), this.functionCallRoute = getFunctionCallRoute(e)
        },
        __extends$f = (G1 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                G1(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        G1, __awaiter = function(i, s, u, a) {
            return new(u || (u = Promise))(function(e, t) {
                function r(e) {
                    try {
                        o(a.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function n(e) {
                    try {
                        o(a.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(t) {
                    t.done ? e(t.value) : new u(function(e) {
                        e(t.value)
                    }).then(r, n)
                }
                o((a = a.apply(i, s || [])).next())
            })
        },
        __generator = function(r, n) {
            var o, i, s, e, u = {
                label: 0,
                sent: function() {
                    if (1 & s[0]) throw s[1];
                    return s[1]
                },
                trys: [],
                ops: []
            };
            return e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            }, "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }), e;

            function t(t) {
                return function(e) {
                    return function(t) {
                        if (o) throw new TypeError("Generator is already executing.");
                        for (; u;) try {
                            if (o = 1, i && (s = 2 & t[0] ? i.return : t[0] ? i.throw || ((s = i.return) && s.call(i), 0) : i.next) && !(s = s.call(i, t[1])).done) return s;
                            switch (i = 0, s && (t = [2 & t[0], s.value]), t[0]) {
                                case 0:
                                case 1:
                                    s = t;
                                    break;
                                case 4:
                                    return u.label++, {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    u.label++, i = t[1], t = [0];
                                    continue;
                                case 7:
                                    t = u.ops.pop(), u.trys.pop();
                                    continue;
                                default:
                                    if (!(s = 0 < (s = u.trys).length && s[s.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        u = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!s || t[1] > s[0] && t[1] < s[3])) {
                                        u.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && u.label < s[1]) {
                                        u.label = s[1], s = t;
                                        break
                                    }
                                    if (s && u.label < s[2]) {
                                        u.label = s[2], u.ops.push(t);
                                        break
                                    }
                                    s[2] && u.ops.pop(), u.trys.pop();
                                    continue
                            }
                            t = n.call(r, u)
                        } catch (e) {
                            t = [6, e], i = 0
                        } finally {
                            o = s = 0
                        }
                        if (5 & t[0]) throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        },
        StitchAppRequestClient = function(i) {
            function e(e, t, r) {
                var n = i.call(this, t, r) || this;
                return n.clientAppId = e, n.routes = new StitchAppRoutes(e), n
            }
            return __extends$f(e, i), e.prototype.doRequest = function(t) {
                var r = this;
                return this.initAppMetadata().then(function(e) {
                    return i.prototype.doRequestToURL.call(r, t, e.hostname)
                })
            }, e.prototype.doStreamRequest = function(t, r, n) {
                var o = this;
                return void 0 === r && (r = !0), this.initAppMetadata().then(function(e) {
                    return i.prototype.doStreamRequestToURL.call(o, t, e.hostname, r, n)
                })
            }, e.prototype.getBaseURL = function() {
                return __awaiter(this, void 0, void 0, function() {
                    return __generator(this, function(e) {
                        return [2, this.initAppMetadata().then(function(e) {
                            return e.hostname
                        })]
                    })
                })
            }, e.prototype.initAppMetadata = function() {
                var t = this;
                if (this.appMetadata) return Promise.resolve(this.appMetadata);
                var e = (new StitchRequest.Builder).withMethod(Method$1.GET).withPath(this.routes.appMetadataRoute).build();
                return i.prototype.doRequestToURL.call(this, e, this.baseUrl).then(function(e) {
                    return t.appMetadata = ApiAppMetadata.fromJSON(bson_54.parse(e.body)), t.appMetadata
                })
            }, e
        }(BaseStitchRequestClient),
        __extends$g = (I2 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                I2(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        I2, StitchRequestClient = function(n) {
            function e(e, t) {
                return n.call(this, e, t) || this
            }
            return __extends$g(e, n), e.prototype.doRequest = function(e) {
                return n.prototype.doRequestToURL.call(this, e, this.baseUrl)
            }, e.prototype.doStreamRequest = function(e, t, r) {
                return void 0 === t && (t = !0), n.prototype.doStreamRequestToURL.call(this, e, this.baseUrl, t, r)
            }, e.prototype.getBaseURL = function() {
                return Promise.resolve(this.baseUrl)
            }, e
        }(BaseStitchRequestClient),
        __extends$h = (Z2 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                Z2(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        Z2, AuthRebindEvent = function(r) {
            function e(e) {
                var t = r.call(this) || this;
                return t.type = RebindEventType.AUTH_EVENT, t.event = e, t
            }
            return __extends$h(e, r), e
        }(RebindEvent),
        StitchClientConfiguration = function() {
            function e(e, t, r, n) {
                this.baseUrl = e, this.storage = t, this.dataDirectory = r, this.transport = n
            }
            return e.prototype.builder = function() {
                return new e.Builder(this)
            }, e
        }(),
        p3, q3;
    p3 = StitchClientConfiguration || (StitchClientConfiguration = {}), q3 = function() {
        function e(e) {
            e && (this.baseUrl = e.baseUrl, this.storage = e.storage, this.dataDirectory = e.dataDirectory, this.transport = e.transport)
        }
        return e.prototype.withBaseUrl = function(e) {
            return this.baseUrl = e, this
        }, e.prototype.withStorage = function(e) {
            return this.storage = e, this
        }, e.prototype.withDataDirectory = function(e) {
            return this.dataDirectory = e, this
        }, e.prototype.withTransport = function(e) {
            return this.transport = e, this
        }, e.prototype.build = function() {
            return new p3(this.baseUrl, this.storage, this.dataDirectory, this.transport)
        }, e
    }(), p3.Builder = q3;
    var __extends$i = (x3 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                x3(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        x3, M3, N3;
    exports.StitchAppClientConfiguration = function(o) {
        function e(e, t, r) {
            var n = o.call(this, e.baseUrl, e.storage, e.dataDirectory, e.transport) || this;
            return n.localAppVersion = r, n.localAppName = t, n
        }
        return __extends$i(e, o), e.prototype.builder = function() {
            return new e.Builder(this)
        }, e
    }(StitchClientConfiguration), M3 = exports.StitchAppClientConfiguration || (exports.StitchAppClientConfiguration = {}), N3 = function(r) {
        function e(e) {
            var t = r.call(this, e) || this;
            return e && (t.localAppVersion = e.localAppVersion, t.localAppName = e.localAppName), t
        }
        return __extends$i(e, r), e.prototype.withLocalAppName = function(e) {
            return this.localAppName = e, this
        }, e.prototype.withLocalAppVersion = function(e) {
            return this.localAppVersion = e, this
        }, e.prototype.build = function() {
            var e = r.prototype.build.call(this);
            return new M3(e, this.localAppName, this.localAppVersion)
        }, e
    }(StitchClientConfiguration.Builder), M3.Builder = N3;
    var StitchAppClientInfo = function(e, t, r, n) {
            this.clientAppId = e, this.dataDirectory = t, this.localAppName = r, this.localAppVersion = n
        },
        FacebookRedirectCredential = function(e, t, r) {
            void 0 === t && (t = FacebookAuthProvider.DEFAULT_NAME), void 0 === r && (r = FacebookAuthProvider.TYPE), this.redirectUrl = e, this.providerName = t, this.providerType = r
        },
        GoogleRedirectCredential = function(e, t, r) {
            void 0 === t && (t = GoogleAuthProvider.DEFAULT_NAME), void 0 === r && (r = GoogleAuthProvider.TYPE), this.redirectUrl = e, this.providerName = t, this.providerType = r
        },
        __extends$j = (g4 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                g4(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        g4, UserApiKeyAuthProviderClientImpl = function(r) {
            function e(e, t) {
                return r.call(this, e, t) || this
            }
            return __extends$j(e, r), e.prototype.createApiKey = function(e) {
                return r.prototype.createApiKey.call(this, e)
            }, e.prototype.fetchApiKey = function(e) {
                return r.prototype.fetchApiKey.call(this, e)
            }, e.prototype.fetchApiKeys = function() {
                return r.prototype.fetchApiKeys.call(this)
            }, e.prototype.deleteApiKey = function(e) {
                return r.prototype.deleteApiKey.call(this, e)
            }, e.prototype.enableApiKey = function(e) {
                return r.prototype.enableApiKey.call(this, e)
            }, e.prototype.disableApiKey = function(e) {
                return r.prototype.disableApiKey.call(this, e)
            }, e
        }(CoreUserApiKeyAuthProviderClient);
    (exports.UserApiKeyAuthProviderClient || (exports.UserApiKeyAuthProviderClient = {})).factory = new(function() {
        function e() {}
        return e.prototype.getClient = function(e, t, r) {
            return new UserApiKeyAuthProviderClientImpl(e, r)
        }, e
    }());
    var __extends$k = (D4 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                D4(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        D4, UserPasswordAuthProviderClientImpl = function(n) {
            function e(e, t) {
                return n.call(this, UserPasswordAuthProvider.DEFAULT_NAME, e, t) || this
            }
            return __extends$k(e, n), e.prototype.registerWithEmail = function(e, t) {
                return n.prototype.registerWithEmailInternal.call(this, e, t)
            }, e.prototype.confirmUser = function(e, t) {
                return n.prototype.confirmUserInternal.call(this, e, t)
            }, e.prototype.resendConfirmationEmail = function(e) {
                return n.prototype.resendConfirmationEmailInternal.call(this, e)
            }, e.prototype.resetPassword = function(e, t, r) {
                return n.prototype.resetPasswordInternal.call(this, e, t, r)
            }, e.prototype.sendResetPasswordEmail = function(e) {
                return n.prototype.sendResetPasswordEmailInternal.call(this, e)
            }, e.prototype.callResetPasswordFunction = function(e, t, r) {
                return n.prototype.callResetPasswordFunctionInternal.call(this, e, t, r)
            }, e
        }(CoreUserPasswordAuthProviderClient);
    (exports.UserPasswordAuthProviderClient || (exports.UserPasswordAuthProviderClient = {})).factory = new(function() {
        function e() {}
        return e.prototype.getClient = function(e, t, r) {
            return new UserPasswordAuthProviderClientImpl(t, r)
        }, e
    }());
    var support = {
        searchParams: "URLSearchParams" in self,
        iterable: "Symbol" in self && "iterator" in Symbol,
        blob: "FileReader" in self && "Blob" in self && function() {
            try {
                return new Blob, !0
            } catch (e) {
                return !1
            }
        }(),
        formData: "FormData" in self,
        arrayBuffer: "ArrayBuffer" in self
    };

    function isDataView(e) {
        return e && DataView.prototype.isPrototypeOf(e)
    }
    if (support.arrayBuffer) var viewClasses = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
        isArrayBufferView = ArrayBuffer.isView || function(e) {
            return e && -1 < viewClasses.indexOf(Object.prototype.toString.call(e))
        };

    function normalizeName(e) {
        if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
        return e.toLowerCase()
    }

    function normalizeValue(e) {
        return "string" != typeof e && (e = String(e)), e
    }

    function iteratorFor(t) {
        var e = {
            next: function() {
                var e = t.shift();
                return {
                    done: void 0 === e,
                    value: e
                }
            }
        };
        return support.iterable && (e[Symbol.iterator] = function() {
            return e
        }), e
    }

    function Headers$1(t) {
        this.map = {}, t instanceof Headers$1 ? t.forEach(function(e, t) {
            this.append(t, e)
        }, this) : Array.isArray(t) ? t.forEach(function(e) {
            this.append(e[0], e[1])
        }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
            this.append(e, t[e])
        }, this)
    }

    function consumed(e) {
        if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
        e.bodyUsed = !0
    }

    function fileReaderReady(r) {
        return new Promise(function(e, t) {
            r.onload = function() {
                e(r.result)
            }, r.onerror = function() {
                t(r.error)
            }
        })
    }

    function readBlobAsArrayBuffer(e) {
        var t = new FileReader,
            r = fileReaderReady(t);
        return t.readAsArrayBuffer(e), r
    }

    function readBlobAsText(e) {
        var t = new FileReader,
            r = fileReaderReady(t);
        return t.readAsText(e), r
    }

    function readArrayBufferAsText(e) {
        for (var t = new Uint8Array(e), r = new Array(t.length), n = 0; n < t.length; n++) r[n] = String.fromCharCode(t[n]);
        return r.join("")
    }

    function bufferClone(e) {
        if (e.slice) return e.slice(0);
        var t = new Uint8Array(e.byteLength);
        return t.set(new Uint8Array(e)), t.buffer
    }

    function Body() {
        return this.bodyUsed = !1, this._initBody = function(e) {
            (this._bodyInit = e) ? "string" == typeof e ? this._bodyText = e : support.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : support.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : support.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : support.arrayBuffer && support.blob && isDataView(e) ? (this._bodyArrayBuffer = bufferClone(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || isArrayBufferView(e)) ? this._bodyArrayBuffer = bufferClone(e) : this._bodyText = e = Object.prototype.toString.call(e): this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : support.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
        }, support.blob && (this.blob = function() {
            var e = consumed(this);
            if (e) return e;
            if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData) throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([this._bodyText]))
        }, this.arrayBuffer = function() {
            return this._bodyArrayBuffer ? consumed(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(readBlobAsArrayBuffer)
        }), this.text = function() {
            var e = consumed(this);
            if (e) return e;
            if (this._bodyBlob) return readBlobAsText(this._bodyBlob);
            if (this._bodyArrayBuffer) return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            if (this._bodyFormData) throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText)
        }, support.formData && (this.formData = function() {
            return this.text().then(decode)
        }), this.json = function() {
            return this.text().then(JSON.parse)
        }, this
    }
    Headers$1.prototype.append = function(e, t) {
        e = normalizeName(e), t = normalizeValue(t);
        var r = this.map[e];
        this.map[e] = r ? r + ", " + t : t
    }, Headers$1.prototype.delete = function(e) {
        delete this.map[normalizeName(e)]
    }, Headers$1.prototype.get = function(e) {
        return e = normalizeName(e), this.has(e) ? this.map[e] : null
    }, Headers$1.prototype.has = function(e) {
        return this.map.hasOwnProperty(normalizeName(e))
    }, Headers$1.prototype.set = function(e, t) {
        this.map[normalizeName(e)] = normalizeValue(t)
    }, Headers$1.prototype.forEach = function(e, t) {
        for (var r in this.map) this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this)
    }, Headers$1.prototype.keys = function() {
        var r = [];
        return this.forEach(function(e, t) {
            r.push(t)
        }), iteratorFor(r)
    }, Headers$1.prototype.values = function() {
        var t = [];
        return this.forEach(function(e) {
            t.push(e)
        }), iteratorFor(t)
    }, Headers$1.prototype.entries = function() {
        var r = [];
        return this.forEach(function(e, t) {
            r.push([t, e])
        }), iteratorFor(r)
    }, support.iterable && (Headers$1.prototype[Symbol.iterator] = Headers$1.prototype.entries);
    var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

    function normalizeMethod(e) {
        var t = e.toUpperCase();
        return -1 < methods.indexOf(t) ? t : e
    }

    function Request$1(e, t) {
        var r = (t = t || {}).body;
        if (e instanceof Request$1) {
            if (e.bodyUsed) throw new TypeError("Already read");
            this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new Headers$1(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, r || null == e._bodyInit || (r = e._bodyInit, e.bodyUsed = !0)
        } else this.url = String(e);
        if (this.credentials = t.credentials || this.credentials || "same-origin", !t.headers && this.headers || (this.headers = new Headers$1(t.headers)), this.method = normalizeMethod(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && r) throw new TypeError("Body not allowed for GET or HEAD requests");
        this._initBody(r)
    }

    function decode(e) {
        var o = new FormData;
        return e.trim().split("&").forEach(function(e) {
            if (e) {
                var t = e.split("="),
                    r = t.shift().replace(/\+/g, " "),
                    n = t.join("=").replace(/\+/g, " ");
                o.append(decodeURIComponent(r), decodeURIComponent(n))
            }
        }), o
    }

    function parseHeaders(e) {
        var o = new Headers$1;
        return e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(e) {
            var t = e.split(":"),
                r = t.shift().trim();
            if (r) {
                var n = t.join(":").trim();
                o.append(r, n)
            }
        }), o
    }

    function Response$1(e, t) {
        t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = 200 <= this.status && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new Headers$1(t.headers), this.url = t.url || "", this._initBody(e)
    }
    Request$1.prototype.clone = function() {
        return new Request$1(this, {
            body: this._bodyInit
        })
    }, Body.call(Request$1.prototype), Body.call(Response$1.prototype), Response$1.prototype.clone = function() {
        return new Response$1(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers$1(this.headers),
            url: this.url
        })
    }, Response$1.error = function() {
        var e = new Response$1(null, {
            status: 0,
            statusText: ""
        });
        return e.type = "error", e
    };
    var redirectStatuses = [301, 302, 303, 307, 308];
    Response$1.redirect = function(e, t) {
        if (-1 === redirectStatuses.indexOf(t)) throw new RangeError("Invalid status code");
        return new Response$1(null, {
            status: t,
            headers: {
                location: e
            }
        })
    };
    var DOMException = self.DOMException;
    try {
        new DOMException
    } catch (e) {
        DOMException = function(e, t) {
            this.message = e, this.name = t;
            var r = Error(e);
            this.stack = r.stack
        }, DOMException.prototype = Object.create(Error.prototype), DOMException.prototype.constructor = DOMException
    }

    function fetch$1(i, s) {
        return new Promise(function(r, e) {
            var t = new Request$1(i, s);
            if (t.signal && t.signal.aborted) return e(new DOMException("Aborted", "AbortError"));
            var n = new XMLHttpRequest;

            function o() {
                n.abort()
            }
            n.onload = function() {
                var e = {
                    status: n.status,
                    statusText: n.statusText,
                    headers: parseHeaders(n.getAllResponseHeaders() || "")
                };
                e.url = "responseURL" in n ? n.responseURL : e.headers.get("X-Request-URL");
                var t = "response" in n ? n.response : n.responseText;
                r(new Response$1(t, e))
            }, n.onerror = function() {
                e(new TypeError("Network request failed"))
            }, n.ontimeout = function() {
                e(new TypeError("Network request failed"))
            }, n.onabort = function() {
                e(new DOMException("Aborted", "AbortError"))
            }, n.open(t.method, t.url, !0), "include" === t.credentials ? n.withCredentials = !0 : "omit" === t.credentials && (n.withCredentials = !1), "responseType" in n && support.blob && (n.responseType = "blob"), t.headers.forEach(function(e, t) {
                n.setRequestHeader(t, e)
            }), t.signal && (t.signal.addEventListener("abort", o), n.onreadystatechange = function() {
                4 === n.readyState && t.signal.removeEventListener("abort", o)
            }), n.send(void 0 === t._bodyInit ? null : t._bodyInit)
        })
    }
    fetch$1.polyfill = !0, self.fetch || (self.fetch = fetch$1, self.Headers = Headers$1, self.Request = Request$1, self.Response = Response$1);
    var BrowserFetchTransport = function() {
            function e() {}
            return e.prototype.roundTrip = function(e) {
                var t = fetch$1(e.url, {
                        body: e.body,
                        headers: e.headers,
                        method: e.method,
                        mode: "cors"
                    }),
                    r = t.then(function(e) {
                        return e.text()
                    });
                return Promise.all([t, r]).then(function(e) {
                    var t = e[0],
                        r = e[1],
                        n = {};
                    return t.headers.forEach(function(e, t) {
                        n[t] = e
                    }), new Response(n, t.status, r)
                })
            }, e.prototype.stream = function(e, t, r) {
                throw void 0 === t && (t = !0), new StitchClientError(exports.StitchClientErrorCode.StreamingNotSupported)
            }, e
        }(),
        stitchPrefixKey = "__stitch.client",
        LocalStorage = function() {
            function e(e) {
                this.suiteName = e
            }
            return e.prototype.get = function(e) {
                return localStorage.getItem(this.getKey(e))
            }, e.prototype.set = function(e, t) {
                localStorage.setItem(this.getKey(e), t)
            }, e.prototype.remove = function(e) {
                localStorage.removeItem(this.getKey(e))
            }, e.prototype.getKey = function(e) {
                return stitchPrefixKey + "." + this.suiteName + "." + e
            }, e
        }(),
        __extends$l = (h7 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                h7(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        h7, EventSourceEventStream = function(i) {
            function e(e, t, r, n) {
                var o = i.call(this, n) || this;
                return o.evtSrc = e, o.onOpenError = r, o.openedOnce = !1, o.evtSrc.onopen = function(e) {
                    t(o), o.openedOnce = !0
                }, o.reset(), o
            }
            return __extends$l(e, i), e.prototype.open = function() {
                if (this.closed) throw new StitchClientError(exports.StitchClientErrorCode.StreamClosed)
            }, e.prototype.afterClose = function() {
                this.evtSrc.close()
            }, e.prototype.onReconnect = function(e) {
                this.evtSrc = e.evtSrc, this.reset(), this.events = e.events.concat(this.events)
            }, e.prototype.reset = function() {
                var t = this;
                this.evtSrc.onmessage = function(e) {
                    t.events.push(new Event(Event.MESSAGE_EVENT, e.data)), t.poll()
                }, this.evtSrc.onerror = function(e) {
                    return e instanceof MessageEvent ? (t.lastErr = e.data, t.events.push(new Event(StitchEvent.ERROR_EVENT_NAME, t.lastErr)), t.close(), void t.poll()) : t.openedOnce ? (t.evtSrc.close(), void t.reconnect()) : (t.close(), void t.onOpenError(new Error("event source failed to open and will not reconnect; check network log for more details")))
                }
            }, e
        }(BaseEventStream),
        __extends$m = (C7 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                C7(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        C7, __assign = Object.assign || function(e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
                for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        },
        BrowserFetchStreamTransport = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends$m(t, e), t.prototype.stream = function(e, t, n) {
                void 0 === t && (t = !0);
                var r = __assign({}, e.headers);
                return r[Headers.ACCEPT] = ContentTypes.TEXT_EVENT_STREAM, r[Headers.CONTENT_TYPE] = ContentTypes.TEXT_EVENT_STREAM, fetch$1(e.url + "&stitch_validate=true", {
                    body: e.body,
                    headers: r,
                    method: e.method,
                    mode: "cors"
                }).then(function(t) {
                    var r = {};
                    return t.headers.forEach(function(e, t) {
                        r[t] = e
                    }), t.status < 200 || 300 <= t.status ? t.text().then(function(e) {
                        return handleRequestError(new Response(r, t.status, e))
                    }) : new Promise(function(t, r) {
                        return new EventSourceEventStream(new EventSource(e.url), function(e) {
                            return t(e)
                        }, function(e) {
                            return r(e)
                        }, n ? function() {
                            return n().then(function(e) {
                                return e
                            })
                        } : void 0)
                    })
                })
            }, t
        }(BrowserFetchTransport),
        StitchServiceClientImpl = function() {
            function e(e) {
                this.proxy = e
            }
            return e.prototype.callFunction = function(e, t, r) {
                return this.proxy.callFunction(e, t, r)
            }, e.prototype.streamFunction = function(e, t, r) {
                return this.proxy.streamFunction(e, t, r)
            }, e
        }();

    function defaultSetTimout$1() {
        throw new Error("setTimeout has not been defined")
    }

    function defaultClearTimeout$1() {
        throw new Error("clearTimeout has not been defined")
    }
    var cachedSetTimeout$1 = defaultSetTimout$1,
        cachedClearTimeout$1 = defaultClearTimeout$1;

    function runTimeout$1(t) {
        if (cachedSetTimeout$1 === setTimeout) return setTimeout(t, 0);
        if ((cachedSetTimeout$1 === defaultSetTimout$1 || !cachedSetTimeout$1) && setTimeout) return cachedSetTimeout$1 = setTimeout, setTimeout(t, 0);
        try {
            return cachedSetTimeout$1(t, 0)
        } catch (e) {
            try {
                return cachedSetTimeout$1.call(null, t, 0)
            } catch (e) {
                return cachedSetTimeout$1.call(this, t, 0)
            }
        }
    }

    function runClearTimeout$1(t) {
        if (cachedClearTimeout$1 === clearTimeout) return clearTimeout(t);
        if ((cachedClearTimeout$1 === defaultClearTimeout$1 || !cachedClearTimeout$1) && clearTimeout) return cachedClearTimeout$1 = clearTimeout, clearTimeout(t);
        try {
            return cachedClearTimeout$1(t)
        } catch (e) {
            try {
                return cachedClearTimeout$1.call(null, t)
            } catch (e) {
                return cachedClearTimeout$1.call(this, t)
            }
        }
    }
    "function" == typeof global$1.setTimeout && (cachedSetTimeout$1 = setTimeout), "function" == typeof global$1.clearTimeout && (cachedClearTimeout$1 = clearTimeout);
    var queue$1 = [],
        draining$1 = !1,
        currentQueue$1, queueIndex$1 = -1;

    function cleanUpNextTick$1() {
        draining$1 && currentQueue$1 && (draining$1 = !1, currentQueue$1.length ? queue$1 = currentQueue$1.concat(queue$1) : queueIndex$1 = -1, queue$1.length && drainQueue$1())
    }

    function drainQueue$1() {
        if (!draining$1) {
            var e = runTimeout$1(cleanUpNextTick$1);
            draining$1 = !0;
            for (var t = queue$1.length; t;) {
                for (currentQueue$1 = queue$1, queue$1 = []; ++queueIndex$1 < t;) currentQueue$1 && currentQueue$1[queueIndex$1].run();
                queueIndex$1 = -1, t = queue$1.length
            }
            currentQueue$1 = null, draining$1 = !1, runClearTimeout$1(e)
        }
    }

    function nextTick$1(e) {
        var t = new Array(arguments.length - 1);
        if (1 < arguments.length)
            for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        queue$1.push(new Item$1(e, t)), 1 !== queue$1.length || draining$1 || runTimeout$1(drainQueue$1)
    }

    function Item$1(e, t) {
        this.fun = e, this.array = t
    }
    Item$1.prototype.run = function() {
        this.fun.apply(null, this.array)
    };
    var title$1 = "browser",
        platform$1 = "browser",
        browser$1 = !0,
        env$1 = {},
        argv$1 = [],
        version$1 = "",
        versions$1 = {},
        release$1 = {},
        config$1 = {};

    function noop$1() {}
    var on$1 = noop$1,
        addListener$1 = noop$1,
        once$1 = noop$1,
        off$1 = noop$1,
        removeListener$1 = noop$1,
        removeAllListeners$1 = noop$1,
        emit$1 = noop$1;

    function binding$1(e) {
        throw new Error("process.binding is not supported")
    }

    function cwd$1() {
        return "/"
    }

    function chdir$1(e) {
        throw new Error("process.chdir is not supported")
    }

    function umask$1() {
        return 0
    }
    var performance$1 = global$1.performance || {},
        performanceNow$1 = performance$1.now || performance$1.mozNow || performance$1.msNow || performance$1.oNow || performance$1.webkitNow || function() {
            return (new Date).getTime()
        };

    function hrtime$1(e) {
        var t = .001 * performanceNow$1.call(performance$1),
            r = Math.floor(t),
            n = Math.floor(t % 1 * 1e9);
        return e && (r -= e[0], (n -= e[1]) < 0 && (r--, n += 1e9)), [r, n]
    }
    var startTime$1 = new Date;

    function uptime$1() {
        return (new Date - startTime$1) / 1e3
    }
    var process$1 = {
        nextTick: nextTick$1,
        title: title$1,
        browser: browser$1,
        env: env$1,
        argv: argv$1,
        version: version$1,
        versions: versions$1,
        on: on$1,
        addListener: addListener$1,
        once: once$1,
        off: off$1,
        removeListener: removeListener$1,
        removeAllListeners: removeAllListeners$1,
        emit: emit$1,
        binding: binding$1,
        cwd: cwd$1,
        chdir: chdir$1,
        umask: umask$1,
        hrtime: hrtime$1,
        platform: platform$1,
        release: release$1,
        config: config$1,
        uptime: uptime$1
    };

    function detect() {
        return "undefined" != typeof navigator ? parseUserAgent(navigator.userAgent) : getNodeVersion()
    }

    function detectOS(t) {
        var e = getOperatingSystemRules().filter(function(e) {
            return e.rule && e.rule.test(t)
        })[0];
        return e ? e.name : null
    }

    function getNodeVersion() {
        return void 0 !== process$1 && process$1.version && {
            name: "node",
            version: process$1.version.slice(1),
            os: process$1.platform
        }
    }

    function parseUserAgent(n) {
        var e = getBrowserRules();
        if (!n) return null;
        var t = e.map(function(e) {
            var t = e.rule.exec(n),
                r = t && t[1].split(/[._]/).slice(0, 3);
            return r && r.length < 3 && (r = r.concat(1 == r.length ? [0, 0] : [0])), t && {
                name: e.name,
                version: r.join(".")
            }
        }).filter(Boolean)[0] || null;
        return t && (t.os = detectOS(n)), /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/i.test(n) && ((t = t || {}).bot = !0), t
    }

    function getBrowserRules() {
        return buildRules([
            ["aol", /AOLShield\/([0-9\._]+)/],
            ["edge", /Edge\/([0-9\._]+)/],
            ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
            ["vivaldi", /Vivaldi\/([0-9\.]+)/],
            ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
            ["samsung", /SamsungBrowser\/([0-9\.]+)/],
            ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
            ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
            ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
            ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
            ["fxios", /FxiOS\/([0-9\.]+)/],
            ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
            ["opera", /OPR\/([0-9\.]+)(:?\s|$)$/],
            ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
            ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
            ["ie", /MSIE\s(7\.0)/],
            ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
            ["android", /Android\s([0-9\.]+)/],
            ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
            ["safari", /Version\/([0-9\._]+).*Safari/],
            ["facebook", /FBAV\/([0-9\.]+)/],
            ["instagram", /Instagram\s([0-9\.]+)/],
            ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/]
        ])
    }

    function getOperatingSystemRules() {
        return buildRules([
            ["iOS", /iP(hone|od|ad)/],
            ["Android OS", /Android/],
            ["BlackBerry OS", /BlackBerry|BB10/],
            ["Windows Mobile", /IEMobile/],
            ["Amazon OS", /Kindle/],
            ["Windows 3.11", /Win16/],
            ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
            ["Windows 98", /(Windows 98)|(Win98)/],
            ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
            ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
            ["Windows Server 2003", /(Windows NT 5.2)/],
            ["Windows Vista", /(Windows NT 6.0)/],
            ["Windows 7", /(Windows NT 6.1)/],
            ["Windows 8", /(Windows NT 6.2)/],
            ["Windows 8.1", /(Windows NT 6.3)/],
            ["Windows 10", /(Windows NT 10.0)/],
            ["Windows ME", /Windows ME/],
            ["Open BSD", /OpenBSD/],
            ["Sun OS", /SunOS/],
            ["Linux", /(Linux)|(X11)/],
            ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
            ["QNX", /QNX/],
            ["BeOS", /BeOS/],
            ["OS/2", /OS\/2/],
            ["Search Bot", /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/]
        ])
    }

    function buildRules(e) {
        return e.map(function(e) {
            return {
                name: e[0],
                rule: e[1]
            }
        })
    }
    var detectBrowser = {
            detect: detect,
            detectOS: detectOS,
            getNodeVersion: getNodeVersion,
            parseUserAgent: parseUserAgent
        },
        detectBrowser_1 = detectBrowser.detect,
        version$2 = "4.9.0",
        RedirectFragmentFields, U8;
    U8 = RedirectFragmentFields || (RedirectFragmentFields = {}), U8.StitchError = "_stitch_error", U8.State = "_stitch_state", U8.UserAuth = "_stitch_ua", U8.LinkUser = "_stitch_link_user", U8.StitchLink = "_stitch_link", U8.ClientAppId = "_stitch_client_app_id";
    var RedirectFragmentFields$1 = RedirectFragmentFields,
        RedirectKeys, V8;
    V8 = RedirectKeys || (RedirectKeys = {}), V8.ProviderName = "_stitch_redirect_provider_name", V8.ProviderType = "_stitch_redirect_provider_type", V8.State = "_stitch_redirect_state";
    var RedirectKeys$1 = RedirectKeys,
        __extends$n = (W8 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                W8(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        W8, StitchRedirectError = function(t) {
            function e(e) {
                return t.call(this, e) || this
            }
            return __extends$n(e, t), e
        }(StitchError),
        __extends$o = (g9 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                g9(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        g9, StitchUserImpl = function(c) {
            function e(e, t, r, n, o, i, s, u) {
                var a = c.call(this, e, t, r, n, o, i, u) || this;
                return a.auth = s, a
            }
            return __extends$o(e, c), e.prototype.linkWithCredential = function(e) {
                return this.auth.linkWithCredential(this, e)
            }, e.prototype.linkUserWithRedirect = function(e) {
                return this.auth.linkWithRedirectInternal(this, e)
            }, e
        }(CoreStitchUserImpl),
        StitchUserFactoryImpl = function() {
            function e(e) {
                this.auth = e
            }
            return e.prototype.makeUser = function(e, t, r, n, o, i, s) {
                return new StitchUserImpl(e, t, r, n, o, i, this.auth, s)
            }, e
        }(),
        __extends$p = (L9 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                L9(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        L9, __read$1 = function(e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e),
                s = [];
            try {
                for (;
                    (void 0 === t || 0 < t--) && !(n = i.next()).done;) s.push(n.value)
            } catch (e) {
                o = {
                    error: e
                }
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return s
        },
        alphaNumericCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        StitchAuthImpl = function(s) {
            function u(e, t, r, n, o) {
                void 0 === o && (o = window);
                var i = s.call(this, e, t, r) || this;
                return i.browserAuthRoutes = t, i.authStorage = r, i.appInfo = n, i.jsdomWindow = o, i.listeners = new Set, i.synchronousListeners = new Set, i
            }
            return __extends$p(u, s), Object.defineProperty(u.prototype, "userFactory", {
                get: function() {
                    return new StitchUserFactoryImpl(this)
                },
                enumerable: !0,
                configurable: !0
            }), u.prototype.getProviderClient = function(e, t) {
                return isAuthProviderClientFactory(e) ? e.getClient(this, this.requestClient, this.authRoutes) : e.getNamedClient(t, this.requestClient, this.authRoutes)
            }, u.prototype.loginWithCredential = function(e) {
                return s.prototype.loginWithCredentialInternal.call(this, e)
            }, u.prototype.loginWithRedirect = function(t) {
                var r = this,
                    e = this.prepareRedirect(t),
                    n = e.redirectUrl,
                    o = e.state;
                this.requestClient.getBaseURL().then(function(e) {
                    r.jsdomWindow.location.replace(e + r.browserAuthRoutes.getAuthProviderRedirectRoute(t, n, o, r.deviceInfo))
                })
            }, u.prototype.linkWithRedirectInternal = function(e, r) {
                var n = this;
                if (void 0 !== this.user && e.id !== this.user.id) return Promise.reject(new StitchClientError(exports.StitchClientErrorCode.UserNoLongerValid));
                var t = this.prepareRedirect(r),
                    o = t.redirectUrl,
                    i = t.state;
                return this.requestClient.getBaseURL().then(function(e) {
                    var t = e + n.browserAuthRoutes.getAuthProviderLinkRedirectRoute(r, o, i, n.deviceInfo);
                    return (u.injectedFetch ? u.injectedFetch : fetch)(new Request(t, {
                        credentials: "include",
                        headers: {
                            Authorization: "Bearer " + n.authInfo.accessToken
                        },
                        mode: "cors"
                    }))
                }).then(function(e) {
                    n.jsdomWindow.location.replace(e.headers.get("X-Stitch-Location"))
                })
            }, u.prototype.hasRedirectResult = function() {
                var e = !1;
                try {
                    return e = this.parseRedirect().isValid
                } catch (e) {
                    return !1
                } finally {
                    e || this.cleanupRedirect()
                }
            }, u.prototype.handleRedirectResult = function() {
                try {
                    var e = this.authStorage.get(RedirectKeys$1.ProviderName),
                        t = this.authStorage.get(RedirectKeys$1.ProviderType),
                        r = this.parseRedirect();
                    return this.loginWithCredentialInternal(new StitchAuthResponseCredential(this.processRedirectResult(r), t, e, r.asLink)).then(function(e) {
                        return e
                    })
                } catch (e) {
                    return Promise.reject(e)
                }
            }, u.prototype.linkWithCredential = function(e, t) {
                return s.prototype.linkUserWithCredentialInternal.call(this, e, t)
            }, u.prototype.logout = function() {
                return 0 < arguments.length ? Promise.reject(new StitchClientError(exports.StitchClientErrorCode.UnexpectedArguments)) : s.prototype.logoutInternal.call(this)
            }, u.prototype.logoutUserWithId = function(e) {
                return s.prototype.logoutUserWithIdInternal.call(this, e)
            }, u.prototype.removeUser = function() {
                return 0 < arguments.length ? Promise.reject(new StitchClientError(exports.StitchClientErrorCode.UnexpectedArguments)) : s.prototype.removeUserInternal.call(this)
            }, u.prototype.removeUserWithId = function(e) {
                return s.prototype.removeUserWithIdInternal.call(this, e)
            }, Object.defineProperty(u.prototype, "deviceInfo", {
                get: function() {
                    var e = {};
                    this.hasDeviceId && (e[DeviceFields$1.DEVICE_ID] = this.deviceId), void 0 !== this.appInfo.localAppName && (e[DeviceFields$1.APP_ID] = this.appInfo.localAppName), void 0 !== this.appInfo.localAppVersion && (e[DeviceFields$1.APP_VERSION] = this.appInfo.localAppVersion);
                    var t = detectBrowser_1();
                    return t ? (e[DeviceFields$1.PLATFORM] = t.name, e[DeviceFields$1.PLATFORM_VERSION] = t.version) : (e[DeviceFields$1.PLATFORM] = "web", e[DeviceFields$1.PLATFORM_VERSION] = "0.0.0"), e[DeviceFields$1.SDK_VERSION] = version$2, e
                },
                enumerable: !0,
                configurable: !0
            }), u.prototype.addAuthListener = function(e) {
                this.listeners.add(e), this.onAuthEvent(e), this.dispatchAuthEvent({
                    kind: AuthEventKind.ListenerRegistered
                })
            }, u.prototype.addSynchronousAuthListener = function(e) {
                this.listeners.add(e), this.onAuthEvent(e), this.dispatchAuthEvent({
                    kind: AuthEventKind.ListenerRegistered
                })
            }, u.prototype.removeAuthListener = function(e) {
                this.listeners.delete(e)
            }, u.prototype.onAuthEvent = function(t) {
                var r = this;
                if (t) new Promise(function(e) {
                    t.onAuthEvent && t.onAuthEvent(r), e(void 0)
                });
                else this.listeners.forEach(function(e) {
                    r.onAuthEvent(e)
                })
            }, u.prototype.dispatchAuthEvent = function(t) {
                var r = this;
                switch (t.kind) {
                    case AuthEventKind.ActiveUserChanged:
                        this.dispatchBlockToListeners(function(e) {
                            e.onActiveUserChanged && e.onActiveUserChanged(r, t.currentActiveUser, t.previousActiveUser)
                        });
                        break;
                    case AuthEventKind.ListenerRegistered:
                        this.dispatchBlockToListeners(function(e) {
                            e.onListenerRegistered && e.onListenerRegistered(r)
                        });
                        break;
                    case AuthEventKind.UserAdded:
                        this.dispatchBlockToListeners(function(e) {
                            e.onUserAdded && e.onUserAdded(r, t.addedUser)
                        });
                        break;
                    case AuthEventKind.UserLinked:
                        this.dispatchBlockToListeners(function(e) {
                            e.onUserLinked && e.onUserLinked(r, t.linkedUser)
                        });
                        break;
                    case AuthEventKind.UserLoggedIn:
                        this.dispatchBlockToListeners(function(e) {
                            e.onUserLoggedIn && e.onUserLoggedIn(r, t.loggedInUser)
                        });
                        break;
                    case AuthEventKind.UserLoggedOut:
                        this.dispatchBlockToListeners(function(e) {
                            e.onUserLoggedOut && e.onUserLoggedOut(r, t.loggedOutUser)
                        });
                        break;
                    case AuthEventKind.UserRemoved:
                        this.dispatchBlockToListeners(function(e) {
                            e.onUserRemoved && e.onUserRemoved(r, t.removedUser)
                        });
                        break;
                    default:
                        return this.assertNever(t)
                }
            }, u.prototype.refreshCustomData = function() {
                return this.refreshAccessToken()
            }, u.prototype.assertNever = function(e) {
                throw new Error("unexpected object: " + e)
            }, u.prototype.dispatchBlockToListeners = function(r) {
                this.synchronousListeners.forEach(r), this.listeners.forEach(function(t) {
                    new Promise(function(e) {
                        r(t), e(void 0)
                    })
                })
            }, u.prototype.cleanupRedirect = function() {
                this.jsdomWindow.history.replaceState(null, "", this.pageRootUrl()), this.authStorage.remove(RedirectKeys$1.State), this.authStorage.remove(RedirectKeys$1.ProviderName), this.authStorage.remove(RedirectKeys$1.ProviderType)
            }, u.prototype.parseRedirect = function() {
                if (void 0 === this.jsdomWindow) throw new StitchRedirectError("running in a non-browser environment");
                if (!this.jsdomWindow.location || !this.jsdomWindow.location.hash) throw new StitchRedirectError("window location hash was undefined");
                var e = this.authStorage.get(RedirectKeys$1.State);
                return parseRedirectFragment(this.jsdomWindow.location.hash.substring(1), e, this.appInfo.clientAppId)
            }, u.prototype.processRedirectResult = function(e) {
                try {
                    if (!e.isValid) throw new StitchRedirectError("invalid redirect result");
                    if (e.lastError) throw new StitchRedirectError("error handling redirect: " + e.lastError);
                    if (!e.authInfo) throw new StitchRedirectError("no user auth value was found: it could not be decoded from fragment")
                } catch (e) {
                    throw e
                } finally {
                    this.cleanupRedirect()
                }
                return e.authInfo
            }, u.prototype.prepareRedirect = function(e) {
                this.authStorage.set(RedirectKeys$1.ProviderName, e.providerName), this.authStorage.set(RedirectKeys$1.ProviderType, e.providerType);
                var t = e.redirectUrl;
                void 0 === t && (t = this.pageRootUrl());
                var r = generateState();
                return this.authStorage.set(RedirectKeys$1.State, r), {
                    redirectUrl: t,
                    state: r
                }
            }, u.prototype.pageRootUrl = function() {
                return [this.jsdomWindow.location.protocol, "//", this.jsdomWindow.location.host, this.jsdomWindow.location.pathname].join("")
            }, u
        }(CoreStitchAuth);

    function generateState() {
        for (var e = "", t = 0; t < 64; ++t) e += alphaNumericCharacters.charAt(Math.floor(Math.random() * alphaNumericCharacters.length));
        return e
    }

    function unmarshallUserAuth(e) {
        var t = e.split("$");
        if (4 !== t.length) throw new StitchRedirectError("invalid user auth data provided while marshalling user authentication data: " + e);
        var r = __read$1(t, 4),
            n = r[0],
            o = r[1],
            i = r[2],
            s = r[3];
        return new AuthInfo(i, s, n, o)
    }
    var ParsedRedirectFragment = function() {
        function e() {
            this.stateValid = !1, this.clientAppIdValid = !1, this.asLink = !1
        }
        return Object.defineProperty(e.prototype, "isValid", {
            get: function() {
                return this.stateValid && this.clientAppIdValid
            },
            enumerable: !0,
            configurable: !0
        }), e
    }();

    function parseRedirectFragment(e, o, i) {
        var t = e.split("&"),
            s = new ParsedRedirectFragment;
        return t.forEach(function(e) {
            var t = e.split("=");
            switch (decodeURIComponent(t[0])) {
                case RedirectFragmentFields$1.StitchError:
                    s.lastError = decodeURIComponent(t[1]);
                    break;
                case RedirectFragmentFields$1.UserAuth:
                    try {
                        s.authInfo = unmarshallUserAuth(decodeURIComponent(t[1]))
                    } catch (e) {
                        s.lastError = e
                    }
                    break;
                case RedirectFragmentFields$1.StitchLink:
                    "ok" === t[1] && (s.asLink = !0);
                    break;
                case RedirectFragmentFields$1.State:
                    var r = decodeURIComponent(t[1]);
                    o === r && (s.stateValid = !0);
                    break;
                case RedirectFragmentFields$1.ClientAppId:
                    var n = decodeURIComponent(t[1]);
                    i === n && (s.clientAppIdValid = !0)
            }
        }), s
    }

    function isAuthProviderClientFactory(e) {
        return void 0 !== e.getClient
    }
    var __extends$q = (Kba = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                Kba(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        Kba, StitchBrowserAppAuthRoutes = function(t) {
            function e(e) {
                return t.call(this, e) || this
            }
            return __extends$q(e, t), e.prototype.getAuthProviderRedirectRoute = function(e, t, r, n) {
                return this.getAuthProviderLoginRoute(e.providerName) + "?redirect=" + encodeURI(t) + "&state=" + r + "&device=" + this.uriEncodeObject(n)
            }, e.prototype.getAuthProviderLinkRedirectRoute = function(e, t, r, n) {
                return this.getAuthProviderLoginRoute(e.providerName) + "?redirect=" + encodeURI(t) + "&state=" + r + "&device=" + this.uriEncodeObject(n) + "&link=true&providerRedirectHeader=true"
            }, e.prototype.uriEncodeObject = function(e) {
                return encodeURIComponent(base64Encode(JSON.stringify(e)))
            }, e
        }(StitchAppAuthRoutes),
        __extends$r = (dca = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                dca(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        dca, StitchBrowserAppRoutes = function(r) {
            function e(e) {
                var t = r.call(this, e) || this;
                return t.authRoutes = new StitchBrowserAppAuthRoutes(e), t
            }
            return __extends$r(e, r), e
        }(StitchAppRoutes),
        StitchAppClientImpl = function() {
            function e(e, t) {
                this.info = new StitchAppClientInfo(e, t.dataDirectory, t.localAppName, t.localAppVersion), this.routes = new StitchBrowserAppRoutes(this.info.clientAppId);
                var r = new StitchAppRequestClient(e, t.baseUrl, t.transport);
                this.auth = new StitchAuthImpl(r, this.routes.authRoutes, t.storage, this.info), this.coreClient = new CoreStitchAppClient(this.auth, this.routes), this.serviceClients = [], this.auth.addSynchronousAuthListener(this)
            }
            return e.prototype.getServiceClient = function(e, t) {
                if (isServiceClientFactory(e)) {
                    var r = new CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, "");
                    return this.bindServiceClient(r), e.getClient(r, this.info)
                }
                r = new CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, t);
                return this.bindServiceClient(r), e.getNamedClient(r, this.info)
            }, e.prototype.getGeneralServiceClient = function(e) {
                var t = new CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, e);
                return this.bindServiceClient(t), new StitchServiceClientImpl(t)
            }, e.prototype.callFunction = function(e, t) {
                return this.coreClient.callFunction(e, t)
            }, e.prototype.onActiveUserChanged = function(e, t, r) {
                this.onRebindEvent(new AuthRebindEvent({
                    currentActiveUser: t,
                    kind: AuthEventKind.ActiveUserChanged,
                    previousActiveUser: r
                }))
            }, e.prototype.bindServiceClient = function(e) {
                this.serviceClients.push(e)
            }, e.prototype.onRebindEvent = function(t) {
                this.serviceClients.forEach(function(e) {
                    e.onRebindEvent(t)
                })
            }, e
        }();

    function isServiceClientFactory(e) {
        return void 0 !== e.getClient
    }
    var DEFAULT_BASE_URL = "https://stitch.mongodb.com",
        appClients = {},
        Stitch = function() {
            function o() {}
            return Object.defineProperty(o, "defaultAppClient", {
                get: function() {
                    if (void 0 === o.defaultClientAppId) throw new Error("default app client has not yet been initialized/set");
                    return appClients[o.defaultClientAppId]
                },
                enumerable: !0,
                configurable: !0
            }), o.getAppClient = function(e) {
                if (void 0 === appClients[e]) throw new Error("client for app '" + e + "' has not yet been initialized");
                return appClients[e]
            }, o.hasAppClient = function(e) {
                return void 0 !== appClients[e]
            }, o.initializeDefaultAppClient = function(e, t) {
                if (void 0 === t && (t = (new exports.StitchAppClientConfiguration.Builder).build()), void 0 === e || "" === e) throw new Error("clientAppId must be set to a non-empty string");
                if (void 0 !== o.defaultClientAppId) throw new Error("default app can only be set once; currently set to '" + o.defaultClientAppId + "'");
                var r = o.initializeAppClient(e, t);
                return o.defaultClientAppId = e, r
            }, o.initializeAppClient = function(e, t) {
                if (void 0 === t && (t = (new exports.StitchAppClientConfiguration.Builder).build()), void 0 === e || "" === e) throw new Error("clientAppId must be set to a non-empty string");
                if (void 0 !== appClients[e]) throw new Error("client for app '" + e + "' has already been initialized");
                var r = t.builder ? t.builder() : new exports.StitchAppClientConfiguration.Builder(t);
                void 0 === r.storage && r.withStorage(new LocalStorage(e)), void 0 === r.transport && (window.EventSource ? r.withTransport(new BrowserFetchStreamTransport) : r.withTransport(new BrowserFetchTransport)), void 0 !== r.baseUrl && "" !== r.baseUrl || r.withBaseUrl(DEFAULT_BASE_URL), void 0 !== r.localAppName && "" !== r.localAppName || r.withLocalAppName(o.localAppName), void 0 !== r.localAppVersion && "" !== r.localAppVersion || r.withLocalAppVersion(o.localAppVersion);
                var n = new StitchAppClientImpl(e, r.build());
                return appClients[e] = n
            }, o.clearApps = function() {
                appClients = {}
            }, o
        }(),
        CoreRemoteMongoReadOperation = function() {
            function e(e, t, r, n) {
                this.command = e, this.args = t, this.service = r, n && (this.collectionDecoder = new(function() {
                    function e() {}
                    return e.prototype.decode = function(e) {
                        return e instanceof Array ? e.map(function(e) {
                            return n.decode(e)
                        }) : [n.decode(e)]
                    }, e
                }()))
            }
            return e.prototype.iterator = function() {
                return this.executeRead().then(function(e) {
                    return e[Symbol.iterator]()
                })
            }, e.prototype.first = function() {
                return this.executeRead().then(function(e) {
                    return e[0]
                })
            }, e.prototype.toArray = function() {
                return this.executeRead()
            }, e.prototype.asArray = function() {
                return this.toArray()
            }, e.prototype.executeRead = function() {
                return this.service.callFunction(this.command, [this.args], this.collectionDecoder)
            }, e
        }(),
        OperationType, ada;

    function operationTypeFromRemote(e) {
        switch (e) {
            case "insert":
                return OperationType.Insert;
            case "delete":
                return OperationType.Delete;
            case "replace":
                return OperationType.Replace;
            case "update":
                return OperationType.Update;
            default:
                return OperationType.Unknown
        }
    }
    ada = OperationType || (OperationType = {}), ada.Insert = "insert", ada.Delete = "delete", ada.Replace = "replace", ada.Update = "update", ada.Unknown = "unknown";
    var RemoteInsertManyResult = function(e) {
            var r = {};
            e.forEach(function(e, t) {
                r[t] = e
            }), this.insertedIds = r
        },
        RemoteInsertManyResultFields, RemoteInsertOneResultFields, RemoteUpdateResultFields, jda, RemoteDeleteResultFields, UpdateDescriptionFields, lda, ChangeEventFields, mda, CompactChangeEventFields, nda;
    (RemoteInsertManyResultFields || (RemoteInsertManyResultFields = {})).InsertedIds = "insertedIds", (RemoteInsertOneResultFields || (RemoteInsertOneResultFields = {})).InsertedId = "insertedId", jda = RemoteUpdateResultFields || (RemoteUpdateResultFields = {}), jda.MatchedCount = "matchedCount", jda.ModifiedCount = "modifiedCount", jda.UpsertedId = "upsertedId", (RemoteDeleteResultFields || (RemoteDeleteResultFields = {})).DeletedCount = "deletedCount", lda = UpdateDescriptionFields || (UpdateDescriptionFields = {}), lda.UpdatedFields = "updatedFields", lda.RemovedFields = "removedFields", mda = ChangeEventFields || (ChangeEventFields = {}), mda.Id = "_id", mda.OperationType = "operationType", mda.FullDocument = "fullDocument", mda.DocumentKey = "documentKey", mda.Namespace = "ns", mda.NamespaceDb = "db", mda.NamespaceColl = "coll", mda.UpdateDescription = "updateDescription", nda = CompactChangeEventFields || (CompactChangeEventFields = {}), nda.OperationType = "ot", nda.FullDocument = "fd", nda.DocumentKey = "dk", nda.UpdateDescription = "ud", nda.StitchDocumentVersion = "sdv", nda.StitchDocumentHash = "sdh";
    var RemoteInsertManyResultDecoder = function() {
            function e() {}
            return e.prototype.decode = function(e) {
                return new RemoteInsertManyResult(e[RemoteInsertManyResultFields.InsertedIds])
            }, e
        }(),
        RemoteInsertOneResultDecoder = function() {
            function e() {}
            return e.prototype.decode = function(e) {
                return {
                    insertedId: e[RemoteInsertOneResultFields.InsertedId]
                }
            }, e
        }(),
        RemoteUpdateResultDecoder = function() {
            function e() {}
            return e.prototype.decode = function(e) {
                return {
                    matchedCount: e[RemoteUpdateResultFields.MatchedCount],
                    modifiedCount: e[RemoteUpdateResultFields.ModifiedCount],
                    upsertedId: e[RemoteUpdateResultFields.UpsertedId]
                }
            }, e
        }(),
        RemoteDeleteResultDecoder = function() {
            function e() {}
            return e.prototype.decode = function(e) {
                return {
                    deletedCount: e[RemoteDeleteResultFields.DeletedCount]
                }
            }, e
        }(),
        UpdateDescriptionDecoder = function() {
            function e() {}
            return e.prototype.decode = function(e) {
                return Assertions.keyPresent(UpdateDescriptionFields.UpdatedFields, e), Assertions.keyPresent(UpdateDescriptionFields.RemovedFields, e), {
                    removedFields: e[UpdateDescriptionFields.RemovedFields],
                    updatedFields: e[UpdateDescriptionFields.UpdatedFields]
                }
            }, e
        }();

    function decodeBaseChangeEventFields(e, t, r, n) {
        var o, i;
        return o = t in e ? ResultDecoders.updateDescriptionDecoder.decode(e[t]) : void 0, r in e ? (i = e[r], n && (i = n.decode(i))) : i = void 0, {
            updateDescription: o,
            fullDocument: i
        }
    }
    var ChangeEventDecoder = function() {
            function e(e) {
                this.decoder = e
            }
            return e.prototype.decode = function(e) {
                Assertions.keyPresent(ChangeEventFields.Id, e), Assertions.keyPresent(ChangeEventFields.OperationType, e), Assertions.keyPresent(ChangeEventFields.Namespace, e), Assertions.keyPresent(ChangeEventFields.DocumentKey, e);
                var t = e[ChangeEventFields.Namespace],
                    r = decodeBaseChangeEventFields(e, ChangeEventFields.UpdateDescription, ChangeEventFields.FullDocument, this.decoder),
                    n = r.updateDescription,
                    o = r.fullDocument;
                return {
                    documentKey: e[ChangeEventFields.DocumentKey],
                    fullDocument: o,
                    id: e[ChangeEventFields.Id],
                    namespace: {
                        collection: t[ChangeEventFields.NamespaceColl],
                        database: t[ChangeEventFields.NamespaceDb]
                    },
                    operationType: operationTypeFromRemote(e[ChangeEventFields.OperationType]),
                    updateDescription: n
                }
            }, e
        }(),
        CompactChangeEventDecoder = function() {
            function e(e) {
                this.decoder = e
            }
            return e.prototype.decode = function(e) {
                Assertions.keyPresent(CompactChangeEventFields.OperationType, e), Assertions.keyPresent(CompactChangeEventFields.DocumentKey, e);
                var t, r, n = decodeBaseChangeEventFields(e, CompactChangeEventFields.UpdateDescription, CompactChangeEventFields.FullDocument, this.decoder),
                    o = n.updateDescription,
                    i = n.fullDocument;
                return t = CompactChangeEventFields.StitchDocumentVersion in e ? e[CompactChangeEventFields.StitchDocumentVersion] : void 0, r = CompactChangeEventFields.StitchDocumentHash in e ? e[CompactChangeEventFields.StitchDocumentHash] : void 0, {
                    documentKey: e[CompactChangeEventFields.DocumentKey],
                    fullDocument: i,
                    operationType: operationTypeFromRemote(e[CompactChangeEventFields.OperationType]),
                    stitchDocumentHash: r,
                    stitchDocumentVersion: t,
                    updateDescription: o
                }
            }, e
        }(),
        ResultDecoders = function() {
            function e() {}
            return e.remoteInsertManyResultDecoder = new RemoteInsertManyResultDecoder, e.remoteInsertOneResultDecoder = new RemoteInsertOneResultDecoder, e.remoteUpdateResultDecoder = new RemoteUpdateResultDecoder, e.remoteDeleteResultDecoder = new RemoteDeleteResultDecoder, e.updateDescriptionDecoder = new UpdateDescriptionDecoder, e.ChangeEventDecoder = ChangeEventDecoder, e.CompactChangeEventDecoder = CompactChangeEventDecoder, e
        }(),
        __assign$1 = Object.assign || function(e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
                for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        },
        CoreRemoteMongoCollectionImpl = function() {
            function t(e, t, r, n) {
                var o = this;
                this.name = e, this.databaseName = t, this.service = r, this.codec = n, this.namespace = this.databaseName + "." + this.name, this.baseOperationArgs = {
                    collection: o.name,
                    database: o.databaseName
                }
            }
            return t.prototype.withCollectionType = function(e) {
                return new t(this.name, this.databaseName, this.service, e)
            }, t.prototype.find = function(e, t) {
                void 0 === e && (e = {});
                var r = __assign$1({}, this.baseOperationArgs);
                return r.query = e, t && (t.limit && (r.limit = t.limit), t.projection && (r.project = t.projection), t.sort && (r.sort = t.sort)), new CoreRemoteMongoReadOperation("find", r, this.service, this.codec)
            }, t.prototype.findOne = function(e, t) {
                void 0 === e && (e = {});
                var r = __assign$1({}, this.baseOperationArgs);
                return r.query = e, t && (t.projection && (r.project = t.projection), t.sort && (r.sort = t.sort)), this.service.callFunction("findOne", [r], this.codec)
            }, t.prototype.findOneAndUpdate = function(e, t, r) {
                var n = __assign$1({}, this.baseOperationArgs);
                return n.filter = e, n.update = t, r && (r.projection && (n.projection = r.projection), r.sort && (n.sort = r.sort), r.upsert && (n.upsert = !0), r.returnNewDocument && (n.returnNewDocument = !0)), this.service.callFunction("findOneAndUpdate", [n], this.codec)
            }, t.prototype.findOneAndReplace = function(e, t, r) {
                var n = __assign$1({}, this.baseOperationArgs);
                return n.filter = e, n.update = t, r && (r.projection && (n.projection = r.projection), r.sort && (n.sort = r.sort), r.upsert && (n.upsert = !0), r.returnNewDocument && (n.returnNewDocument = !0)), this.service.callFunction("findOneAndReplace", [n], this.codec)
            }, t.prototype.findOneAndDelete = function(e, t) {
                var r = __assign$1({}, this.baseOperationArgs);
                return r.filter = e, t && (t.projection && (r.projection = t.projection), t.sort && (r.sort = t.sort)), this.service.callFunction("findOneAndDelete", [r], this.codec)
            }, t.prototype.aggregate = function(e) {
                var t = __assign$1({}, this.baseOperationArgs);
                return t.pipeline = e, new CoreRemoteMongoReadOperation("aggregate", t, this.service, this.codec)
            }, t.prototype.count = function(e, t) {
                void 0 === e && (e = {});
                var r = __assign$1({}, this.baseOperationArgs);
                return r.query = e, t && t.limit && (r.limit = t.limit), this.service.callFunction("count", [r])
            }, t.prototype.insertOne = function(e) {
                var t = __assign$1({}, this.baseOperationArgs);
                return t.document = this.generateObjectIdIfMissing(this.codec ? this.codec.encode(e) : e), this.service.callFunction("insertOne", [t], ResultDecoders.remoteInsertOneResultDecoder)
            }, t.prototype.insertMany = function(e) {
                var t = this,
                    r = __assign$1({}, this.baseOperationArgs);
                return r.documents = e.map(function(e) {
                    return t.generateObjectIdIfMissing(t.codec ? t.codec.encode(e) : e)
                }), this.service.callFunction("insertMany", [r], ResultDecoders.remoteInsertManyResultDecoder)
            }, t.prototype.deleteOne = function(e) {
                return this.executeDelete(e, !1)
            }, t.prototype.deleteMany = function(e) {
                return this.executeDelete(e, !0)
            }, t.prototype.updateOne = function(e, t, r) {
                return this.executeUpdate(e, t, r, !1)
            }, t.prototype.updateMany = function(e, t, r) {
                return this.executeUpdate(e, t, r, !0)
            }, t.prototype.watch = function(e) {
                var t = __assign$1({}, this.baseOperationArgs);
                return void 0 !== e && (e instanceof Array ? 0 !== e.length && (t.ids = e) : e instanceof Object && (t.filter = e)), t.useCompactEvents = !1, this.service.streamFunction("watch", [t], new ResultDecoders.ChangeEventDecoder(this.codec))
            }, t.prototype.watchCompact = function(e) {
                var t = __assign$1({}, this.baseOperationArgs);
                return t.ids = e, t.useCompactEvents = !0, this.service.streamFunction("watch", [t], new ResultDecoders.CompactChangeEventDecoder(this.codec))
            }, t.prototype.executeDelete = function(e, t) {
                var r = __assign$1({}, this.baseOperationArgs);
                return r.query = e, this.service.callFunction(t ? "deleteMany" : "deleteOne", [r], ResultDecoders.remoteDeleteResultDecoder)
            }, t.prototype.executeUpdate = function(e, t, r, n) {
                void 0 === n && (n = !1);
                var o = __assign$1({}, this.baseOperationArgs);
                return o.query = e, o.update = t, r && r.upsert && (o.upsert = r.upsert), this.service.callFunction(n ? "updateMany" : "updateOne", [o], ResultDecoders.remoteUpdateResultDecoder)
            }, t.prototype.generateObjectIdIfMissing = function(e) {
                if (!e._id) {
                    var t = e;
                    return t._id = new bson.ObjectID, t
                }
                return e
            }, t
        }(),
        CoreRemoteMongoDatabaseImpl = function() {
            function e(e, t) {
                this.name = e, this.service = t
            }
            return e.prototype.collection = function(e, t) {
                return new CoreRemoteMongoCollectionImpl(e, this.name, this.service, t)
            }, e
        }(),
        CoreRemoteMongoClientImpl = function() {
            function e(e) {
                this.service = e
            }
            return e.prototype.db = function(e) {
                return new CoreRemoteMongoDatabaseImpl(e, this.service)
            }, e
        }(),
        RemoteMongoCursor = function() {
            function e(e) {
                this.proxy = e
            }
            return e.prototype.next = function() {
                return Promise.resolve(this.proxy.next().value)
            }, e
        }(),
        RemoteMongoReadOperation = function() {
            function e(e) {
                this.proxy = e
            }
            return e.prototype.first = function() {
                return this.proxy.first()
            }, e.prototype.toArray = function() {
                return this.proxy.toArray()
            }, e.prototype.asArray = function() {
                return this.toArray()
            }, e.prototype.iterator = function() {
                return this.proxy.iterator().then(function(e) {
                    return new RemoteMongoCursor(e)
                })
            }, e
        }(),
        RemoteMongoCollectionImpl = function() {
            function t(e) {
                this.proxy = e, this.namespace = this.proxy.namespace
            }
            return t.prototype.withCollectionType = function(e) {
                return new t(this.proxy.withCollectionType(e))
            }, t.prototype.count = function(e, t) {
                return this.proxy.count(e, t)
            }, t.prototype.find = function(e, t) {
                return new RemoteMongoReadOperation(this.proxy.find(e, t))
            }, t.prototype.findOne = function(e, t) {
                return this.proxy.findOne(e, t)
            }, t.prototype.findOneAndUpdate = function(e, t, r) {
                return this.proxy.findOneAndUpdate(e, t, r)
            }, t.prototype.findOneAndReplace = function(e, t, r) {
                return this.proxy.findOneAndReplace(e, t, r)
            }, t.prototype.findOneAndDelete = function(e, t) {
                return this.proxy.findOneAndDelete(e, t)
            }, t.prototype.aggregate = function(e) {
                return new RemoteMongoReadOperation(this.proxy.aggregate(e))
            }, t.prototype.insertOne = function(e) {
                return this.proxy.insertOne(e)
            }, t.prototype.insertMany = function(e) {
                return this.proxy.insertMany(e)
            }, t.prototype.deleteOne = function(e) {
                return this.proxy.deleteOne(e)
            }, t.prototype.deleteMany = function(e) {
                return this.proxy.deleteMany(e)
            }, t.prototype.updateOne = function(e, t, r) {
                return this.proxy.updateOne(e, t, r)
            }, t.prototype.updateMany = function(e, t, r) {
                return this.proxy.updateMany(e, t, r)
            }, t.prototype.watch = function(e) {
                return this.proxy.watch(e)
            }, t.prototype.watchCompact = function(e) {
                return this.proxy.watchCompact(e)
            }, t
        }(),
        RemoteMongoDatabaseImpl = function() {
            function e(e) {
                this.proxy = e, this.name = this.proxy.name
            }
            return e.prototype.collection = function(e, t) {
                return new RemoteMongoCollectionImpl(this.proxy.collection(e, t))
            }, e
        }(),
        RemoteMongoClientImpl = function() {
            function e(e) {
                this.proxy = e
            }
            return e.prototype.db = function(e) {
                return new RemoteMongoDatabaseImpl(this.proxy.db(e))
            }, e
        }();
    (exports.RemoteMongoClient || (exports.RemoteMongoClient = {})).factory = new(function() {
        function e() {}
        return e.prototype.getNamedClient = function(e, t) {
            return new RemoteMongoClientImpl(new CoreRemoteMongoClientImpl(e))
        }, e
    }()), exports.AnonymousAuthProvider = AnonymousAuthProvider, exports.AnonymousCredential = AnonymousCredential, exports.BSON = bson, exports.BrowserFetchTransport = BrowserFetchTransport, exports.CustomAuthProvider = CustomAuthProvider, exports.CustomCredential = CustomCredential, exports.FacebookAuthProvider = FacebookAuthProvider, exports.FacebookCredential = FacebookCredential, exports.FacebookRedirectCredential = FacebookRedirectCredential, exports.FunctionAuthProvider = FunctionAuthProvider, exports.FunctionCredential = FunctionCredential, exports.GoogleAuthProvider = GoogleAuthProvider, exports.GoogleCredential = GoogleCredential, exports.GoogleRedirectCredential = GoogleRedirectCredential, exports.MemoryStorage = MemoryStorage, exports.ServerApiKeyAuthProvider = ServerApiKeyAuthProvider, exports.ServerApiKeyCredential = ServerApiKeyCredential, exports.Stitch = Stitch, exports.StitchAppClientInfo = StitchAppClientInfo, exports.StitchClientError = StitchClientError, exports.StitchRequestError = StitchRequestError, exports.StitchServiceError = StitchServiceError, exports.StitchUserIdentity = StitchUserIdentity, exports.Stream = Stream, exports.UserApiKey = UserApiKey, exports.UserApiKeyAuthProvider = UserApiKeyAuthProvider, exports.UserApiKeyCredential = UserApiKeyCredential, exports.UserPasswordAuthProvider = UserPasswordAuthProvider, exports.UserPasswordCredential = UserPasswordCredential, exports.UserType = UserType$1, exports.RemoteInsertManyResult = RemoteInsertManyResult, exports.RemoteMongoReadOperation = RemoteMongoReadOperation
}(this.stitch = this.stitch || {});
! function(exports) {
    "use strict";
    var global$1 = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {},
        lookup = [],
        revLookup = [],
        Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array,
        inited = !1;

    function init() {
        inited = !0;
        for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = 0, r = e.length; t < r; ++t) lookup[t] = e[t], revLookup[e.charCodeAt(t)] = t;
        revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63
    }

    function toByteArray(e) {
        var t, r, n, o, i, s;
        inited || init();
        var u = e.length;
        if (0 < u % 4) throw new Error("Invalid string. Length must be a multiple of 4");
        i = "=" === e[u - 2] ? 2 : "=" === e[u - 1] ? 1 : 0, s = new Arr(3 * u / 4 - i), n = 0 < i ? u - 4 : u;
        var a = 0;
        for (r = t = 0; t < n; t += 4, r += 3) o = revLookup[e.charCodeAt(t)] << 18 | revLookup[e.charCodeAt(t + 1)] << 12 | revLookup[e.charCodeAt(t + 2)] << 6 | revLookup[e.charCodeAt(t + 3)], s[a++] = o >> 16 & 255, s[a++] = o >> 8 & 255, s[a++] = 255 & o;
        return 2 === i ? (o = revLookup[e.charCodeAt(t)] << 2 | revLookup[e.charCodeAt(t + 1)] >> 4, s[a++] = 255 & o) : 1 === i && (o = revLookup[e.charCodeAt(t)] << 10 | revLookup[e.charCodeAt(t + 1)] << 4 | revLookup[e.charCodeAt(t + 2)] >> 2, s[a++] = o >> 8 & 255, s[a++] = 255 & o), s
    }

    function tripletToBase64(e) {
        return lookup[e >> 18 & 63] + lookup[e >> 12 & 63] + lookup[e >> 6 & 63] + lookup[63 & e]
    }

    function encodeChunk(e, t, r) {
        for (var n, o = [], i = t; i < r; i += 3) n = (e[i] << 16) + (e[i + 1] << 8) + e[i + 2], o.push(tripletToBase64(n));
        return o.join("")
    }

    function fromByteArray(e) {
        var t;
        inited || init();
        for (var r = e.length, n = r % 3, o = "", i = [], s = 16383, u = 0, a = r - n; u < a; u += s) i.push(encodeChunk(e, u, a < u + s ? a : u + s));
        return 1 === n ? (t = e[r - 1], o += lookup[t >> 2], o += lookup[t << 4 & 63], o += "==") : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], o += lookup[t >> 10], o += lookup[t >> 4 & 63], o += lookup[t << 2 & 63], o += "="), i.push(o), i.join("")
    }

    function read(e, t, r, n, o) {
        var i, s, u = 8 * o - n - 1,
            a = (1 << u) - 1,
            c = a >> 1,
            f = -7,
            h = r ? o - 1 : 0,
            l = r ? -1 : 1,
            d = e[t + h];
        for (h += l, i = d & (1 << -f) - 1, d >>= -f, f += u; 0 < f; i = 256 * i + e[t + h], h += l, f -= 8);
        for (s = i & (1 << -f) - 1, i >>= -f, f += n; 0 < f; s = 256 * s + e[t + h], h += l, f -= 8);
        if (0 === i) i = 1 - c;
        else {
            if (i === a) return s ? NaN : 1 / 0 * (d ? -1 : 1);
            s += Math.pow(2, n), i -= c
        }
        return (d ? -1 : 1) * s * Math.pow(2, i - n)
    }

    function write(e, t, r, n, o, i) {
        var s, u, a, c = 8 * i - o - 1,
            f = (1 << c) - 1,
            h = f >> 1,
            l = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            d = n ? 0 : i - 1,
            p = n ? 1 : -1,
            y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (u = isNaN(t) ? 1 : 0, s = f) : (s = Math.floor(Math.log(t) / Math.LN2), t * (a = Math.pow(2, -s)) < 1 && (s--, a *= 2), 2 <= (t += 1 <= s + h ? l / a : l * Math.pow(2, 1 - h)) * a && (s++, a /= 2), f <= s + h ? (u = 0, s = f) : 1 <= s + h ? (u = (t * a - 1) * Math.pow(2, o), s += h) : (u = t * Math.pow(2, h - 1) * Math.pow(2, o), s = 0)); 8 <= o; e[r + d] = 255 & u, d += p, u /= 256, o -= 8);
        for (s = s << o | u, c += o; 0 < c; e[r + d] = 255 & s, d += p, s /= 256, c -= 8);
        e[r + d - p] |= 128 * y
    }
    var toString = {}.toString,
        isArray = Array.isArray || function(e) {
            return "[object Array]" == toString.call(e)
        },
        INSPECT_MAX_BYTES = 50;

    function kMaxLength() {
        return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
    }

    function createBuffer(e, t) {
        if (kMaxLength() < t) throw new RangeError("Invalid typed array length");
        return Buffer.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = Buffer.prototype : (null === e && (e = new Buffer(t)), e.length = t), e
    }

    function Buffer(e, t, r) {
        if (!(Buffer.TYPED_ARRAY_SUPPORT || this instanceof Buffer)) return new Buffer(e, t, r);
        if ("number" == typeof e) {
            if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
            return allocUnsafe(this, e)
        }
        return from(this, e, t, r)
    }

    function from(e, t, r, n) {
        if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? fromArrayBuffer(e, t, r, n) : "string" == typeof t ? fromString(e, t, r) : fromObject(e, t)
    }

    function assertSize(e) {
        if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
        if (e < 0) throw new RangeError('"size" argument must not be negative')
    }

    function alloc(e, t, r, n) {
        return assertSize(t), t <= 0 ? createBuffer(e, t) : void 0 !== r ? "string" == typeof n ? createBuffer(e, t).fill(r, n) : createBuffer(e, t).fill(r) : createBuffer(e, t)
    }

    function allocUnsafe(e, t) {
        if (assertSize(t), e = createBuffer(e, t < 0 ? 0 : 0 | checked(t)), !Buffer.TYPED_ARRAY_SUPPORT)
            for (var r = 0; r < t; ++r) e[r] = 0;
        return e
    }

    function fromString(e, t, r) {
        if ("string" == typeof r && "" !== r || (r = "utf8"), !Buffer.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
        var n = 0 | byteLength(t, r),
            o = (e = createBuffer(e, n)).write(t, r);
        return o !== n && (e = e.slice(0, o)), e
    }

    function fromArrayLike(e, t) {
        var r = t.length < 0 ? 0 : 0 | checked(t.length);
        e = createBuffer(e, r);
        for (var n = 0; n < r; n += 1) e[n] = 255 & t[n];
        return e
    }

    function fromArrayBuffer(e, t, r, n) {
        if (t.byteLength, r < 0 || t.byteLength < r) throw new RangeError("'offset' is out of bounds");
        if (t.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
        return t = void 0 === r && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, r) : new Uint8Array(t, r, n), Buffer.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = Buffer.prototype : e = fromArrayLike(e, t), e
    }

    function fromObject(e, t) {
        if (internalIsBuffer(t)) {
            var r = 0 | checked(t.length);
            return 0 === (e = createBuffer(e, r)).length || t.copy(e, 0, 0, r), e
        }
        if (t) {
            if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || isnan(t.length) ? createBuffer(e, 0) : fromArrayLike(e, t);
            if ("Buffer" === t.type && isArray(t.data)) return fromArrayLike(e, t.data)
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
    }

    function checked(e) {
        if (e >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
        return 0 | e
    }

    function internalIsBuffer(e) {
        return !(null == e || !e._isBuffer)
    }

    function byteLength(e, t) {
        if (internalIsBuffer(e)) return e.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
        "string" != typeof e && (e = "" + e);
        var r = e.length;
        if (0 === r) return 0;
        for (var n = !1;;) switch (t) {
            case "ascii":
            case "latin1":
            case "binary":
                return r;
            case "utf8":
            case "utf-8":
            case void 0:
                return utf8ToBytes(e).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * r;
            case "hex":
                return r >>> 1;
            case "base64":
                return base64ToBytes(e).length;
            default:
                if (n) return utf8ToBytes(e).length;
                t = ("" + t).toLowerCase(), n = !0
        }
    }

    function slowToString(e, t, r) {
        var n = !1;
        if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
        if ((r >>>= 0) <= (t >>>= 0)) return "";
        for (e || (e = "utf8");;) switch (e) {
            case "hex":
                return hexSlice(this, t, r);
            case "utf8":
            case "utf-8":
                return utf8Slice(this, t, r);
            case "ascii":
                return asciiSlice(this, t, r);
            case "latin1":
            case "binary":
                return latin1Slice(this, t, r);
            case "base64":
                return base64Slice(this, t, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return utf16leSlice(this, t, r);
            default:
                if (n) throw new TypeError("Unknown encoding: " + e);
                e = (e + "").toLowerCase(), n = !0
        }
    }

    function swap(e, t, r) {
        var n = e[t];
        e[t] = e[r], e[r] = n
    }

    function bidirectionalIndexOf(e, t, r, n, o) {
        if (0 === e.length) return -1;
        if ("string" == typeof r ? (n = r, r = 0) : 2147483647 < r ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = o ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
            if (o) return -1;
            r = e.length - 1
        } else if (r < 0) {
            if (!o) return -1;
            r = 0
        }
        if ("string" == typeof t && (t = Buffer.from(t, n)), internalIsBuffer(t)) return 0 === t.length ? -1 : arrayIndexOf(e, t, r, n, o);
        if ("number" == typeof t) return t &= 255, Buffer.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : arrayIndexOf(e, [t], r, n, o);
        throw new TypeError("val must be string, number or Buffer")
    }

    function arrayIndexOf(e, t, r, n, o) {
        var i, s = 1,
            u = e.length,
            a = t.length;
        if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
            if (e.length < 2 || t.length < 2) return -1;
            u /= s = 2, a /= 2, r /= 2
        }

        function c(e, t) {
            return 1 === s ? e[t] : e.readUInt16BE(t * s)
        }
        if (o) {
            var f = -1;
            for (i = r; i < u; i++)
                if (c(e, i) === c(t, -1 === f ? 0 : i - f)) {
                    if (-1 === f && (f = i), i - f + 1 === a) return f * s
                } else -1 !== f && (i -= i - f), f = -1
        } else
            for (u < r + a && (r = u - a), i = r; 0 <= i; i--) {
                for (var h = !0, l = 0; l < a; l++)
                    if (c(e, i + l) !== c(t, l)) {
                        h = !1;
                        break
                    } if (h) return i
            }
        return -1
    }

    function hexWrite(e, t, r, n) {
        r = Number(r) || 0;
        var o = e.length - r;
        n ? o < (n = Number(n)) && (n = o) : n = o;
        var i = t.length;
        if (i % 2 != 0) throw new TypeError("Invalid hex string");
        i / 2 < n && (n = i / 2);
        for (var s = 0; s < n; ++s) {
            var u = parseInt(t.substr(2 * s, 2), 16);
            if (isNaN(u)) return s;
            e[r + s] = u
        }
        return s
    }

    function utf8Write(e, t, r, n) {
        return blitBuffer(utf8ToBytes(t, e.length - r), e, r, n)
    }

    function asciiWrite(e, t, r, n) {
        return blitBuffer(asciiToBytes(t), e, r, n)
    }

    function latin1Write(e, t, r, n) {
        return asciiWrite(e, t, r, n)
    }

    function base64Write(e, t, r, n) {
        return blitBuffer(base64ToBytes(t), e, r, n)
    }

    function ucs2Write(e, t, r, n) {
        return blitBuffer(utf16leToBytes(t, e.length - r), e, r, n)
    }

    function base64Slice(e, t, r) {
        return 0 === t && r === e.length ? fromByteArray(e) : fromByteArray(e.slice(t, r))
    }

    function utf8Slice(e, t, r) {
        r = Math.min(e.length, r);
        for (var n = [], o = t; o < r;) {
            var i, s, u, a, c = e[o],
                f = null,
                h = 239 < c ? 4 : 223 < c ? 3 : 191 < c ? 2 : 1;
            if (o + h <= r) switch (h) {
                case 1:
                    c < 128 && (f = c);
                    break;
                case 2:
                    128 == (192 & (i = e[o + 1])) && 127 < (a = (31 & c) << 6 | 63 & i) && (f = a);
                    break;
                case 3:
                    i = e[o + 1], s = e[o + 2], 128 == (192 & i) && 128 == (192 & s) && 2047 < (a = (15 & c) << 12 | (63 & i) << 6 | 63 & s) && (a < 55296 || 57343 < a) && (f = a);
                    break;
                case 4:
                    i = e[o + 1], s = e[o + 2], u = e[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & u) && 65535 < (a = (15 & c) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & u) && a < 1114112 && (f = a)
            }
            null === f ? (f = 65533, h = 1) : 65535 < f && (f -= 65536, n.push(f >>> 10 & 1023 | 55296), f = 56320 | 1023 & f), n.push(f), o += h
        }
        return decodeCodePointsArray(n)
    }
    Buffer.TYPED_ARRAY_SUPPORT = void 0 === global$1.TYPED_ARRAY_SUPPORT || global$1.TYPED_ARRAY_SUPPORT, Buffer.poolSize = 8192, Buffer._augment = function(e) {
        return e.__proto__ = Buffer.prototype, e
    }, Buffer.from = function(e, t, r) {
        return from(null, e, t, r)
    }, Buffer.TYPED_ARRAY_SUPPORT && (Buffer.prototype.__proto__ = Uint8Array.prototype, Buffer.__proto__ = Uint8Array), Buffer.alloc = function(e, t, r) {
        return alloc(null, e, t, r)
    }, Buffer.allocUnsafe = function(e) {
        return allocUnsafe(null, e)
    }, Buffer.allocUnsafeSlow = function(e) {
        return allocUnsafe(null, e)
    }, Buffer.isBuffer = isBuffer, Buffer.compare = function(e, t) {
        if (!internalIsBuffer(e) || !internalIsBuffer(t)) throw new TypeError("Arguments must be Buffers");
        if (e === t) return 0;
        for (var r = e.length, n = t.length, o = 0, i = Math.min(r, n); o < i; ++o)
            if (e[o] !== t[o]) {
                r = e[o], n = t[o];
                break
            } return r < n ? -1 : n < r ? 1 : 0
    }, Buffer.isEncoding = function(e) {
        switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
        }
    }, Buffer.concat = function(e, t) {
        if (!isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === e.length) return Buffer.alloc(0);
        var r;
        if (void 0 === t)
            for (r = t = 0; r < e.length; ++r) t += e[r].length;
        var n = Buffer.allocUnsafe(t),
            o = 0;
        for (r = 0; r < e.length; ++r) {
            var i = e[r];
            if (!internalIsBuffer(i)) throw new TypeError('"list" argument must be an Array of Buffers');
            i.copy(n, o), o += i.length
        }
        return n
    }, Buffer.byteLength = byteLength, Buffer.prototype._isBuffer = !0, Buffer.prototype.swap16 = function() {
        var e = this.length;
        if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var t = 0; t < e; t += 2) swap(this, t, t + 1);
        return this
    }, Buffer.prototype.swap32 = function() {
        var e = this.length;
        if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var t = 0; t < e; t += 4) swap(this, t, t + 3), swap(this, t + 1, t + 2);
        return this
    }, Buffer.prototype.swap64 = function() {
        var e = this.length;
        if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var t = 0; t < e; t += 8) swap(this, t, t + 7), swap(this, t + 1, t + 6), swap(this, t + 2, t + 5), swap(this, t + 3, t + 4);
        return this
    }, Buffer.prototype.toString = function() {
        var e = 0 | this.length;
        return 0 === e ? "" : 0 === arguments.length ? utf8Slice(this, 0, e) : slowToString.apply(this, arguments)
    }, Buffer.prototype.equals = function(e) {
        if (!internalIsBuffer(e)) throw new TypeError("Argument must be a Buffer");
        return this === e || 0 === Buffer.compare(this, e)
    }, Buffer.prototype.inspect = function() {
        var e = "",
            t = INSPECT_MAX_BYTES;
        return 0 < this.length && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">"
    }, Buffer.prototype.compare = function(e, t, r, n, o) {
        if (!internalIsBuffer(e)) throw new TypeError("Argument must be a Buffer");
        if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === o && (o = this.length), t < 0 || r > e.length || n < 0 || o > this.length) throw new RangeError("out of range index");
        if (o <= n && r <= t) return 0;
        if (o <= n) return -1;
        if (r <= t) return 1;
        if (this === e) return 0;
        for (var i = (o >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (t >>>= 0), u = Math.min(i, s), a = this.slice(n, o), c = e.slice(t, r), f = 0; f < u; ++f)
            if (a[f] !== c[f]) {
                i = a[f], s = c[f];
                break
            } return i < s ? -1 : s < i ? 1 : 0
    }, Buffer.prototype.includes = function(e, t, r) {
        return -1 !== this.indexOf(e, t, r)
    }, Buffer.prototype.indexOf = function(e, t, r) {
        return bidirectionalIndexOf(this, e, t, r, !0)
    }, Buffer.prototype.lastIndexOf = function(e, t, r) {
        return bidirectionalIndexOf(this, e, t, r, !1)
    }, Buffer.prototype.write = function(e, t, r, n) {
        if (void 0 === t) n = "utf8", r = this.length, t = 0;
        else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;
        else {
            if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            t |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
        }
        var o = this.length - t;
        if ((void 0 === r || o < r) && (r = o), 0 < e.length && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        n || (n = "utf8");
        for (var i = !1;;) switch (n) {
            case "hex":
                return hexWrite(this, e, t, r);
            case "utf8":
            case "utf-8":
                return utf8Write(this, e, t, r);
            case "ascii":
                return asciiWrite(this, e, t, r);
            case "latin1":
            case "binary":
                return latin1Write(this, e, t, r);
            case "base64":
                return base64Write(this, e, t, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return ucs2Write(this, e, t, r);
            default:
                if (i) throw new TypeError("Unknown encoding: " + n);
                n = ("" + n).toLowerCase(), i = !0
        }
    }, Buffer.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    };
    var MAX_ARGUMENTS_LENGTH = 4096;

    function decodeCodePointsArray(e) {
        var t = e.length;
        if (t <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, e);
        for (var r = "", n = 0; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += MAX_ARGUMENTS_LENGTH));
        return r
    }

    function asciiSlice(e, t, r) {
        var n = "";
        r = Math.min(e.length, r);
        for (var o = t; o < r; ++o) n += String.fromCharCode(127 & e[o]);
        return n
    }

    function latin1Slice(e, t, r) {
        var n = "";
        r = Math.min(e.length, r);
        for (var o = t; o < r; ++o) n += String.fromCharCode(e[o]);
        return n
    }

    function hexSlice(e, t, r) {
        var n = e.length;
        (!t || t < 0) && (t = 0), (!r || r < 0 || n < r) && (r = n);
        for (var o = "", i = t; i < r; ++i) o += toHex(e[i]);
        return o
    }

    function utf16leSlice(e, t, r) {
        for (var n = e.slice(t, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
        return o
    }

    function checkOffset(e, t, r) {
        if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
        if (r < e + t) throw new RangeError("Trying to access beyond buffer length")
    }

    function checkInt(e, t, r, n, o, i) {
        if (!internalIsBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (o < t || t < i) throw new RangeError('"value" argument is out of bounds');
        if (r + n > e.length) throw new RangeError("Index out of range")
    }

    function objectWriteUInt16(e, t, r, n) {
        t < 0 && (t = 65535 + t + 1);
        for (var o = 0, i = Math.min(e.length - r, 2); o < i; ++o) e[r + o] = (t & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o)
    }

    function objectWriteUInt32(e, t, r, n) {
        t < 0 && (t = 4294967295 + t + 1);
        for (var o = 0, i = Math.min(e.length - r, 4); o < i; ++o) e[r + o] = t >>> 8 * (n ? o : 3 - o) & 255
    }

    function checkIEEE754(e, t, r, n, o, i) {
        if (r + n > e.length) throw new RangeError("Index out of range");
        if (r < 0) throw new RangeError("Index out of range")
    }

    function writeFloat(e, t, r, n, o) {
        return o || checkIEEE754(e, t, r, 4, 34028234663852886e22, -34028234663852886e22), write(e, t, r, n, 23, 4), r + 4
    }

    function writeDouble(e, t, r, n, o) {
        return o || checkIEEE754(e, t, r, 8, 17976931348623157e292, -17976931348623157e292), write(e, t, r, n, 52, 8), r + 8
    }
    Buffer.prototype.slice = function(e, t) {
        var r, n = this.length;
        if ((e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : n < e && (e = n), (t = void 0 === t ? n : ~~t) < 0 ? (t += n) < 0 && (t = 0) : n < t && (t = n), t < e && (t = e), Buffer.TYPED_ARRAY_SUPPORT)(r = this.subarray(e, t)).__proto__ = Buffer.prototype;
        else {
            var o = t - e;
            r = new Buffer(o, void 0);
            for (var i = 0; i < o; ++i) r[i] = this[i + e]
        }
        return r
    }, Buffer.prototype.readUIntLE = function(e, t, r) {
        e |= 0, t |= 0, r || checkOffset(e, t, this.length);
        for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
        return n
    }, Buffer.prototype.readUIntBE = function(e, t, r) {
        e |= 0, t |= 0, r || checkOffset(e, t, this.length);
        for (var n = this[e + --t], o = 1; 0 < t && (o *= 256);) n += this[e + --t] * o;
        return n
    }, Buffer.prototype.readUInt8 = function(e, t) {
        return t || checkOffset(e, 1, this.length), this[e]
    }, Buffer.prototype.readUInt16LE = function(e, t) {
        return t || checkOffset(e, 2, this.length), this[e] | this[e + 1] << 8
    }, Buffer.prototype.readUInt16BE = function(e, t) {
        return t || checkOffset(e, 2, this.length), this[e] << 8 | this[e + 1]
    }, Buffer.prototype.readUInt32LE = function(e, t) {
        return t || checkOffset(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
    }, Buffer.prototype.readUInt32BE = function(e, t) {
        return t || checkOffset(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
    }, Buffer.prototype.readIntLE = function(e, t, r) {
        e |= 0, t |= 0, r || checkOffset(e, t, this.length);
        for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
        return (o *= 128) <= n && (n -= Math.pow(2, 8 * t)), n
    }, Buffer.prototype.readIntBE = function(e, t, r) {
        e |= 0, t |= 0, r || checkOffset(e, t, this.length);
        for (var n = t, o = 1, i = this[e + --n]; 0 < n && (o *= 256);) i += this[e + --n] * o;
        return (o *= 128) <= i && (i -= Math.pow(2, 8 * t)), i
    }, Buffer.prototype.readInt8 = function(e, t) {
        return t || checkOffset(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
    }, Buffer.prototype.readInt16LE = function(e, t) {
        t || checkOffset(e, 2, this.length);
        var r = this[e] | this[e + 1] << 8;
        return 32768 & r ? 4294901760 | r : r
    }, Buffer.prototype.readInt16BE = function(e, t) {
        t || checkOffset(e, 2, this.length);
        var r = this[e + 1] | this[e] << 8;
        return 32768 & r ? 4294901760 | r : r
    }, Buffer.prototype.readInt32LE = function(e, t) {
        return t || checkOffset(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
    }, Buffer.prototype.readInt32BE = function(e, t) {
        return t || checkOffset(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
    }, Buffer.prototype.readFloatLE = function(e, t) {
        return t || checkOffset(e, 4, this.length), read(this, e, !0, 23, 4)
    }, Buffer.prototype.readFloatBE = function(e, t) {
        return t || checkOffset(e, 4, this.length), read(this, e, !1, 23, 4)
    }, Buffer.prototype.readDoubleLE = function(e, t) {
        return t || checkOffset(e, 8, this.length), read(this, e, !0, 52, 8)
    }, Buffer.prototype.readDoubleBE = function(e, t) {
        return t || checkOffset(e, 8, this.length), read(this, e, !1, 52, 8)
    }, Buffer.prototype.writeUIntLE = function(e, t, r, n) {
        (e = +e, t |= 0, r |= 0, n) || checkInt(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
        var o = 1,
            i = 0;
        for (this[t] = 255 & e; ++i < r && (o *= 256);) this[t + i] = e / o & 255;
        return t + r
    }, Buffer.prototype.writeUIntBE = function(e, t, r, n) {
        (e = +e, t |= 0, r |= 0, n) || checkInt(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
        var o = r - 1,
            i = 1;
        for (this[t + o] = 255 & e; 0 <= --o && (i *= 256);) this[t + o] = e / i & 255;
        return t + r
    }, Buffer.prototype.writeUInt8 = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 1, 255, 0), Buffer.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
    }, Buffer.prototype.writeUInt16LE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : objectWriteUInt16(this, e, t, !0), t + 2
    }, Buffer.prototype.writeUInt16BE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : objectWriteUInt16(this, e, t, !1), t + 2
    }, Buffer.prototype.writeUInt32LE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : objectWriteUInt32(this, e, t, !0), t + 4
    }, Buffer.prototype.writeUInt32BE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : objectWriteUInt32(this, e, t, !1), t + 4
    }, Buffer.prototype.writeIntLE = function(e, t, r, n) {
        if (e = +e, t |= 0, !n) {
            var o = Math.pow(2, 8 * r - 1);
            checkInt(this, e, t, r, o - 1, -o)
        }
        var i = 0,
            s = 1,
            u = 0;
        for (this[t] = 255 & e; ++i < r && (s *= 256);) e < 0 && 0 === u && 0 !== this[t + i - 1] && (u = 1), this[t + i] = (e / s >> 0) - u & 255;
        return t + r
    }, Buffer.prototype.writeIntBE = function(e, t, r, n) {
        if (e = +e, t |= 0, !n) {
            var o = Math.pow(2, 8 * r - 1);
            checkInt(this, e, t, r, o - 1, -o)
        }
        var i = r - 1,
            s = 1,
            u = 0;
        for (this[t + i] = 255 & e; 0 <= --i && (s *= 256);) e < 0 && 0 === u && 0 !== this[t + i + 1] && (u = 1), this[t + i] = (e / s >> 0) - u & 255;
        return t + r
    }, Buffer.prototype.writeInt8 = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 1, 127, -128), Buffer.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
    }, Buffer.prototype.writeInt16LE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : objectWriteUInt16(this, e, t, !0), t + 2
    }, Buffer.prototype.writeInt16BE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : objectWriteUInt16(this, e, t, !1), t + 2
    }, Buffer.prototype.writeInt32LE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 4, 2147483647, -2147483648), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : objectWriteUInt32(this, e, t, !0), t + 4
    }, Buffer.prototype.writeInt32BE = function(e, t, r) {
        return e = +e, t |= 0, r || checkInt(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : objectWriteUInt32(this, e, t, !1), t + 4
    }, Buffer.prototype.writeFloatLE = function(e, t, r) {
        return writeFloat(this, e, t, !0, r)
    }, Buffer.prototype.writeFloatBE = function(e, t, r) {
        return writeFloat(this, e, t, !1, r)
    }, Buffer.prototype.writeDoubleLE = function(e, t, r) {
        return writeDouble(this, e, t, !0, r)
    }, Buffer.prototype.writeDoubleBE = function(e, t, r) {
        return writeDouble(this, e, t, !1, r)
    }, Buffer.prototype.copy = function(e, t, r, n) {
        if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), 0 < n && n < r && (n = r), n === r) return 0;
        if (0 === e.length || 0 === this.length) return 0;
        if (t < 0) throw new RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
        if (n < 0) throw new RangeError("sourceEnd out of bounds");
        n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
        var o, i = n - r;
        if (this === e && r < t && t < n)
            for (o = i - 1; 0 <= o; --o) e[o + t] = this[o + r];
        else if (i < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT)
            for (o = 0; o < i; ++o) e[o + t] = this[o + r];
        else Uint8Array.prototype.set.call(e, this.subarray(r, r + i), t);
        return i
    }, Buffer.prototype.fill = function(e, t, r, n) {
        if ("string" == typeof e) {
            if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === e.length) {
                var o = e.charCodeAt(0);
                o < 256 && (e = o)
            }
            if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
            if ("string" == typeof n && !Buffer.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
        } else "number" == typeof e && (e &= 255);
        if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
        if (r <= t) return this;
        var i;
        if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e)
            for (i = t; i < r; ++i) this[i] = e;
        else {
            var s = internalIsBuffer(e) ? e : utf8ToBytes(new Buffer(e, n).toString()),
                u = s.length;
            for (i = 0; i < r - t; ++i) this[i + t] = s[i % u]
        }
        return this
    };
    var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

    function base64clean(e) {
        if ((e = stringtrim(e).replace(INVALID_BASE64_RE, "")).length < 2) return "";
        for (; e.length % 4 != 0;) e += "=";
        return e
    }

    function stringtrim(e) {
        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
    }

    function toHex(e) {
        return e < 16 ? "0" + e.toString(16) : e.toString(16)
    }

    function utf8ToBytes(e, t) {
        var r;
        t = t || 1 / 0;
        for (var n = e.length, o = null, i = [], s = 0; s < n; ++s) {
            if (55295 < (r = e.charCodeAt(s)) && r < 57344) {
                if (!o) {
                    if (56319 < r) {
                        -1 < (t -= 3) && i.push(239, 191, 189);
                        continue
                    }
                    if (s + 1 === n) {
                        -1 < (t -= 3) && i.push(239, 191, 189);
                        continue
                    }
                    o = r;
                    continue
                }
                if (r < 56320) {
                    -1 < (t -= 3) && i.push(239, 191, 189), o = r;
                    continue
                }
                r = 65536 + (o - 55296 << 10 | r - 56320)
            } else o && -1 < (t -= 3) && i.push(239, 191, 189);
            if (o = null, r < 128) {
                if ((t -= 1) < 0) break;
                i.push(r)
            } else if (r < 2048) {
                if ((t -= 2) < 0) break;
                i.push(r >> 6 | 192, 63 & r | 128)
            } else if (r < 65536) {
                if ((t -= 3) < 0) break;
                i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
            } else {
                if (!(r < 1114112)) throw new Error("Invalid code point");
                if ((t -= 4) < 0) break;
                i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
            }
        }
        return i
    }

    function asciiToBytes(e) {
        for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
        return t
    }

    function utf16leToBytes(e, t) {
        for (var r, n, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) n = (r = e.charCodeAt(s)) >> 8, o = r % 256, i.push(o), i.push(n);
        return i
    }

    function base64ToBytes(e) {
        return toByteArray(base64clean(e))
    }

    function blitBuffer(e, t, r, n) {
        for (var o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o) t[o + r] = e[o];
        return o
    }

    function isnan(e) {
        return e != e
    }

    function isBuffer(e) {
        return null != e && (!!e._isBuffer || isFastBuffer(e) || isSlowBuffer(e))
    }

    function isFastBuffer(e) {
        return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
    }

    function isSlowBuffer(e) {
        return "function" == typeof e.readFloatLE && "function" == typeof e.slice && isFastBuffer(e.slice(0, 0))
    }
    var long_1 = Long,
        wasm = null;
    try {
        wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports
    } catch (e) {}

    function Long(e, t, r) {
        this.low = 0 | e, this.high = 0 | t, this.unsigned = !!r
    }

    function isLong(e) {
        return !0 === (e && e.__isLong__)
    }
    Object.defineProperty(Long.prototype, "__isLong__", {
        value: !0
    }), Long.isLong = isLong;
    var INT_CACHE = {},
        UINT_CACHE = {};

    function fromInt(e, t) {
        var r, n, o;
        return t ? (o = 0 <= (e >>>= 0) && e < 256) && (n = UINT_CACHE[e]) ? n : (r = fromBits(e, (0 | e) < 0 ? -1 : 0, !0), o && (UINT_CACHE[e] = r), r) : (o = -128 <= (e |= 0) && e < 128) && (n = INT_CACHE[e]) ? n : (r = fromBits(e, e < 0 ? -1 : 0, !1), o && (INT_CACHE[e] = r), r)
    }

    function fromNumber(e, t) {
        if (isNaN(e)) return t ? UZERO : ZERO;
        if (t) {
            if (e < 0) return UZERO;
            if (TWO_PWR_64_DBL <= e) return MAX_UNSIGNED_VALUE
        } else {
            if (e <= -TWO_PWR_63_DBL) return MIN_VALUE;
            if (TWO_PWR_63_DBL <= e + 1) return MAX_VALUE
        }
        return e < 0 ? fromNumber(-e, t).neg() : fromBits(e % TWO_PWR_32_DBL | 0, e / TWO_PWR_32_DBL | 0, t)
    }

    function fromBits(e, t, r) {
        return new Long(e, t, r)
    }
    Long.fromInt = fromInt, Long.fromNumber = fromNumber, Long.fromBits = fromBits;
    var pow_dbl = Math.pow;

    function fromString$1(e, t, r) {
        if (0 === e.length) throw Error("empty string");
        if ("NaN" === e || "Infinity" === e || "+Infinity" === e || "-Infinity" === e) return ZERO;
        if ("number" == typeof t ? (r = t, t = !1) : t = !!t, (r = r || 10) < 2 || 36 < r) throw RangeError("radix");
        var n;
        if (0 < (n = e.indexOf("-"))) throw Error("interior hyphen");
        if (0 === n) return fromString$1(e.substring(1), t, r).neg();
        for (var o = fromNumber(pow_dbl(r, 8)), i = ZERO, s = 0; s < e.length; s += 8) {
            var u = Math.min(8, e.length - s),
                a = parseInt(e.substring(s, s + u), r);
            if (u < 8) {
                var c = fromNumber(pow_dbl(r, u));
                i = i.mul(c).add(fromNumber(a))
            } else i = (i = i.mul(o)).add(fromNumber(a))
        }
        return i.unsigned = t, i
    }

    function fromValue(e, t) {
        return "number" == typeof e ? fromNumber(e, t) : "string" == typeof e ? fromString$1(e, t) : fromBits(e.low, e.high, "boolean" == typeof t ? t : e.unsigned)
    }
    Long.fromString = fromString$1, Long.fromValue = fromValue;
    var TWO_PWR_16_DBL = 65536,
        TWO_PWR_24_DBL = 1 << 24,
        TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL,
        TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL,
        TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2,
        TWO_PWR_24 = fromInt(TWO_PWR_24_DBL),
        ZERO = fromInt(0);
    Long.ZERO = ZERO;
    var UZERO = fromInt(0, !0);
    Long.UZERO = UZERO;
    var ONE = fromInt(1);
    Long.ONE = ONE;
    var UONE = fromInt(1, !0);
    Long.UONE = UONE;
    var NEG_ONE = fromInt(-1);
    Long.NEG_ONE = NEG_ONE;
    var MAX_VALUE = fromBits(-1, 2147483647, !1);
    Long.MAX_VALUE = MAX_VALUE;
    var MAX_UNSIGNED_VALUE = fromBits(-1, -1, !0);
    Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
    var MIN_VALUE = fromBits(0, -2147483648, !1);
    Long.MIN_VALUE = MIN_VALUE;
    var LongPrototype = Long.prototype;

    function createCommonjsModule(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }
    LongPrototype.toInt = function() {
        return this.unsigned ? this.low >>> 0 : this.low
    }, LongPrototype.toNumber = function() {
        return this.unsigned ? (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0) : this.high * TWO_PWR_32_DBL + (this.low >>> 0)
    }, LongPrototype.toString = function(e) {
        if ((e = e || 10) < 2 || 36 < e) throw RangeError("radix");
        if (this.isZero()) return "0";
        if (this.isNegative()) {
            if (this.eq(MIN_VALUE)) {
                var t = fromNumber(e),
                    r = this.div(t),
                    n = r.mul(t).sub(this);
                return r.toString(e) + n.toInt().toString(e)
            }
            return "-" + this.neg().toString(e)
        }
        for (var o = fromNumber(pow_dbl(e, 6), this.unsigned), i = this, s = "";;) {
            var u = i.div(o),
                a = (i.sub(u.mul(o)).toInt() >>> 0).toString(e);
            if ((i = u).isZero()) return a + s;
            for (; a.length < 6;) a = "0" + a;
            s = "" + a + s
        }
    }, LongPrototype.getHighBits = function() {
        return this.high
    }, LongPrototype.getHighBitsUnsigned = function() {
        return this.high >>> 0
    }, LongPrototype.getLowBits = function() {
        return this.low
    }, LongPrototype.getLowBitsUnsigned = function() {
        return this.low >>> 0
    }, LongPrototype.getNumBitsAbs = function() {
        if (this.isNegative()) return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        for (var e = 0 != this.high ? this.high : this.low, t = 31; 0 < t && 0 == (e & 1 << t); t--);
        return 0 != this.high ? t + 33 : t + 1
    }, LongPrototype.isZero = function() {
        return 0 === this.high && 0 === this.low
    }, LongPrototype.eqz = LongPrototype.isZero, LongPrototype.isNegative = function() {
        return !this.unsigned && this.high < 0
    }, LongPrototype.isPositive = function() {
        return this.unsigned || 0 <= this.high
    }, LongPrototype.isOdd = function() {
        return 1 == (1 & this.low)
    }, LongPrototype.isEven = function() {
        return 0 == (1 & this.low)
    }, LongPrototype.equals = function(e) {
        return isLong(e) || (e = fromValue(e)), (this.unsigned === e.unsigned || this.high >>> 31 != 1 || e.high >>> 31 != 1) && (this.high === e.high && this.low === e.low)
    }, LongPrototype.eq = LongPrototype.equals, LongPrototype.notEquals = function(e) {
        return !this.eq(e)
    }, LongPrototype.neq = LongPrototype.notEquals, LongPrototype.ne = LongPrototype.notEquals, LongPrototype.lessThan = function(e) {
        return this.comp(e) < 0
    }, LongPrototype.lt = LongPrototype.lessThan, LongPrototype.lessThanOrEqual = function(e) {
        return this.comp(e) <= 0
    }, LongPrototype.lte = LongPrototype.lessThanOrEqual, LongPrototype.le = LongPrototype.lessThanOrEqual, LongPrototype.greaterThan = function(e) {
        return 0 < this.comp(e)
    }, LongPrototype.gt = LongPrototype.greaterThan, LongPrototype.greaterThanOrEqual = function(e) {
        return 0 <= this.comp(e)
    }, LongPrototype.gte = LongPrototype.greaterThanOrEqual, LongPrototype.ge = LongPrototype.greaterThanOrEqual, LongPrototype.compare = function(e) {
        if (isLong(e) || (e = fromValue(e)), this.eq(e)) return 0;
        var t = this.isNegative(),
            r = e.isNegative();
        return t && !r ? -1 : !t && r ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high === this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(e).isNegative() ? -1 : 1
    }, LongPrototype.comp = LongPrototype.compare, LongPrototype.negate = function() {
        return !this.unsigned && this.eq(MIN_VALUE) ? MIN_VALUE : this.not().add(ONE)
    }, LongPrototype.neg = LongPrototype.negate, LongPrototype.add = function(e) {
        isLong(e) || (e = fromValue(e));
        var t = this.high >>> 16,
            r = 65535 & this.high,
            n = this.low >>> 16,
            o = 65535 & this.low,
            i = e.high >>> 16,
            s = 65535 & e.high,
            u = e.low >>> 16,
            a = 0,
            c = 0,
            f = 0,
            h = 0;
        return f += (h += o + (65535 & e.low)) >>> 16, c += (f += n + u) >>> 16, a += (c += r + s) >>> 16, a += t + i, fromBits((f &= 65535) << 16 | (h &= 65535), (a &= 65535) << 16 | (c &= 65535), this.unsigned)
    }, LongPrototype.subtract = function(e) {
        return isLong(e) || (e = fromValue(e)), this.add(e.neg())
    }, LongPrototype.sub = LongPrototype.subtract, LongPrototype.multiply = function(e) {
        if (this.isZero()) return ZERO;
        if (isLong(e) || (e = fromValue(e)), wasm) return fromBits(wasm.mul(this.low, this.high, e.low, e.high), wasm.get_high(), this.unsigned);
        if (e.isZero()) return ZERO;
        if (this.eq(MIN_VALUE)) return e.isOdd() ? MIN_VALUE : ZERO;
        if (e.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
        if (this.isNegative()) return e.isNegative() ? this.neg().mul(e.neg()) : this.neg().mul(e).neg();
        if (e.isNegative()) return this.mul(e.neg()).neg();
        if (this.lt(TWO_PWR_24) && e.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * e.toNumber(), this.unsigned);
        var t = this.high >>> 16,
            r = 65535 & this.high,
            n = this.low >>> 16,
            o = 65535 & this.low,
            i = e.high >>> 16,
            s = 65535 & e.high,
            u = e.low >>> 16,
            a = 65535 & e.low,
            c = 0,
            f = 0,
            h = 0,
            l = 0;
        return h += (l += o * a) >>> 16, f += (h += n * a) >>> 16, h &= 65535, f += (h += o * u) >>> 16, c += (f += r * a) >>> 16, f &= 65535, c += (f += n * u) >>> 16, f &= 65535, c += (f += o * s) >>> 16, c += t * a + r * u + n * s + o * i, fromBits((h &= 65535) << 16 | (l &= 65535), (c &= 65535) << 16 | (f &= 65535), this.unsigned)
    }, LongPrototype.mul = LongPrototype.multiply, LongPrototype.divide = function(e) {
        if (isLong(e) || (e = fromValue(e)), e.isZero()) throw Error("division by zero");
        var t, r, n;
        if (wasm) return this.unsigned || -2147483648 !== this.high || -1 !== e.low || -1 !== e.high ? fromBits((this.unsigned ? wasm.div_u : wasm.div_s)(this.low, this.high, e.low, e.high), wasm.get_high(), this.unsigned) : this;
        if (this.isZero()) return this.unsigned ? UZERO : ZERO;
        if (this.unsigned) {
            if (e.unsigned || (e = e.toUnsigned()), e.gt(this)) return UZERO;
            if (e.gt(this.shru(1))) return UONE;
            n = UZERO
        } else {
            if (this.eq(MIN_VALUE)) return e.eq(ONE) || e.eq(NEG_ONE) ? MIN_VALUE : e.eq(MIN_VALUE) ? ONE : (t = this.shr(1).div(e).shl(1)).eq(ZERO) ? e.isNegative() ? ONE : NEG_ONE : (r = this.sub(e.mul(t)), n = t.add(r.div(e)));
            else if (e.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
            if (this.isNegative()) return e.isNegative() ? this.neg().div(e.neg()) : this.neg().div(e).neg();
            if (e.isNegative()) return this.div(e.neg()).neg();
            n = ZERO
        }
        for (r = this; r.gte(e);) {
            t = Math.max(1, Math.floor(r.toNumber() / e.toNumber()));
            for (var o = Math.ceil(Math.log(t) / Math.LN2), i = o <= 48 ? 1 : pow_dbl(2, o - 48), s = fromNumber(t), u = s.mul(e); u.isNegative() || u.gt(r);) u = (s = fromNumber(t -= i, this.unsigned)).mul(e);
            s.isZero() && (s = ONE), n = n.add(s), r = r.sub(u)
        }
        return n
    }, LongPrototype.div = LongPrototype.divide, LongPrototype.modulo = function(e) {
        return isLong(e) || (e = fromValue(e)), wasm ? fromBits((this.unsigned ? wasm.rem_u : wasm.rem_s)(this.low, this.high, e.low, e.high), wasm.get_high(), this.unsigned) : this.sub(this.div(e).mul(e))
    }, LongPrototype.mod = LongPrototype.modulo, LongPrototype.rem = LongPrototype.modulo, LongPrototype.not = function() {
        return fromBits(~this.low, ~this.high, this.unsigned)
    }, LongPrototype.and = function(e) {
        return isLong(e) || (e = fromValue(e)), fromBits(this.low & e.low, this.high & e.high, this.unsigned)
    }, LongPrototype.or = function(e) {
        return isLong(e) || (e = fromValue(e)), fromBits(this.low | e.low, this.high | e.high, this.unsigned)
    }, LongPrototype.xor = function(e) {
        return isLong(e) || (e = fromValue(e)), fromBits(this.low ^ e.low, this.high ^ e.high, this.unsigned)
    }, LongPrototype.shiftLeft = function(e) {
        return isLong(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? fromBits(this.low << e, this.high << e | this.low >>> 32 - e, this.unsigned) : fromBits(0, this.low << e - 32, this.unsigned)
    }, LongPrototype.shl = LongPrototype.shiftLeft, LongPrototype.shiftRight = function(e) {
        return isLong(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? fromBits(this.low >>> e | this.high << 32 - e, this.high >> e, this.unsigned) : fromBits(this.high >> e - 32, 0 <= this.high ? 0 : -1, this.unsigned)
    }, LongPrototype.shr = LongPrototype.shiftRight, LongPrototype.shiftRightUnsigned = function(e) {
        if (isLong(e) && (e = e.toInt()), 0 === (e &= 63)) return this;
        var t = this.high;
        return e < 32 ? fromBits(this.low >>> e | t << 32 - e, t >>> e, this.unsigned) : fromBits(32 === e ? t : t >>> e - 32, 0, this.unsigned)
    }, LongPrototype.shru = LongPrototype.shiftRightUnsigned, LongPrototype.shr_u = LongPrototype.shiftRightUnsigned, LongPrototype.toSigned = function() {
        return this.unsigned ? fromBits(this.low, this.high, !1) : this
    }, LongPrototype.toUnsigned = function() {
        return this.unsigned ? this : fromBits(this.low, this.high, !0)
    }, LongPrototype.toBytes = function(e) {
        return e ? this.toBytesLE() : this.toBytesBE()
    }, LongPrototype.toBytesLE = function() {
        var e = this.high,
            t = this.low;
        return [255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24, 255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24]
    }, LongPrototype.toBytesBE = function() {
        var e = this.high,
            t = this.low;
        return [e >>> 24, e >>> 16 & 255, e >>> 8 & 255, 255 & e, t >>> 24, t >>> 16 & 255, t >>> 8 & 255, 255 & t]
    }, Long.fromBytes = function(e, t, r) {
        return r ? Long.fromBytesLE(e, t) : Long.fromBytesBE(e, t)
    }, Long.fromBytesLE = function(e, t) {
        return new Long(e[0] | e[1] << 8 | e[2] << 16 | e[3] << 24, e[4] | e[5] << 8 | e[6] << 16 | e[7] << 24, t)
    }, Long.fromBytesBE = function(e, t) {
        return new Long(e[4] << 24 | e[5] << 16 | e[6] << 8 | e[7], e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3], t)
    };
    for (var byteLength_1 = byteLength$1, toByteArray_1 = toByteArray$1, fromByteArray_1 = fromByteArray$1, lookup$1 = [], revLookup$1 = [], Arr$1 = "undefined" != typeof Uint8Array ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, len = code.length; i < len; ++i) lookup$1[i] = code[i], revLookup$1[code.charCodeAt(i)] = i;

    function getLens(e) {
        var t = e.length;
        if (0 < t % 4) throw new Error("Invalid string. Length must be a multiple of 4");
        var r = e.indexOf("=");
        return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4]
    }

    function byteLength$1(e) {
        var t = getLens(e),
            r = t[0],
            n = t[1];
        return 3 * (r + n) / 4 - n
    }

    function _byteLength(e, t, r) {
        return 3 * (t + r) / 4 - r
    }

    function toByteArray$1(e) {
        for (var t, r = getLens(e), n = r[0], o = r[1], i = new Arr$1(_byteLength(e, n, o)), s = 0, u = 0 < o ? n - 4 : n, a = 0; a < u; a += 4) t = revLookup$1[e.charCodeAt(a)] << 18 | revLookup$1[e.charCodeAt(a + 1)] << 12 | revLookup$1[e.charCodeAt(a + 2)] << 6 | revLookup$1[e.charCodeAt(a + 3)], i[s++] = t >> 16 & 255, i[s++] = t >> 8 & 255, i[s++] = 255 & t;
        return 2 === o && (t = revLookup$1[e.charCodeAt(a)] << 2 | revLookup$1[e.charCodeAt(a + 1)] >> 4, i[s++] = 255 & t), 1 === o && (t = revLookup$1[e.charCodeAt(a)] << 10 | revLookup$1[e.charCodeAt(a + 1)] << 4 | revLookup$1[e.charCodeAt(a + 2)] >> 2, i[s++] = t >> 8 & 255, i[s++] = 255 & t), i
    }

    function tripletToBase64$1(e) {
        return lookup$1[e >> 18 & 63] + lookup$1[e >> 12 & 63] + lookup$1[e >> 6 & 63] + lookup$1[63 & e]
    }

    function encodeChunk$1(e, t, r) {
        for (var n, o = [], i = t; i < r; i += 3) n = (e[i] << 16 & 16711680) + (e[i + 1] << 8 & 65280) + (255 & e[i + 2]), o.push(tripletToBase64$1(n));
        return o.join("")
    }

    function fromByteArray$1(e) {
        for (var t, r = e.length, n = r % 3, o = [], i = 0, s = r - n; i < s; i += 16383) o.push(encodeChunk$1(e, i, s < i + 16383 ? s : i + 16383));
        return 1 === n ? (t = e[r - 1], o.push(lookup$1[t >> 2] + lookup$1[t << 4 & 63] + "==")) : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], o.push(lookup$1[t >> 10] + lookup$1[t >> 4 & 63] + lookup$1[t << 2 & 63] + "=")), o.join("")
    }
    revLookup$1["-".charCodeAt(0)] = 62, revLookup$1["_".charCodeAt(0)] = 63;
    var base64Js = {
            byteLength: byteLength_1,
            toByteArray: toByteArray_1,
            fromByteArray: fromByteArray_1
        },
        read$1 = function(e, t, r, n, o) {
            var i, s, u = 8 * o - n - 1,
                a = (1 << u) - 1,
                c = a >> 1,
                f = -7,
                h = r ? o - 1 : 0,
                l = r ? -1 : 1,
                d = e[t + h];
            for (h += l, i = d & (1 << -f) - 1, d >>= -f, f += u; 0 < f; i = 256 * i + e[t + h], h += l, f -= 8);
            for (s = i & (1 << -f) - 1, i >>= -f, f += n; 0 < f; s = 256 * s + e[t + h], h += l, f -= 8);
            if (0 === i) i = 1 - c;
            else {
                if (i === a) return s ? NaN : 1 / 0 * (d ? -1 : 1);
                s += Math.pow(2, n), i -= c
            }
            return (d ? -1 : 1) * s * Math.pow(2, i - n)
        },
        write$1 = function(e, t, r, n, o, i) {
            var s, u, a, c = 8 * i - o - 1,
                f = (1 << c) - 1,
                h = f >> 1,
                l = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                d = n ? 0 : i - 1,
                p = n ? 1 : -1,
                y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (u = isNaN(t) ? 1 : 0, s = f) : (s = Math.floor(Math.log(t) / Math.LN2), t * (a = Math.pow(2, -s)) < 1 && (s--, a *= 2), 2 <= (t += 1 <= s + h ? l / a : l * Math.pow(2, 1 - h)) * a && (s++, a /= 2), f <= s + h ? (u = 0, s = f) : 1 <= s + h ? (u = (t * a - 1) * Math.pow(2, o), s += h) : (u = t * Math.pow(2, h - 1) * Math.pow(2, o), s = 0)); 8 <= o; e[r + d] = 255 & u, d += p, u /= 256, o -= 8);
            for (s = s << o | u, c += o; 0 < c; e[r + d] = 255 & s, d += p, s /= 256, c -= 8);
            e[r + d - p] |= 128 * y
        },
        ieee754 = {
            read: read$1,
            write: write$1
        },
        buffer = createCommonjsModule(function(e, r) {
            r.Buffer = h, r.SlowBuffer = function(e) {
                +e != e && (e = 0);
                return h.alloc(+e)
            }, r.INSPECT_MAX_BYTES = 50;
            var n = 2147483647;

            function s(e) {
                if (n < e) throw new RangeError('The value "' + e + '" is invalid for option "size"');
                var t = new Uint8Array(e);
                return t.__proto__ = h.prototype, t
            }

            function h(e, t, r) {
                if ("number" == typeof e) {
                    if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                    return i(e)
                }
                return o(e, t, r)
            }

            function o(e, t, r) {
                if ("string" == typeof e) return function(e, t) {
                    "string" == typeof t && "" !== t || (t = "utf8");
                    if (!h.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
                    var r = 0 | f(e, t),
                        n = s(r),
                        o = n.write(e, t);
                    o !== r && (n = n.slice(0, o));
                    return n
                }(e, t);
                if (ArrayBuffer.isView(e)) return a(e);
                if (null == e) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                if ($(e, ArrayBuffer) || e && $(e.buffer, ArrayBuffer)) return function(e, t, r) {
                    if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
                    if (e.byteLength < t + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
                    var n;
                    n = void 0 === t && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, t) : new Uint8Array(e, t, r);
                    return n.__proto__ = h.prototype, n
                }(e, t, r);
                if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
                var n = e.valueOf && e.valueOf();
                if (null != n && n !== e) return h.from(n, t, r);
                var o = function(e) {
                    if (h.isBuffer(e)) {
                        var t = 0 | c(e.length),
                            r = s(t);
                        return 0 === r.length || e.copy(r, 0, 0, t), r
                    }
                    if (void 0 !== e.length) return "number" != typeof e.length || U(e.length) ? s(0) : a(e);
                    if ("Buffer" === e.type && Array.isArray(e.data)) return a(e.data)
                }(e);
                if (o) return o;
                if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return h.from(e[Symbol.toPrimitive]("string"), t, r);
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
            }

            function u(e) {
                if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
                if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
            }

            function i(e) {
                return u(e), s(e < 0 ? 0 : 0 | c(e))
            }

            function a(e) {
                for (var t = e.length < 0 ? 0 : 0 | c(e.length), r = s(t), n = 0; n < t; n += 1) r[n] = 255 & e[n];
                return r
            }

            function c(e) {
                if (n <= e) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n.toString(16) + " bytes");
                return 0 | e
            }

            function f(e, t) {
                if (h.isBuffer(e)) return e.length;
                if (ArrayBuffer.isView(e) || $(e, ArrayBuffer)) return e.byteLength;
                if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
                var r = e.length,
                    n = 2 < arguments.length && !0 === arguments[2];
                if (!n && 0 === r) return 0;
                for (var o = !1;;) switch (t) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return r;
                    case "utf8":
                    case "utf-8":
                        return B(e).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * r;
                    case "hex":
                        return r >>> 1;
                    case "base64":
                        return P(e).length;
                    default:
                        if (o) return n ? -1 : B(e).length;
                        t = ("" + t).toLowerCase(), o = !0
                }
            }

            function l(e, t, r) {
                var n = e[t];
                e[t] = e[r], e[r] = n
            }

            function d(e, t, r, n, o) {
                if (0 === e.length) return -1;
                if ("string" == typeof r ? (n = r, r = 0) : 2147483647 < r ? r = 2147483647 : r < -2147483648 && (r = -2147483648), U(r = +r) && (r = o ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
                    if (o) return -1;
                    r = e.length - 1
                } else if (r < 0) {
                    if (!o) return -1;
                    r = 0
                }
                if ("string" == typeof t && (t = h.from(t, n)), h.isBuffer(t)) return 0 === t.length ? -1 : p(e, t, r, n, o);
                if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : p(e, [t], r, n, o);
                throw new TypeError("val must be string, number or Buffer")
            }

            function p(e, t, r, n, o) {
                var i, s = 1,
                    u = e.length,
                    a = t.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                    if (e.length < 2 || t.length < 2) return -1;
                    u /= s = 2, a /= 2, r /= 2
                }

                function c(e, t) {
                    return 1 === s ? e[t] : e.readUInt16BE(t * s)
                }
                if (o) {
                    var f = -1;
                    for (i = r; i < u; i++)
                        if (c(e, i) === c(t, -1 === f ? 0 : i - f)) {
                            if (-1 === f && (f = i), i - f + 1 === a) return f * s
                        } else -1 !== f && (i -= i - f), f = -1
                } else
                    for (u < r + a && (r = u - a), i = r; 0 <= i; i--) {
                        for (var h = !0, l = 0; l < a; l++)
                            if (c(e, i + l) !== c(t, l)) {
                                h = !1;
                                break
                            } if (h) return i
                    }
                return -1
            }

            function y(e, t, r, n) {
                r = Number(r) || 0;
                var o = e.length - r;
                n ? o < (n = Number(n)) && (n = o) : n = o;
                var i = t.length;
                i / 2 < n && (n = i / 2);
                for (var s = 0; s < n; ++s) {
                    var u = parseInt(t.substr(2 * s, 2), 16);
                    if (U(u)) return s;
                    e[r + s] = u
                }
                return s
            }

            function g(e, t, r, n) {
                return C(function(e) {
                    for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                    return t
                }(t), e, r, n)
            }

            function v(e, t, r) {
                return 0 === t && r === e.length ? base64Js.fromByteArray(e) : base64Js.fromByteArray(e.slice(t, r))
            }

            function m(e, t, r) {
                r = Math.min(e.length, r);
                for (var n = [], o = t; o < r;) {
                    var i, s, u, a, c = e[o],
                        f = null,
                        h = 239 < c ? 4 : 223 < c ? 3 : 191 < c ? 2 : 1;
                    if (o + h <= r) switch (h) {
                        case 1:
                            c < 128 && (f = c);
                            break;
                        case 2:
                            128 == (192 & (i = e[o + 1])) && 127 < (a = (31 & c) << 6 | 63 & i) && (f = a);
                            break;
                        case 3:
                            i = e[o + 1], s = e[o + 2], 128 == (192 & i) && 128 == (192 & s) && 2047 < (a = (15 & c) << 12 | (63 & i) << 6 | 63 & s) && (a < 55296 || 57343 < a) && (f = a);
                            break;
                        case 4:
                            i = e[o + 1], s = e[o + 2], u = e[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & u) && 65535 < (a = (15 & c) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & u) && a < 1114112 && (f = a)
                    }
                    null === f ? (f = 65533, h = 1) : 65535 < f && (f -= 65536, n.push(f >>> 10 & 1023 | 55296), f = 56320 | 1023 & f), n.push(f), o += h
                }
                return function(e) {
                    var t = e.length;
                    if (t <= _) return String.fromCharCode.apply(String, e);
                    var r = "",
                        n = 0;
                    for (; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += _));
                    return r
                }(n)
            }
            r.kMaxLength = n, (h.TYPED_ARRAY_SUPPORT = function() {
                try {
                    var e = new Uint8Array(1);
                    return e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    }, 42 === e.foo()
                } catch (e) {
                    return !1
                }
            }()) || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(h.prototype, "parent", {
                enumerable: !0,
                get: function() {
                    if (h.isBuffer(this)) return this.buffer
                }
            }), Object.defineProperty(h.prototype, "offset", {
                enumerable: !0,
                get: function() {
                    if (h.isBuffer(this)) return this.byteOffset
                }
            }), "undefined" != typeof Symbol && null != Symbol.species && h[Symbol.species] === h && Object.defineProperty(h, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1
            }), h.poolSize = 8192, h.from = function(e, t, r) {
                return o(e, t, r)
            }, h.prototype.__proto__ = Uint8Array.prototype, h.__proto__ = Uint8Array, h.alloc = function(e, t, r) {
                return o = t, i = r, u(n = e), n <= 0 ? s(n) : void 0 !== o ? "string" == typeof i ? s(n).fill(o, i) : s(n).fill(o) : s(n);
                var n, o, i
            }, h.allocUnsafe = function(e) {
                return i(e)
            }, h.allocUnsafeSlow = function(e) {
                return i(e)
            }, h.isBuffer = function(e) {
                return null != e && !0 === e._isBuffer && e !== h.prototype
            }, h.compare = function(e, t) {
                if ($(e, Uint8Array) && (e = h.from(e, e.offset, e.byteLength)), $(t, Uint8Array) && (t = h.from(t, t.offset, t.byteLength)), !h.isBuffer(e) || !h.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                if (e === t) return 0;
                for (var r = e.length, n = t.length, o = 0, i = Math.min(r, n); o < i; ++o)
                    if (e[o] !== t[o]) {
                        r = e[o], n = t[o];
                        break
                    } return r < n ? -1 : n < r ? 1 : 0
            }, h.isEncoding = function(e) {
                switch (String(e).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, h.concat = function(e, t) {
                if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === e.length) return h.alloc(0);
                var r;
                if (void 0 === t)
                    for (r = t = 0; r < e.length; ++r) t += e[r].length;
                var n = h.allocUnsafe(t),
                    o = 0;
                for (r = 0; r < e.length; ++r) {
                    var i = e[r];
                    if ($(i, Uint8Array) && (i = h.from(i)), !h.isBuffer(i)) throw new TypeError('"list" argument must be an Array of Buffers');
                    i.copy(n, o), o += i.length
                }
                return n
            }, h.byteLength = f, h.prototype._isBuffer = !0, h.prototype.swap16 = function() {
                var e = this.length;
                if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var t = 0; t < e; t += 2) l(this, t, t + 1);
                return this
            }, h.prototype.swap32 = function() {
                var e = this.length;
                if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var t = 0; t < e; t += 4) l(this, t, t + 3), l(this, t + 1, t + 2);
                return this
            }, h.prototype.swap64 = function() {
                var e = this.length;
                if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var t = 0; t < e; t += 8) l(this, t, t + 7), l(this, t + 1, t + 6), l(this, t + 2, t + 5), l(this, t + 3, t + 4);
                return this
            }, h.prototype.toLocaleString = h.prototype.toString = function() {
                var e = this.length;
                return 0 === e ? "" : 0 === arguments.length ? m(this, 0, e) : function(e, t, r) {
                    var n = !1;
                    if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                    if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                    if ((r >>>= 0) <= (t >>>= 0)) return "";
                    for (e || (e = "utf8");;) switch (e) {
                        case "hex":
                            return b(this, t, r);
                        case "utf8":
                        case "utf-8":
                            return m(this, t, r);
                        case "ascii":
                            return E(this, t, r);
                        case "latin1":
                        case "binary":
                            return A(this, t, r);
                        case "base64":
                            return v(this, t, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return w(this, t, r);
                        default:
                            if (n) throw new TypeError("Unknown encoding: " + e);
                            e = (e + "").toLowerCase(), n = !0
                    }
                }.apply(this, arguments)
            }, h.prototype.equals = function(e) {
                if (!h.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === h.compare(this, e)
            }, h.prototype.inspect = function() {
                var e = "",
                    t = r.INSPECT_MAX_BYTES;
                return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">"
            }, h.prototype.compare = function(e, t, r, n, o) {
                if ($(e, Uint8Array) && (e = h.from(e, e.offset, e.byteLength)), !h.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
                if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === o && (o = this.length), t < 0 || r > e.length || n < 0 || o > this.length) throw new RangeError("out of range index");
                if (o <= n && r <= t) return 0;
                if (o <= n) return -1;
                if (r <= t) return 1;
                if (this === e) return 0;
                for (var i = (o >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (t >>>= 0), u = Math.min(i, s), a = this.slice(n, o), c = e.slice(t, r), f = 0; f < u; ++f)
                    if (a[f] !== c[f]) {
                        i = a[f], s = c[f];
                        break
                    } return i < s ? -1 : s < i ? 1 : 0
            }, h.prototype.includes = function(e, t, r) {
                return -1 !== this.indexOf(e, t, r)
            }, h.prototype.indexOf = function(e, t, r) {
                return d(this, e, t, r, !0)
            }, h.prototype.lastIndexOf = function(e, t, r) {
                return d(this, e, t, r, !1)
            }, h.prototype.write = function(e, t, r, n) {
                if (void 0 === t) n = "utf8", r = this.length, t = 0;
                else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;
                else {
                    if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    t >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                }
                var o = this.length - t;
                if ((void 0 === r || o < r) && (r = o), 0 < e.length && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");
                for (var i, s, u, a, c, f, h, l, d, p = !1;;) switch (n) {
                    case "hex":
                        return y(this, e, t, r);
                    case "utf8":
                    case "utf-8":
                        return l = t, d = r, C(B(e, (h = this).length - l), h, l, d);
                    case "ascii":
                        return g(this, e, t, r);
                    case "latin1":
                    case "binary":
                        return g(this, e, t, r);
                    case "base64":
                        return a = this, c = t, f = r, C(P(e), a, c, f);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return s = t, u = r, C(function(e, t) {
                            for (var r, n, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) r = e.charCodeAt(s), n = r >> 8, o = r % 256, i.push(o), i.push(n);
                            return i
                        }(e, (i = this).length - s), i, s, u);
                    default:
                        if (p) throw new TypeError("Unknown encoding: " + n);
                        n = ("" + n).toLowerCase(), p = !0
                }
            }, h.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };
            var _ = 4096;

            function E(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var o = t; o < r; ++o) n += String.fromCharCode(127 & e[o]);
                return n
            }

            function A(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var o = t; o < r; ++o) n += String.fromCharCode(e[o]);
                return n
            }

            function b(e, t, r) {
                var n = e.length;
                (!t || t < 0) && (t = 0), (!r || r < 0 || n < r) && (r = n);
                for (var o = "", i = t; i < r; ++i) o += I(e[i]);
                return o
            }

            function w(e, t, r) {
                for (var n = e.slice(t, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
                return o
            }

            function S(e, t, r) {
                if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                if (r < e + t) throw new RangeError("Trying to access beyond buffer length")
            }

            function R(e, t, r, n, o, i) {
                if (!h.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (o < t || t < i) throw new RangeError('"value" argument is out of bounds');
                if (r + n > e.length) throw new RangeError("Index out of range")
            }

            function T(e, t, r, n, o, i) {
                if (r + n > e.length) throw new RangeError("Index out of range");
                if (r < 0) throw new RangeError("Index out of range")
            }

            function O(e, t, r, n, o) {
                return t = +t, r >>>= 0, o || T(e, 0, r, 4), ieee754.write(e, t, r, n, 23, 4), r + 4
            }

            function N(e, t, r, n, o) {
                return t = +t, r >>>= 0, o || T(e, 0, r, 8), ieee754.write(e, t, r, n, 52, 8), r + 8
            }
            h.prototype.slice = function(e, t) {
                var r = this.length;
                (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : r < e && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : r < t && (t = r), t < e && (t = e);
                var n = this.subarray(e, t);
                return n.__proto__ = h.prototype, n
            }, h.prototype.readUIntLE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || S(e, t, this.length);
                for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
                return n
            }, h.prototype.readUIntBE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || S(e, t, this.length);
                for (var n = this[e + --t], o = 1; 0 < t && (o *= 256);) n += this[e + --t] * o;
                return n
            }, h.prototype.readUInt8 = function(e, t) {
                return e >>>= 0, t || S(e, 1, this.length), this[e]
            }, h.prototype.readUInt16LE = function(e, t) {
                return e >>>= 0, t || S(e, 2, this.length), this[e] | this[e + 1] << 8
            }, h.prototype.readUInt16BE = function(e, t) {
                return e >>>= 0, t || S(e, 2, this.length), this[e] << 8 | this[e + 1]
            }, h.prototype.readUInt32LE = function(e, t) {
                return e >>>= 0, t || S(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }, h.prototype.readUInt32BE = function(e, t) {
                return e >>>= 0, t || S(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }, h.prototype.readIntLE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || S(e, t, this.length);
                for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
                return (o *= 128) <= n && (n -= Math.pow(2, 8 * t)), n
            }, h.prototype.readIntBE = function(e, t, r) {
                e >>>= 0, t >>>= 0, r || S(e, t, this.length);
                for (var n = t, o = 1, i = this[e + --n]; 0 < n && (o *= 256);) i += this[e + --n] * o;
                return (o *= 128) <= i && (i -= Math.pow(2, 8 * t)), i
            }, h.prototype.readInt8 = function(e, t) {
                return e >>>= 0, t || S(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            }, h.prototype.readInt16LE = function(e, t) {
                e >>>= 0, t || S(e, 2, this.length);
                var r = this[e] | this[e + 1] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, h.prototype.readInt16BE = function(e, t) {
                e >>>= 0, t || S(e, 2, this.length);
                var r = this[e + 1] | this[e] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, h.prototype.readInt32LE = function(e, t) {
                return e >>>= 0, t || S(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }, h.prototype.readInt32BE = function(e, t) {
                return e >>>= 0, t || S(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }, h.prototype.readFloatLE = function(e, t) {
                return e >>>= 0, t || S(e, 4, this.length), ieee754.read(this, e, !0, 23, 4)
            }, h.prototype.readFloatBE = function(e, t) {
                return e >>>= 0, t || S(e, 4, this.length), ieee754.read(this, e, !1, 23, 4)
            }, h.prototype.readDoubleLE = function(e, t) {
                return e >>>= 0, t || S(e, 8, this.length), ieee754.read(this, e, !0, 52, 8)
            }, h.prototype.readDoubleBE = function(e, t) {
                return e >>>= 0, t || S(e, 8, this.length), ieee754.read(this, e, !1, 52, 8)
            }, h.prototype.writeUIntLE = function(e, t, r, n) {
                (e = +e, t >>>= 0, r >>>= 0, n) || R(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                var o = 1,
                    i = 0;
                for (this[t] = 255 & e; ++i < r && (o *= 256);) this[t + i] = e / o & 255;
                return t + r
            }, h.prototype.writeUIntBE = function(e, t, r, n) {
                (e = +e, t >>>= 0, r >>>= 0, n) || R(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                var o = r - 1,
                    i = 1;
                for (this[t + o] = 255 & e; 0 <= --o && (i *= 256);) this[t + o] = e / i & 255;
                return t + r
            }, h.prototype.writeUInt8 = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
            }, h.prototype.writeUInt16LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
            }, h.prototype.writeUInt16BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
            }, h.prototype.writeUInt32LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
            }, h.prototype.writeUInt32BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
            }, h.prototype.writeIntLE = function(e, t, r, n) {
                if (e = +e, t >>>= 0, !n) {
                    var o = Math.pow(2, 8 * r - 1);
                    R(this, e, t, r, o - 1, -o)
                }
                var i = 0,
                    s = 1,
                    u = 0;
                for (this[t] = 255 & e; ++i < r && (s *= 256);) e < 0 && 0 === u && 0 !== this[t + i - 1] && (u = 1), this[t + i] = (e / s >> 0) - u & 255;
                return t + r
            }, h.prototype.writeIntBE = function(e, t, r, n) {
                if (e = +e, t >>>= 0, !n) {
                    var o = Math.pow(2, 8 * r - 1);
                    R(this, e, t, r, o - 1, -o)
                }
                var i = r - 1,
                    s = 1,
                    u = 0;
                for (this[t + i] = 255 & e; 0 <= --i && (s *= 256);) e < 0 && 0 === u && 0 !== this[t + i + 1] && (u = 1), this[t + i] = (e / s >> 0) - u & 255;
                return t + r
            }, h.prototype.writeInt8 = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
            }, h.prototype.writeInt16LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
            }, h.prototype.writeInt16BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
            }, h.prototype.writeInt32LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
            }, h.prototype.writeInt32BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || R(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
            }, h.prototype.writeFloatLE = function(e, t, r) {
                return O(this, e, t, !0, r)
            }, h.prototype.writeFloatBE = function(e, t, r) {
                return O(this, e, t, !1, r)
            }, h.prototype.writeDoubleLE = function(e, t, r) {
                return N(this, e, t, !0, r)
            }, h.prototype.writeDoubleBE = function(e, t, r) {
                return N(this, e, t, !1, r)
            }, h.prototype.copy = function(e, t, r, n) {
                if (!h.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), 0 < n && n < r && (n = r), n === r) return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (t < 0) throw new RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
                if (n < 0) throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
                var o = n - r;
                if (this === e && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(t, r, n);
                else if (this === e && r < t && t < n)
                    for (var i = o - 1; 0 <= i; --i) e[i + t] = this[i + r];
                else Uint8Array.prototype.set.call(e, this.subarray(r, n), t);
                return o
            }, h.prototype.fill = function(e, t, r, n) {
                if ("string" == typeof e) {
                    if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                    if ("string" == typeof n && !h.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                    if (1 === e.length) {
                        var o = e.charCodeAt(0);
                        ("utf8" === n && o < 128 || "latin1" === n) && (e = o)
                    }
                } else "number" == typeof e && (e &= 255);
                if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
                if (r <= t) return this;
                var i;
                if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e)
                    for (i = t; i < r; ++i) this[i] = e;
                else {
                    var s = h.isBuffer(e) ? e : h.from(e, n),
                        u = s.length;
                    if (0 === u) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                    for (i = 0; i < r - t; ++i) this[i + t] = s[i % u]
                }
                return this
            };
            var t = /[^+/0-9A-Za-z-_]/g;

            function I(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16)
            }

            function B(e, t) {
                var r;
                t = t || 1 / 0;
                for (var n = e.length, o = null, i = [], s = 0; s < n; ++s) {
                    if (55295 < (r = e.charCodeAt(s)) && r < 57344) {
                        if (!o) {
                            if (56319 < r) {
                                -1 < (t -= 3) && i.push(239, 191, 189);
                                continue
                            }
                            if (s + 1 === n) {
                                -1 < (t -= 3) && i.push(239, 191, 189);
                                continue
                            }
                            o = r;
                            continue
                        }
                        if (r < 56320) {
                            -1 < (t -= 3) && i.push(239, 191, 189), o = r;
                            continue
                        }
                        r = 65536 + (o - 55296 << 10 | r - 56320)
                    } else o && -1 < (t -= 3) && i.push(239, 191, 189);
                    if (o = null, r < 128) {
                        if ((t -= 1) < 0) break;
                        i.push(r)
                    } else if (r < 2048) {
                        if ((t -= 2) < 0) break;
                        i.push(r >> 6 | 192, 63 & r | 128)
                    } else if (r < 65536) {
                        if ((t -= 3) < 0) break;
                        i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                    } else {
                        if (!(r < 1114112)) throw new Error("Invalid code point");
                        if ((t -= 4) < 0) break;
                        i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                    }
                }
                return i
            }

            function P(e) {
                return base64Js.toByteArray(function(e) {
                    if ((e = (e = e.split("=")[0]).trim().replace(t, "")).length < 2) return "";
                    for (; e.length % 4 != 0;) e += "=";
                    return e
                }(e))
            }

            function C(e, t, r, n) {
                for (var o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o) t[o + r] = e[o];
                return o
            }

            function $(e, t) {
                return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
            }

            function U(e) {
                return e != e
            }
        }),
        buffer_1 = buffer.Buffer,
        buffer_2 = buffer.SlowBuffer,
        buffer_3 = buffer.INSPECT_MAX_BYTES,
        buffer_4 = buffer.kMaxLength,
        commonjsGlobal$1 = "undefined" != typeof window ? window : void 0 !== global$1 ? global$1 : "undefined" != typeof self ? self : {};

    function createCommonjsModule$1(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }
    var map = createCommonjsModule$1(function(e) {
            if (void 0 !== commonjsGlobal$1.Map) e.exports = commonjsGlobal$1.Map, e.exports.Map = commonjsGlobal$1.Map;
            else {
                var t = function(e) {
                    this._keys = [], this._values = {};
                    for (var t = 0; t < e.length; t++)
                        if (null != e[t]) {
                            var r = e[t],
                                n = r[0],
                                o = r[1];
                            this._keys.push(n), this._values[n] = {
                                v: o,
                                i: this._keys.length - 1
                            }
                        }
                };
                t.prototype.clear = function() {
                    this._keys = [], this._values = {}
                }, t.prototype.delete = function(e) {
                    var t = this._values[e];
                    return null != t && (delete this._values[e], this._keys.splice(t.i, 1), !0)
                }, t.prototype.entries = function() {
                    var t = this,
                        r = 0;
                    return {
                        next: function() {
                            var e = t._keys[r++];
                            return {
                                value: void 0 !== e ? [e, t._values[e].v] : void 0,
                                done: void 0 === e
                            }
                        }
                    }
                }, t.prototype.forEach = function(e, t) {
                    t = t || this;
                    for (var r = 0; r < this._keys.length; r++) {
                        var n = this._keys[r];
                        e.call(t, this._values[n].v, n, t)
                    }
                }, t.prototype.get = function(e) {
                    return this._values[e] ? this._values[e].v : void 0
                }, t.prototype.has = function(e) {
                    return null != this._values[e]
                }, t.prototype.keys = function() {
                    var t = this,
                        r = 0;
                    return {
                        next: function() {
                            var e = t._keys[r++];
                            return {
                                value: void 0 !== e ? e : void 0,
                                done: void 0 === e
                            }
                        }
                    }
                }, t.prototype.set = function(e, t) {
                    return this._values[e] ? this._values[e].v = t : (this._keys.push(e), this._values[e] = {
                        v: t,
                        i: this._keys.length - 1
                    }), this
                }, t.prototype.values = function() {
                    var t = this,
                        r = 0;
                    return {
                        next: function() {
                            var e = t._keys[r++];
                            return {
                                value: void 0 !== e ? t._values[e].v : void 0,
                                done: void 0 === e
                            }
                        }
                    }
                }, Object.defineProperty(t.prototype, "size", {
                    enumerable: !0,
                    get: function() {
                        return this._keys.length
                    }
                }), e.exports = t
            }
        }),
        map_1 = map.Map;
    long_1.prototype.toExtendedJSON = function(e) {
        return e && e.relaxed ? this.toNumber() : {
            $numberLong: this.toString()
        }
    }, long_1.fromExtendedJSON = function(e, t) {
        var r = long_1.fromString(e.$numberLong);
        return t && t.relaxed ? r.toNumber() : r
    }, Object.defineProperty(long_1.prototype, "_bsontype", {
        value: "Long"
    });
    var long_1$1 = long_1;

    function _classCallCheck(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass(e, t, r) {
        return t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e
    }
    var Double = function() {
        function r(e) {
            _classCallCheck(this, r), this.value = e
        }
        return _createClass(r, [{
            key: "valueOf",
            value: function() {
                return this.value
            }
        }, {
            key: "toJSON",
            value: function() {
                return this.value
            }
        }, {
            key: "toExtendedJSON",
            value: function(e) {
                return e && e.relaxed && isFinite(this.value) ? this.value : {
                    $numberDouble: this.value.toString()
                }
            }
        }], [{
            key: "fromExtendedJSON",
            value: function(e, t) {
                return t && t.relaxed ? parseFloat(e.$numberDouble) : new r(parseFloat(e.$numberDouble))
            }
        }]), r
    }();
    Object.defineProperty(Double.prototype, "_bsontype", {
        value: "Double"
    });
    var double_1 = Double;

    function _typeof(e) {
        return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function _classCallCheck$1(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$1(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$1(e, t, r) {
        return t && _defineProperties$1(e.prototype, t), r && _defineProperties$1(e, r), e
    }

    function _possibleConstructorReturn(e, t) {
        return !t || "object" !== _typeof(t) && "function" != typeof t ? _assertThisInitialized(e) : t
    }

    function _assertThisInitialized(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function _getPrototypeOf(e) {
        return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function _inherits(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), t && _setPrototypeOf(e, t)
    }

    function _setPrototypeOf(e, t) {
        return (_setPrototypeOf = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var Timestamp = function(e) {
        function r(e, t) {
            return _classCallCheck$1(this, r), _possibleConstructorReturn(long_1$1.isLong(e) ? _possibleConstructorReturn(this, _getPrototypeOf(r).call(this, e.low, e.high)) : _possibleConstructorReturn(this, _getPrototypeOf(r).call(this, e, t)))
        }
        return _inherits(r, long_1$1), _createClass$1(r, [{
            key: "toJSON",
            value: function() {
                return {
                    $timestamp: this.toString()
                }
            }
        }, {
            key: "toExtendedJSON",
            value: function() {
                return {
                    $timestamp: {
                        t: this.high,
                        i: this.low
                    }
                }
            }
        }], [{
            key: "fromInt",
            value: function(e) {
                return new r(long_1$1.fromInt(e))
            }
        }, {
            key: "fromNumber",
            value: function(e) {
                return new r(long_1$1.fromNumber(e))
            }
        }, {
            key: "fromBits",
            value: function(e, t) {
                return new r(e, t)
            }
        }, {
            key: "fromString",
            value: function(e, t) {
                return new r(long_1$1.fromString(e, t))
            }
        }, {
            key: "fromExtendedJSON",
            value: function(e) {
                return new r(e.$timestamp.i, e.$timestamp.t)
            }
        }]), r
    }();
    Object.defineProperty(Timestamp.prototype, "_bsontype", {
        value: "Timestamp"
    });
    var timestamp = Timestamp,
        require$$0 = {};

    function normalizedFunctionString(e) {
        return e.toString().replace("function(", "function (")
    }

    function insecureRandomBytes(e) {
        for (var t = new Uint8Array(e), r = 0; r < e; ++r) t[r] = Math.floor(256 * Math.random());
        return t
    }
    var randomBytes = insecureRandomBytes;
    if ("undefined" != typeof window && window.crypto && window.crypto.getRandomValues) randomBytes = function(e) {
        return window.crypto.getRandomValues(new Uint8Array(e))
    };
    else {
        try {
            randomBytes = require$$0.randomBytes
        } catch (e) {}
        null == randomBytes && (randomBytes = insecureRandomBytes)
    }
    var utils = {
        normalizedFunctionString: normalizedFunctionString,
        randomBytes: randomBytes
    };

    function defaultSetTimout() {
        throw new Error("setTimeout has not been defined")
    }

    function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined")
    }
    var cachedSetTimeout = defaultSetTimout,
        cachedClearTimeout = defaultClearTimeout;

    function runTimeout(t) {
        if (cachedSetTimeout === setTimeout) return setTimeout(t, 0);
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, setTimeout(t, 0);
        try {
            return cachedSetTimeout(t, 0)
        } catch (e) {
            try {
                return cachedSetTimeout.call(null, t, 0)
            } catch (e) {
                return cachedSetTimeout.call(this, t, 0)
            }
        }
    }

    function runClearTimeout(t) {
        if (cachedClearTimeout === clearTimeout) return clearTimeout(t);
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, clearTimeout(t);
        try {
            return cachedClearTimeout(t)
        } catch (e) {
            try {
                return cachedClearTimeout.call(null, t)
            } catch (e) {
                return cachedClearTimeout.call(this, t)
            }
        }
    }
    "function" == typeof global$1.setTimeout && (cachedSetTimeout = setTimeout), "function" == typeof global$1.clearTimeout && (cachedClearTimeout = clearTimeout);
    var queue = [],
        draining = !1,
        currentQueue, queueIndex = -1;

    function cleanUpNextTick() {
        draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue())
    }

    function drainQueue() {
        if (!draining) {
            var e = runTimeout(cleanUpNextTick);
            draining = !0;
            for (var t = queue.length; t;) {
                for (currentQueue = queue, queue = []; ++queueIndex < t;) currentQueue && currentQueue[queueIndex].run();
                queueIndex = -1, t = queue.length
            }
            currentQueue = null, draining = !1, runClearTimeout(e)
        }
    }

    function nextTick(e) {
        var t = new Array(arguments.length - 1);
        if (1 < arguments.length)
            for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        queue.push(new Item(e, t)), 1 !== queue.length || draining || runTimeout(drainQueue)
    }

    function Item(e, t) {
        this.fun = e, this.array = t
    }
    Item.prototype.run = function() {
        this.fun.apply(null, this.array)
    };
    var title = "browser",
        platform = "browser",
        browser = !0,
        env = {},
        argv = [],
        version = "",
        versions = {},
        release = {},
        config = {};

    function noop() {}
    var on = noop,
        addListener = noop,
        once = noop,
        off = noop,
        removeListener = noop,
        removeAllListeners = noop,
        emit = noop;

    function binding(e) {
        throw new Error("process.binding is not supported")
    }

    function cwd() {
        return "/"
    }

    function chdir(e) {
        throw new Error("process.chdir is not supported")
    }

    function umask() {
        return 0
    }
    var performance = global$1.performance || {},
        performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
            return (new Date).getTime()
        };

    function hrtime(e) {
        var t = .001 * performanceNow.call(performance),
            r = Math.floor(t),
            n = Math.floor(t % 1 * 1e9);
        return e && (r -= e[0], (n -= e[1]) < 0 && (r--, n += 1e9)), [r, n]
    }
    var startTime = new Date;

    function uptime() {
        return (new Date - startTime) / 1e3
    }
    var process = {
            nextTick: nextTick,
            title: title,
            browser: browser,
            env: env,
            argv: argv,
            version: version,
            versions: versions,
            on: on,
            addListener: addListener,
            once: once,
            off: off,
            removeListener: removeListener,
            removeAllListeners: removeAllListeners,
            emit: emit,
            binding: binding,
            cwd: cwd,
            chdir: chdir,
            umask: umask,
            hrtime: hrtime,
            platform: platform,
            release: release,
            config: config,
            uptime: uptime
        },
        inherits;
    inherits = "function" == typeof Object.create ? function(e, t) {
        e.super_ = t, e.prototype = Object.create(t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    } : function(e, t) {
        e.super_ = t;
        var r = function() {};
        r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
    };
    var inherits$1 = inherits;

    function _typeof$1(e) {
        return (_typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var formatRegExp = /%[sdj%]/g;

    function format(e) {
        if (!isString(e)) {
            for (var t = [], r = 0; r < arguments.length; r++) t.push(inspect(arguments[r]));
            return t.join(" ")
        }
        r = 1;
        for (var n = arguments, o = n.length, i = String(e).replace(formatRegExp, function(e) {
                if ("%%" === e) return "%";
                if (o <= r) return e;
                switch (e) {
                    case "%s":
                        return String(n[r++]);
                    case "%d":
                        return Number(n[r++]);
                    case "%j":
                        try {
                            return JSON.stringify(n[r++])
                        } catch (e) {
                            return "[Circular]"
                        }
                        default:
                            return e
                }
            }), s = n[r]; r < o; s = n[++r]) isNull(s) || !isObject(s) ? i += " " + s : i += " " + inspect(s);
        return i
    }

    function deprecate(e, t) {
        if (isUndefined(global$1.process)) return function() {
            return deprecate(e, t).apply(this, arguments)
        };
        var r = !1;
        return function() {
            return r || (console.error(t), r = !0), e.apply(this, arguments)
        }
    }
    var debugs = {},
        debugEnviron;

    function debuglog(t) {
        if (isUndefined(debugEnviron) && (debugEnviron = process.env.NODE_DEBUG || ""), t = t.toUpperCase(), !debugs[t])
            if (new RegExp("\\b" + t + "\\b", "i").test(debugEnviron)) {
                debugs[t] = function() {
                    var e = format.apply(null, arguments);
                    console.error("%s %d: %s", t, 0, e)
                }
            } else debugs[t] = function() {};
        return debugs[t]
    }

    function inspect(e, t) {
        var r = {
            seen: [],
            stylize: stylizeNoColor
        };
        return 3 <= arguments.length && (r.depth = arguments[2]), 4 <= arguments.length && (r.colors = arguments[3]), isBoolean(t) ? r.showHidden = t : t && _extend(r, t), isUndefined(r.showHidden) && (r.showHidden = !1), isUndefined(r.depth) && (r.depth = 2), isUndefined(r.colors) && (r.colors = !1), isUndefined(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = stylizeWithColor), formatValue(r, e, r.depth)
    }

    function stylizeWithColor(e, t) {
        var r = inspect.styles[t];
        return r ? "[" + inspect.colors[r][0] + "m" + e + "[" + inspect.colors[r][1] + "m" : e
    }

    function stylizeNoColor(e, t) {
        return e
    }

    function arrayToHash(e) {
        var r = {};
        return e.forEach(function(e, t) {
            r[e] = !0
        }), r
    }

    function formatValue(t, r, n) {
        if (t.customInspect && r && isFunction(r.inspect) && r.inspect !== inspect && (!r.constructor || r.constructor.prototype !== r)) {
            var e = r.inspect(n, t);
            return isString(e) || (e = formatValue(t, e, n)), e
        }
        var o = formatPrimitive(t, r);
        if (o) return o;
        var i = Object.keys(r),
            s = arrayToHash(i);
        if (t.showHidden && (i = Object.getOwnPropertyNames(r)), isError(r) && (0 <= i.indexOf("message") || 0 <= i.indexOf("description"))) return formatError(r);
        if (0 === i.length) {
            if (isFunction(r)) {
                var u = r.name ? ": " + r.name : "";
                return t.stylize("[Function" + u + "]", "special")
            }
            if (isRegExp(r)) return t.stylize(RegExp.prototype.toString.call(r), "regexp");
            if (isDate(r)) return t.stylize(Date.prototype.toString.call(r), "date");
            if (isError(r)) return formatError(r)
        }
        var a, c = "",
            f = !1,
            h = ["{", "}"];
        (isArray$1(r) && (f = !0, h = ["[", "]"]), isFunction(r)) && (c = " [Function" + (r.name ? ": " + r.name : "") + "]");
        return isRegExp(r) && (c = " " + RegExp.prototype.toString.call(r)), isDate(r) && (c = " " + Date.prototype.toUTCString.call(r)), isError(r) && (c = " " + formatError(r)), 0 !== i.length || f && 0 != r.length ? n < 0 ? isRegExp(r) ? t.stylize(RegExp.prototype.toString.call(r), "regexp") : t.stylize("[Object]", "special") : (t.seen.push(r), a = f ? formatArray(t, r, n, s, i) : i.map(function(e) {
            return formatProperty(t, r, n, s, e, f)
        }), t.seen.pop(), reduceToSingleString(a, c, h)) : h[0] + c + h[1]
    }

    function formatPrimitive(e, t) {
        if (isUndefined(t)) return e.stylize("undefined", "undefined");
        if (isString(t)) {
            var r = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return e.stylize(r, "string")
        }
        return isNumber(t) ? e.stylize("" + t, "number") : isBoolean(t) ? e.stylize("" + t, "boolean") : isNull(t) ? e.stylize("null", "null") : void 0
    }

    function formatError(e) {
        return "[" + Error.prototype.toString.call(e) + "]"
    }

    function formatArray(t, r, n, o, e) {
        for (var i = [], s = 0, u = r.length; s < u; ++s) hasOwnProperty(r, String(s)) ? i.push(formatProperty(t, r, n, o, String(s), !0)) : i.push("");
        return e.forEach(function(e) {
            e.match(/^\d+$/) || i.push(formatProperty(t, r, n, o, e, !0))
        }), i
    }

    function formatProperty(e, t, r, n, o, i) {
        var s, u, a;
        if ((a = Object.getOwnPropertyDescriptor(t, o) || {
                value: t[o]
            }).get ? u = a.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : a.set && (u = e.stylize("[Setter]", "special")), hasOwnProperty(n, o) || (s = "[" + o + "]"), u || (e.seen.indexOf(a.value) < 0 ? -1 < (u = isNull(r) ? formatValue(e, a.value, null) : formatValue(e, a.value, r - 1)).indexOf("\n") && (u = i ? u.split("\n").map(function(e) {
                return "  " + e
            }).join("\n").substr(2) : "\n" + u.split("\n").map(function(e) {
                return "   " + e
            }).join("\n")) : u = e.stylize("[Circular]", "special")), isUndefined(s)) {
            if (i && o.match(/^\d+$/)) return u;
            (s = JSON.stringify("" + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), s = e.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), s = e.stylize(s, "string"))
        }
        return s + ": " + u
    }

    function reduceToSingleString(e, t, r) {
        return 60 < e.reduce(function(e, t) {
            return t.indexOf("\n"), e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
        }, 0) ? r[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + r[1] : r[0] + t + " " + e.join(", ") + " " + r[1]
    }

    function isArray$1(e) {
        return Array.isArray(e)
    }

    function isBoolean(e) {
        return "boolean" == typeof e
    }

    function isNull(e) {
        return null === e
    }

    function isNullOrUndefined(e) {
        return null == e
    }

    function isNumber(e) {
        return "number" == typeof e
    }

    function isString(e) {
        return "string" == typeof e
    }

    function isSymbol(e) {
        return "symbol" === _typeof$1(e)
    }

    function isUndefined(e) {
        return void 0 === e
    }

    function isRegExp(e) {
        return isObject(e) && "[object RegExp]" === objectToString(e)
    }

    function isObject(e) {
        return "object" === _typeof$1(e) && null !== e
    }

    function isDate(e) {
        return isObject(e) && "[object Date]" === objectToString(e)
    }

    function isError(e) {
        return isObject(e) && ("[object Error]" === objectToString(e) || e instanceof Error)
    }

    function isFunction(e) {
        return "function" == typeof e
    }

    function isPrimitive(e) {
        return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" === _typeof$1(e) || void 0 === e
    }

    function isBuffer$1(e) {
        return isBuffer(e)
    }

    function objectToString(e) {
        return Object.prototype.toString.call(e)
    }

    function pad(e) {
        return e < 10 ? "0" + e.toString(10) : e.toString(10)
    }
    inspect.colors = {
        bold: [1, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        white: [37, 39],
        grey: [90, 39],
        black: [30, 39],
        blue: [34, 39],
        cyan: [36, 39],
        green: [32, 39],
        magenta: [35, 39],
        red: [31, 39],
        yellow: [33, 39]
    }, inspect.styles = {
        special: "cyan",
        number: "yellow",
        boolean: "yellow",
        undefined: "grey",
        null: "bold",
        string: "green",
        date: "magenta",
        regexp: "red"
    };
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function timestamp$1() {
        var e = new Date,
            t = [pad(e.getHours()), pad(e.getMinutes()), pad(e.getSeconds())].join(":");
        return [e.getDate(), months[e.getMonth()], t].join(" ")
    }

    function log() {
        console.log("%s - %s", timestamp$1(), format.apply(null, arguments))
    }

    function _extend(e, t) {
        if (!t || !isObject(t)) return e;
        for (var r = Object.keys(t), n = r.length; n--;) e[r[n]] = t[r[n]];
        return e
    }

    function hasOwnProperty(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    var util = {
        inherits: inherits$1,
        _extend: _extend,
        log: log,
        isBuffer: isBuffer$1,
        isPrimitive: isPrimitive,
        isFunction: isFunction,
        isError: isError,
        isDate: isDate,
        isObject: isObject,
        isRegExp: isRegExp,
        isUndefined: isUndefined,
        isSymbol: isSymbol,
        isString: isString,
        isNumber: isNumber,
        isNullOrUndefined: isNullOrUndefined,
        isNull: isNull,
        isBoolean: isBoolean,
        isArray: isArray$1,
        inspect: inspect,
        deprecate: deprecate,
        format: format,
        debuglog: debuglog
    };

    function _classCallCheck$2(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$2(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$2(e, t, r) {
        return t && _defineProperties$2(e.prototype, t), r && _defineProperties$2(e, r), e
    }
    var Buffer$1 = buffer.Buffer,
        randomBytes$1 = utils.randomBytes,
        deprecate$1 = util.deprecate,
        PROCESS_UNIQUE = randomBytes$1(5),
        checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$"),
        hasBufferType = !1;
    try {
        Buffer$1 && Buffer$1.from && (hasBufferType = !0)
    } catch (e) {
        hasBufferType = !1
    }
    for (var hexTable = [], _i = 0; _i < 256; _i++) hexTable[_i] = (_i <= 15 ? "0" : "") + _i.toString(16);
    for (var decodeLookup = [], i$1 = 0; i$1 < 10;) decodeLookup[48 + i$1] = i$1++;
    for (; i$1 < 16;) decodeLookup[55 + i$1] = decodeLookup[87 + i$1] = i$1++;
    var _Buffer = Buffer$1;

    function convertToHex(e) {
        return e.toString("hex")
    }

    function makeObjectIdError(e, t) {
        var r = e[t];
        return new TypeError('ObjectId string "'.concat(e, '" contains invalid character "').concat(r, '" with character code (').concat(e.charCodeAt(t), "). All character codes for a non-hex string must be less than 256."))
    }
    var ObjectId = function() {
        function o(e) {
            if (_classCallCheck$2(this, o), e instanceof o) return e;
            if (null == e || "number" == typeof e) return this.id = o.generate(e), void(o.cacheHexString && (this.__id = this.toString("hex")));
            var t = o.isValid(e);
            if (!t && null != e) throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
            if (t && "string" == typeof e && 24 === e.length && hasBufferType) return new o(Buffer$1.from(e, "hex"));
            if (t && "string" == typeof e && 24 === e.length) return o.createFromHexString(e);
            if (null == e || 12 !== e.length) {
                if (null != e && e.toHexString) return o.createFromHexString(e.toHexString());
                throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters")
            }
            this.id = e, o.cacheHexString && (this.__id = this.toString("hex"))
        }
        return _createClass$2(o, [{
            key: "toHexString",
            value: function() {
                if (o.cacheHexString && this.__id) return this.__id;
                var e = "";
                if (!this.id || !this.id.length) throw new TypeError("invalid ObjectId, ObjectId.id must be either a string or a Buffer, but is [" + JSON.stringify(this.id) + "]");
                if (this.id instanceof _Buffer) return e = convertToHex(this.id), o.cacheHexString && (this.__id = e), e;
                for (var t = 0; t < this.id.length; t++) {
                    var r = hexTable[this.id.charCodeAt(t)];
                    if ("string" != typeof r) throw makeObjectIdError(this.id, t);
                    e += r
                }
                return o.cacheHexString && (this.__id = e), e
            }
        }, {
            key: "toString",
            value: function(e) {
                return this.id && this.id.copy ? this.id.toString("string" == typeof e ? e : "hex") : this.toHexString()
            }
        }, {
            key: "toJSON",
            value: function() {
                return this.toHexString()
            }
        }, {
            key: "equals",
            value: function(e) {
                return e instanceof o ? this.toString() === e.toString() : "string" == typeof e && o.isValid(e) && 12 === e.length && this.id instanceof _Buffer ? e === this.id.toString("binary") : "string" == typeof e && o.isValid(e) && 24 === e.length ? e.toLowerCase() === this.toHexString() : "string" == typeof e && o.isValid(e) && 12 === e.length ? e === this.id : !(null == e || !(e instanceof o || e.toHexString)) && e.toHexString() === this.toHexString()
            }
        }, {
            key: "getTimestamp",
            value: function() {
                var e = new Date,
                    t = this.id.readUInt32BE(0);
                return e.setTime(1e3 * Math.floor(t)), e
            }
        }, {
            key: "toExtendedJSON",
            value: function() {
                return this.toHexString ? {
                    $oid: this.toHexString()
                } : {
                    $oid: this.toString("hex")
                }
            }
        }], [{
            key: "getInc",
            value: function() {
                return o.index = (o.index + 1) % 16777215
            }
        }, {
            key: "generate",
            value: function(e) {
                "number" != typeof e && (e = ~~(Date.now() / 1e3));
                var t = o.getInc(),
                    r = Buffer$1.alloc(12);
                return r[3] = 255 & e, r[2] = e >> 8 & 255, r[1] = e >> 16 & 255, r[0] = e >> 24 & 255, r[4] = PROCESS_UNIQUE[0], r[5] = PROCESS_UNIQUE[1], r[6] = PROCESS_UNIQUE[2], r[7] = PROCESS_UNIQUE[3], r[8] = PROCESS_UNIQUE[4], r[11] = 255 & t, r[10] = t >> 8 & 255, r[9] = t >> 16 & 255, r
            }
        }, {
            key: "createPk",
            value: function() {
                return new o
            }
        }, {
            key: "createFromTime",
            value: function(e) {
                var t = Buffer$1.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                return t[3] = 255 & e, t[2] = e >> 8 & 255, t[1] = e >> 16 & 255, t[0] = e >> 24 & 255, new o(t)
            }
        }, {
            key: "createFromHexString",
            value: function(e) {
                if (void 0 === e || null != e && 24 !== e.length) throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
                if (hasBufferType) return new o(Buffer$1.from(e, "hex"));
                for (var t = new _Buffer(12), r = 0, n = 0; n < 24;) t[r++] = decodeLookup[e.charCodeAt(n++)] << 4 | decodeLookup[e.charCodeAt(n++)];
                return new o(t)
            }
        }, {
            key: "isValid",
            value: function(e) {
                return null != e && ("number" == typeof e || ("string" == typeof e ? 12 === e.length || 24 === e.length && checkForHexRegExp.test(e) : e instanceof o || (e instanceof _Buffer && 12 === e.length || !!e.toHexString && (12 === e.id.length || 24 === e.id.length && checkForHexRegExp.test(e.id)))))
            }
        }, {
            key: "fromExtendedJSON",
            value: function(e) {
                return new o(e.$oid)
            }
        }]), o
    }();
    ObjectId.get_inc = deprecate$1(function() {
        return ObjectId.getInc()
    }, "Please use the static `ObjectId.getInc()` instead"), ObjectId.prototype.get_inc = deprecate$1(function() {
        return ObjectId.getInc()
    }, "Please use the static `ObjectId.getInc()` instead"), ObjectId.prototype.getInc = deprecate$1(function() {
        return ObjectId.getInc()
    }, "Please use the static `ObjectId.getInc()` instead"), ObjectId.prototype.generate = deprecate$1(function(e) {
        return ObjectId.generate(e)
    }, "Please use the static `ObjectId.generate(time)` instead"), Object.defineProperty(ObjectId.prototype, "generationTime", {
        enumerable: !0,
        get: function() {
            return this.id[3] | this.id[2] << 8 | this.id[1] << 16 | this.id[0] << 24
        },
        set: function(e) {
            this.id[3] = 255 & e, this.id[2] = e >> 8 & 255, this.id[1] = e >> 16 & 255, this.id[0] = e >> 24 & 255
        }
    }), ObjectId.prototype[util.inspect.custom || "inspect"] = ObjectId.prototype.toString, ObjectId.index = ~~(16777215 * Math.random()), Object.defineProperty(ObjectId.prototype, "_bsontype", {
        value: "ObjectID"
    });
    var objectid = ObjectId;

    function _classCallCheck$3(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$3(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$3(e, t, r) {
        return t && _defineProperties$3(e.prototype, t), r && _defineProperties$3(e, r), e
    }

    function alphabetize(e) {
        return e.split("").sort().join("")
    }
    var BSONRegExp = function() {
        function n(e, t) {
            _classCallCheck$3(this, n), this.pattern = e || "", this.options = t ? alphabetize(t) : "";
            for (var r = 0; r < this.options.length; r++)
                if ("i" !== this.options[r] && "m" !== this.options[r] && "x" !== this.options[r] && "l" !== this.options[r] && "s" !== this.options[r] && "u" !== this.options[r]) throw new Error("The regular expression option [".concat(this.options[r], "] is not supported"))
        }
        return _createClass$3(n, [{
            key: "toExtendedJSON",
            value: function() {
                return {
                    $regularExpression: {
                        pattern: this.pattern,
                        options: this.options
                    }
                }
            }
        }], [{
            key: "fromExtendedJSON",
            value: function(e) {
                return new n(e.$regularExpression.pattern, e.$regularExpression.options.split("").sort().join(""))
            }
        }]), n
    }();
    Object.defineProperty(BSONRegExp.prototype, "_bsontype", {
        value: "BSONRegExp"
    });
    var regexp = BSONRegExp;

    function _classCallCheck$4(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$4(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$4(e, t, r) {
        return t && _defineProperties$4(e.prototype, t), r && _defineProperties$4(e, r), e
    }
    var BSONSymbol = function() {
        function t(e) {
            _classCallCheck$4(this, t), this.value = e
        }
        return _createClass$4(t, [{
            key: "valueOf",
            value: function() {
                return this.value
            }
        }, {
            key: "toString",
            value: function() {
                return this.value
            }
        }, {
            key: "inspect",
            value: function() {
                return this.value
            }
        }, {
            key: "toJSON",
            value: function() {
                return this.value
            }
        }, {
            key: "toExtendedJSON",
            value: function() {
                return {
                    $symbol: this.value
                }
            }
        }], [{
            key: "fromExtendedJSON",
            value: function(e) {
                return new t(e.$symbol)
            }
        }]), t
    }();
    Object.defineProperty(BSONSymbol.prototype, "_bsontype", {
        value: "Symbol"
    });
    var symbol = BSONSymbol;

    function _classCallCheck$5(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$5(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$5(e, t, r) {
        return t && _defineProperties$5(e.prototype, t), r && _defineProperties$5(e, r), e
    }
    var Int32 = function() {
        function r(e) {
            _classCallCheck$5(this, r), this.value = e
        }
        return _createClass$5(r, [{
            key: "valueOf",
            value: function() {
                return this.value
            }
        }, {
            key: "toJSON",
            value: function() {
                return this.value
            }
        }, {
            key: "toExtendedJSON",
            value: function(e) {
                return e && e.relaxed ? this.value : {
                    $numberInt: this.value.toString()
                }
            }
        }], [{
            key: "fromExtendedJSON",
            value: function(e, t) {
                return t && t.relaxed ? parseInt(e.$numberInt, 10) : new r(e.$numberInt)
            }
        }]), r
    }();
    Object.defineProperty(Int32.prototype, "_bsontype", {
        value: "Int32"
    });
    var int_32 = Int32;

    function _classCallCheck$6(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$6(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$6(e, t, r) {
        return t && _defineProperties$6(e.prototype, t), r && _defineProperties$6(e, r), e
    }
    var Code = function() {
        function r(e, t) {
            _classCallCheck$6(this, r), this.code = e, this.scope = t
        }
        return _createClass$6(r, [{
            key: "toJSON",
            value: function() {
                return {
                    scope: this.scope,
                    code: this.code
                }
            }
        }, {
            key: "toExtendedJSON",
            value: function() {
                return this.scope ? {
                    $code: this.code,
                    $scope: this.scope
                } : {
                    $code: this.code
                }
            }
        }], [{
            key: "fromExtendedJSON",
            value: function(e) {
                return new r(e.$code, e.$scope)
            }
        }]), r
    }();
    Object.defineProperty(Code.prototype, "_bsontype", {
        value: "Code"
    });
    var code$1 = Code,
        Buffer$2 = buffer.Buffer,
        PARSE_STRING_REGEXP = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/,
        PARSE_INF_REGEXP = /^(\+|-)?(Infinity|inf)$/i,
        PARSE_NAN_REGEXP = /^(\+|-)?NaN$/i,
        EXPONENT_MAX = 6111,
        EXPONENT_MIN = -6176,
        EXPONENT_BIAS = 6176,
        MAX_DIGITS = 34,
        NAN_BUFFER = [124, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
        INF_NEGATIVE_BUFFER = [248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
        INF_POSITIVE_BUFFER = [120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].reverse(),
        EXPONENT_REGEX = /^([-+])?(\d+)?$/;

    function isDigit(e) {
        return !isNaN(parseInt(e, 10))
    }

    function divideu128(e) {
        var t = long_1$1.fromNumber(1e9),
            r = long_1$1.fromNumber(0);
        if (!(e.parts[0] || e.parts[1] || e.parts[2] || e.parts[3])) return {
            quotient: e,
            rem: r
        };
        for (var n = 0; n <= 3; n++) r = (r = r.shiftLeft(32)).add(new long_1$1(e.parts[n], 0)), e.parts[n] = r.div(t).low, r = r.modulo(t);
        return {
            quotient: e,
            rem: r
        }
    }

    function multiply64x2(e, t) {
        if (!e && !t) return {
            high: long_1$1.fromNumber(0),
            low: long_1$1.fromNumber(0)
        };
        var r = e.shiftRightUnsigned(32),
            n = new long_1$1(e.getLowBits(), 0),
            o = t.shiftRightUnsigned(32),
            i = new long_1$1(t.getLowBits(), 0),
            s = r.multiply(o),
            u = r.multiply(i),
            a = n.multiply(o),
            c = n.multiply(i);
        return s = s.add(u.shiftRightUnsigned(32)), u = new long_1$1(u.getLowBits(), 0).add(a).add(c.shiftRightUnsigned(32)), {
            high: s = s.add(u.shiftRightUnsigned(32)),
            low: c = u.shiftLeft(32).add(new long_1$1(c.getLowBits(), 0))
        }
    }

    function lessThan(e, t) {
        var r = e.high >>> 0,
            n = t.high >>> 0;
        return r < n || r === n && e.low >>> 0 < t.low >>> 0
    }

    function invalidErr(e, t) {
        throw new TypeError('"'.concat(e, '" is not a valid Decimal128 string - ').concat(t))
    }

    function Decimal128(e) {
        this.bytes = e
    }
    Decimal128.fromString = function(e) {
        var t, r = !1,
            n = !1,
            o = !1,
            i = 0,
            s = 0,
            u = 0,
            a = 0,
            c = 0,
            f = [0],
            h = 0,
            l = 0,
            d = 0,
            p = 0,
            y = 0,
            g = 0,
            v = [0, 0],
            m = [0, 0],
            _ = 0;
        if (7e3 <= e.length) throw new TypeError(e + " not a valid Decimal128 string");
        var E = e.match(PARSE_STRING_REGEXP),
            A = e.match(PARSE_INF_REGEXP),
            b = e.match(PARSE_NAN_REGEXP);
        if (!E && !A && !b || 0 === e.length) throw new TypeError(e + " not a valid Decimal128 string");
        if (E) {
            var w = E[2],
                S = E[4],
                R = E[5],
                T = E[6];
            S && void 0 === T && invalidErr(e, "missing exponent power"), S && void 0 === w && invalidErr(e, "missing exponent base"), void 0 === S && (R || T) && invalidErr(e, "missing e before exponent")
        }
        if ("+" !== e[_] && "-" !== e[_] || (r = "-" === e[_++]), !isDigit(e[_]) && "." !== e[_]) {
            if ("i" === e[_] || "I" === e[_]) return new Decimal128(Buffer$2.from(r ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
            if ("N" === e[_]) return new Decimal128(Buffer$2.from(NAN_BUFFER))
        }
        for (; isDigit(e[_]) || "." === e[_];) "." !== e[_] ? (h < 34 && ("0" !== e[_] || o) && (o || (c = s), o = !0, f[l++] = parseInt(e[_], 10), h += 1), o && (u += 1), n && (a += 1), s += 1) : (n && invalidErr(e, "contains multiple periods"), n = !0), _ += 1;
        if (n && !s) throw new TypeError(e + " not a valid Decimal128 string");
        if ("e" === e[_] || "E" === e[_]) {
            var O = e.substr(++_).match(EXPONENT_REGEX);
            if (!O || !O[2]) return new Decimal128(Buffer$2.from(NAN_BUFFER));
            y = parseInt(O[0], 10), _ += O[0].length
        }
        if (e[_]) return new Decimal128(Buffer$2.from(NAN_BUFFER));
        if (d = 0, h) {
            if (p = h - 1, 1 !== (i = u))
                for (;
                    "0" === e[c + i - 1];) i -= 1
        } else h = u = 1, i = f[p = d = 0] = 0;
        for (y <= a && 16384 < a - y ? y = EXPONENT_MIN : y -= a; EXPONENT_MAX < y;) {
            if (MAX_DIGITS < (p += 1) - d) {
                if (f.join("").match(/^0+$/)) {
                    y = EXPONENT_MAX;
                    break
                }
                invalidErr(e, "overflow")
            }
            y -= 1
        }
        for (; y < EXPONENT_MIN || h < u;) {
            if (0 === p && i < h) {
                y = EXPONENT_MIN, i = 0;
                break
            }
            if (h < u ? u -= 1 : p -= 1, y < EXPONENT_MAX) y += 1;
            else {
                if (f.join("").match(/^0+$/)) {
                    y = EXPONENT_MAX;
                    break
                }
                invalidErr(e, "overflow")
            }
        }
        if (p - d + 1 < i) {
            var N = s;
            n && (c += 1, N += 1), r && (c += 1, N += 1);
            var I = parseInt(e[c + p + 1], 10),
                B = 0;
            if (5 <= I && (B = 1, 5 === I))
                for (B = f[p] % 2 == 1, g = c + p + 2; g < N; g++)
                    if (parseInt(e[g], 10)) {
                        B = 1;
                        break
                    } if (B)
                for (var P = p; 0 <= P; P--)
                    if (9 < ++f[P] && (f[P] = 0) === P) {
                        if (!(y < EXPONENT_MAX)) return new Decimal128(Buffer$2.from(r ? INF_NEGATIVE_BUFFER : INF_POSITIVE_BUFFER));
                        y += 1, f[P] = 1
                    }
        }
        if (v = long_1$1.fromNumber(0), m = long_1$1.fromNumber(0), 0 === i) v = long_1$1.fromNumber(0), m = long_1$1.fromNumber(0);
        else if (p - d < 17) {
            var C = d;
            for (m = long_1$1.fromNumber(f[C++]), v = new long_1$1(0, 0); C <= p; C++) m = (m = m.multiply(long_1$1.fromNumber(10))).add(long_1$1.fromNumber(f[C]))
        } else {
            var $ = d;
            for (v = long_1$1.fromNumber(f[$++]); $ <= p - 17; $++) v = (v = v.multiply(long_1$1.fromNumber(10))).add(long_1$1.fromNumber(f[$]));
            for (m = long_1$1.fromNumber(f[$++]); $ <= p; $++) m = (m = m.multiply(long_1$1.fromNumber(10))).add(long_1$1.fromNumber(f[$]))
        }
        var U = multiply64x2(v, long_1$1.fromString("100000000000000000"));
        U.low = U.low.add(m), lessThan(U.low, m) && (U.high = U.high.add(long_1$1.fromNumber(1))), t = y + EXPONENT_BIAS;
        var D = {
            low: long_1$1.fromNumber(0),
            high: long_1$1.fromNumber(0)
        };
        U.high.shiftRightUnsigned(49).and(long_1$1.fromNumber(1)).equals(long_1$1.fromNumber(1)) ? (D.high = D.high.or(long_1$1.fromNumber(3).shiftLeft(61)), D.high = D.high.or(long_1$1.fromNumber(t).and(long_1$1.fromNumber(16383).shiftLeft(47))), D.high = D.high.or(U.high.and(long_1$1.fromNumber(0x7fffffffffff)))) : (D.high = D.high.or(long_1$1.fromNumber(16383 & t).shiftLeft(49)), D.high = D.high.or(U.high.and(long_1$1.fromNumber(562949953421311)))), D.low = U.low, r && (D.high = D.high.or(long_1$1.fromString("9223372036854775808")));
        var x = Buffer$2.alloc(16);
        return _ = 0, x[_++] = 255 & D.low.low, x[_++] = D.low.low >> 8 & 255, x[_++] = D.low.low >> 16 & 255, x[_++] = D.low.low >> 24 & 255, x[_++] = 255 & D.low.high, x[_++] = D.low.high >> 8 & 255, x[_++] = D.low.high >> 16 & 255, x[_++] = D.low.high >> 24 & 255, x[_++] = 255 & D.high.low, x[_++] = D.high.low >> 8 & 255, x[_++] = D.high.low >> 16 & 255, x[_++] = D.high.low >> 24 & 255, x[_++] = 255 & D.high.high, x[_++] = D.high.high >> 8 & 255, x[_++] = D.high.high >> 16 & 255, x[_++] = D.high.high >> 24 & 255, new Decimal128(x)
    };
    var COMBINATION_MASK = 31,
        EXPONENT_MASK = 16383,
        COMBINATION_INFINITY = 30,
        COMBINATION_NAN = 31;
    Decimal128.prototype.toString = function() {
        for (var e, t, r, n, o, i, s = 0, u = new Array(36), a = 0; a < u.length; a++) u[a] = 0;
        var c, f, h, l, d, p = 0,
            y = !1,
            g = {
                parts: new Array(4)
            },
            v = [];
        p = 0;
        var m = this.bytes;
        if (n = m[p++] | m[p++] << 8 | m[p++] << 16 | m[p++] << 24, r = m[p++] | m[p++] << 8 | m[p++] << 16 | m[p++] << 24, t = m[p++] | m[p++] << 8 | m[p++] << 16 | m[p++] << 24, e = m[p++] | m[p++] << 8 | m[p++] << 16 | m[p++] << 24, p = 0, {
                low: new long_1$1(n, r),
                high: new long_1$1(t, e)
            }.high.lessThan(long_1$1.ZERO) && v.push("-"), (o = e >> 26 & COMBINATION_MASK) >> 3 == 3) {
            if (o === COMBINATION_INFINITY) return v.join("") + "Infinity";
            if (o === COMBINATION_NAN) return "NaN";
            i = e >> 15 & EXPONENT_MASK, h = 8 + (e >> 14 & 1)
        } else h = e >> 14 & 7, i = e >> 17 & EXPONENT_MASK;
        if (c = i - EXPONENT_BIAS, g.parts[0] = (16383 & e) + ((15 & h) << 14), g.parts[1] = t, g.parts[2] = r, g.parts[3] = n, 0 === g.parts[0] && 0 === g.parts[1] && 0 === g.parts[2] && 0 === g.parts[3]) y = !0;
        else
            for (d = 3; 0 <= d; d--) {
                var _ = 0,
                    E = divideu128(g);
                if (g = E.quotient, _ = E.rem.low)
                    for (l = 8; 0 <= l; l--) u[9 * d + l] = _ % 10, _ = Math.floor(_ / 10)
            }
        if (y) s = 1, u[p] = 0;
        else
            for (s = 36; !u[p];) s -= 1, p += 1;
        if (34 <= (f = s - 1 + c) || f <= -7 || 0 < c) {
            if (34 < s) return v.push(0), 0 < c ? v.push("E+" + c) : c < 0 && v.push("E" + c), v.join("");
            v.push(u[p++]), (s -= 1) && v.push(".");
            for (var A = 0; A < s; A++) v.push(u[p++]);
            v.push("E"), 0 < f ? v.push("+" + f) : v.push(f)
        } else if (0 <= c)
            for (var b = 0; b < s; b++) v.push(u[p++]);
        else {
            var w = s + c;
            if (0 < w)
                for (var S = 0; S < w; S++) v.push(u[p++]);
            else v.push("0");
            for (v.push("."); w++ < 0;) v.push("0");
            for (var R = 0; R < s - Math.max(w - 1, 0); R++) v.push(u[p++])
        }
        return v.join("")
    }, Decimal128.prototype.toJSON = function() {
        return {
            $numberDecimal: this.toString()
        }
    }, Decimal128.prototype.toExtendedJSON = function() {
        return {
            $numberDecimal: this.toString()
        }
    }, Decimal128.fromExtendedJSON = function(e) {
        return Decimal128.fromString(e.$numberDecimal)
    }, Object.defineProperty(Decimal128.prototype, "_bsontype", {
        value: "Decimal128"
    });
    var decimal128 = Decimal128;

    function _classCallCheck$7(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$7(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$7(e, t, r) {
        return t && _defineProperties$7(e.prototype, t), r && _defineProperties$7(e, r), e
    }
    var MinKey = function() {
        function e() {
            _classCallCheck$7(this, e)
        }
        return _createClass$7(e, [{
            key: "toExtendedJSON",
            value: function() {
                return {
                    $minKey: 1
                }
            }
        }], [{
            key: "fromExtendedJSON",
            value: function() {
                return new e
            }
        }]), e
    }();
    Object.defineProperty(MinKey.prototype, "_bsontype", {
        value: "MinKey"
    });
    var min_key = MinKey;

    function _classCallCheck$8(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$8(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$8(e, t, r) {
        return t && _defineProperties$8(e.prototype, t), r && _defineProperties$8(e, r), e
    }
    var MaxKey = function() {
        function e() {
            _classCallCheck$8(this, e)
        }
        return _createClass$8(e, [{
            key: "toExtendedJSON",
            value: function() {
                return {
                    $maxKey: 1
                }
            }
        }], [{
            key: "fromExtendedJSON",
            value: function() {
                return new e
            }
        }]), e
    }();
    Object.defineProperty(MaxKey.prototype, "_bsontype", {
        value: "MaxKey"
    });
    var max_key = MaxKey;

    function _classCallCheck$9(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$9(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$9(e, t, r) {
        return t && _defineProperties$9(e.prototype, t), r && _defineProperties$9(e, r), e
    }
    var DBRef = function() {
        function i(e, t, r, n) {
            _classCallCheck$9(this, i);
            var o = e.split(".");
            2 === o.length && (r = o.shift(), e = o.shift()), this.collection = e, this.oid = t, this.db = r, this.fields = n || {}
        }
        return _createClass$9(i, [{
            key: "toJSON",
            value: function() {
                var e = Object.assign({
                    $ref: this.collection,
                    $id: this.oid
                }, this.fields);
                return null != this.db && (e.$db = this.db), e
            }
        }, {
            key: "toExtendedJSON",
            value: function() {
                var e = {
                    $ref: this.collection,
                    $id: this.oid
                };
                return this.db && (e.$db = this.db), e = Object.assign(e, this.fields)
            }
        }], [{
            key: "fromExtendedJSON",
            value: function(e) {
                var t = Object.assign({}, e);
                return ["$ref", "$id", "$db"].forEach(function(e) {
                    return delete t[e]
                }), new i(e.$ref, e.$id, e.$db, t)
            }
        }]), i
    }();
    Object.defineProperty(DBRef.prototype, "_bsontype", {
        value: "DBRef"
    }), Object.defineProperty(DBRef.prototype, "namespace", {
        get: function() {
            return this.collection
        },
        set: function(e) {
            this.collection = e
        },
        configurable: !1
    });
    var db_ref = DBRef;

    function _classCallCheck$a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties$a(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _createClass$a(e, t, r) {
        return t && _defineProperties$a(e.prototype, t), r && _defineProperties$a(e, r), e
    }
    var Buffer$3 = buffer.Buffer,
        Binary = function() {
            function i(e, t) {
                if (_classCallCheck$a(this, i), !(null == e || "string" == typeof e || Buffer$3.isBuffer(e) || e instanceof Uint8Array || Array.isArray(e))) throw new TypeError("only String, Buffer, Uint8Array or Array accepted");
                if (this.sub_type = null == t ? BSON_BINARY_SUBTYPE_DEFAULT : t, this.position = 0, null == e || e instanceof Number) void 0 !== Buffer$3 ? this.buffer = Buffer$3.alloc(i.BUFFER_SIZE) : "undefined" != typeof Uint8Array ? this.buffer = new Uint8Array(new ArrayBuffer(i.BUFFER_SIZE)) : this.buffer = new Array(i.BUFFER_SIZE);
                else {
                    if ("string" == typeof e)
                        if (void 0 !== Buffer$3) this.buffer = Buffer$3.from(e);
                        else {
                            if ("undefined" == typeof Uint8Array && !Array.isArray(e)) throw new TypeError("only String, Buffer, Uint8Array or Array accepted");
                            this.buffer = writeStringToArray(e)
                        }
                    else this.buffer = e;
                    this.position = e.length
                }
            }
            return _createClass$a(i, [{
                key: "put",
                value: function(e) {
                    if (null != e.length && "number" != typeof e && 1 !== e.length) throw new TypeError("only accepts single character String, Uint8Array or Array");
                    if ("number" != typeof e && e < 0 || 255 < e) throw new TypeError("only accepts number in a valid unsigned byte range 0-255");
                    var t = null;
                    if (t = "string" == typeof e ? e.charCodeAt(0) : null != e.length ? e[0] : e, this.buffer.length > this.position) this.buffer[this.position++] = t;
                    else if (void 0 !== Buffer$3 && Buffer$3.isBuffer(this.buffer)) {
                        var r = Buffer$3.alloc(i.BUFFER_SIZE + this.buffer.length);
                        this.buffer.copy(r, 0, 0, this.buffer.length), this.buffer = r, this.buffer[this.position++] = t
                    } else {
                        var n = null;
                        n = isUint8Array(this.buffer) ? new Uint8Array(new ArrayBuffer(i.BUFFER_SIZE + this.buffer.length)) : new Array(i.BUFFER_SIZE + this.buffer.length);
                        for (var o = 0; o < this.buffer.length; o++) n[o] = this.buffer[o];
                        this.buffer = n, this.buffer[this.position++] = t
                    }
                }
            }, {
                key: "write",
                value: function(e, t) {
                    if (t = "number" == typeof t ? t : this.position, this.buffer.length < t + e.length) {
                        var r = null;
                        if (void 0 !== Buffer$3 && Buffer$3.isBuffer(this.buffer)) r = Buffer$3.alloc(this.buffer.length + e.length), this.buffer.copy(r, 0, 0, this.buffer.length);
                        else if (isUint8Array(this.buffer)) {
                            r = new Uint8Array(new ArrayBuffer(this.buffer.length + e.length));
                            for (var n = 0; n < this.position; n++) r[n] = this.buffer[n]
                        }
                        this.buffer = r
                    }
                    if (void 0 !== Buffer$3 && Buffer$3.isBuffer(e) && Buffer$3.isBuffer(this.buffer)) e.copy(this.buffer, t, 0, e.length), this.position = t + e.length > this.position ? t + e.length : this.position;
                    else if (void 0 !== Buffer$3 && "string" == typeof e && Buffer$3.isBuffer(this.buffer)) this.buffer.write(e, t, "binary"), this.position = t + e.length > this.position ? t + e.length : this.position;
                    else if (isUint8Array(e) || Array.isArray(e) && "string" != typeof e) {
                        for (var o = 0; o < e.length; o++) this.buffer[t++] = e[o];
                        this.position = t > this.position ? t : this.position
                    } else if ("string" == typeof e) {
                        for (var i = 0; i < e.length; i++) this.buffer[t++] = e.charCodeAt(i);
                        this.position = t > this.position ? t : this.position
                    }
                }
            }, {
                key: "read",
                value: function(e, t) {
                    if (t = t && 0 < t ? t : this.position, this.buffer.slice) return this.buffer.slice(e, e + t);
                    for (var r = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(t)) : new Array(t), n = 0; n < t; n++) r[n] = this.buffer[e++];
                    return r
                }
            }, {
                key: "value",
                value: function(e) {
                    if ((e = null != e && e) && void 0 !== Buffer$3 && Buffer$3.isBuffer(this.buffer) && this.buffer.length === this.position) return this.buffer;
                    if (void 0 !== Buffer$3 && Buffer$3.isBuffer(this.buffer)) return e ? this.buffer.slice(0, this.position) : this.buffer.toString("binary", 0, this.position);
                    if (e) {
                        if (null != this.buffer.slice) return this.buffer.slice(0, this.position);
                        for (var t = isUint8Array(this.buffer) ? new Uint8Array(new ArrayBuffer(this.position)) : new Array(this.position), r = 0; r < this.position; r++) t[r] = this.buffer[r];
                        return t
                    }
                    return convertArraytoUtf8BinaryString(this.buffer, 0, this.position)
                }
            }, {
                key: "length",
                value: function() {
                    return this.position
                }
            }, {
                key: "toJSON",
                value: function() {
                    return null != this.buffer ? this.buffer.toString("base64") : ""
                }
            }, {
                key: "toString",
                value: function(e) {
                    return null != this.buffer ? this.buffer.slice(0, this.position).toString(e) : ""
                }
            }, {
                key: "toExtendedJSON",
                value: function() {
                    var e = Buffer$3.isBuffer(this.buffer) ? this.buffer.toString("base64") : Buffer$3.from(this.buffer).toString("base64"),
                        t = Number(this.sub_type).toString(16);
                    return {
                        $binary: {
                            base64: e,
                            subType: 1 === t.length ? "0" + t : t
                        }
                    }
                }
            }], [{
                key: "fromExtendedJSON",
                value: function(e) {
                    var t = e.$binary.subType ? parseInt(e.$binary.subType, 16) : 0;
                    return new i(Buffer$3.from(e.$binary.base64, "base64"), t)
                }
            }]), i
        }(),
        BSON_BINARY_SUBTYPE_DEFAULT = 0;

    function isUint8Array(e) {
        return "[object Uint8Array]" === Object.prototype.toString.call(e)
    }

    function writeStringToArray(e) {
        for (var t = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(e.length)) : new Array(e.length), r = 0; r < e.length; r++) t[r] = e.charCodeAt(r);
        return t
    }

    function convertArraytoUtf8BinaryString(e, t, r) {
        for (var n = "", o = t; o < r; o++) n += String.fromCharCode(e[o]);
        return n
    }
    Binary.BUFFER_SIZE = 256, Binary.SUBTYPE_DEFAULT = 0, Binary.SUBTYPE_FUNCTION = 1, Binary.SUBTYPE_BYTE_ARRAY = 2, Binary.SUBTYPE_UUID_OLD = 3, Binary.SUBTYPE_UUID = 4, Binary.SUBTYPE_MD5 = 5, Binary.SUBTYPE_USER_DEFINED = 128, Object.defineProperty(Binary.prototype, "_bsontype", {
        value: "Binary"
    });
    var binary = Binary,
        constants = {
            BSON_INT32_MAX: 2147483647,
            BSON_INT32_MIN: -2147483648,
            BSON_INT64_MAX: Math.pow(2, 63) - 1,
            BSON_INT64_MIN: -Math.pow(2, 63),
            JS_INT_MAX: 9007199254740992,
            JS_INT_MIN: -9007199254740992,
            BSON_DATA_NUMBER: 1,
            BSON_DATA_STRING: 2,
            BSON_DATA_OBJECT: 3,
            BSON_DATA_ARRAY: 4,
            BSON_DATA_BINARY: 5,
            BSON_DATA_UNDEFINED: 6,
            BSON_DATA_OID: 7,
            BSON_DATA_BOOLEAN: 8,
            BSON_DATA_DATE: 9,
            BSON_DATA_NULL: 10,
            BSON_DATA_REGEXP: 11,
            BSON_DATA_DBPOINTER: 12,
            BSON_DATA_CODE: 13,
            BSON_DATA_SYMBOL: 14,
            BSON_DATA_CODE_W_SCOPE: 15,
            BSON_DATA_INT: 16,
            BSON_DATA_TIMESTAMP: 17,
            BSON_DATA_LONG: 18,
            BSON_DATA_DECIMAL128: 19,
            BSON_DATA_MIN_KEY: 255,
            BSON_DATA_MAX_KEY: 127,
            BSON_BINARY_SUBTYPE_DEFAULT: 0,
            BSON_BINARY_SUBTYPE_FUNCTION: 1,
            BSON_BINARY_SUBTYPE_BYTE_ARRAY: 2,
            BSON_BINARY_SUBTYPE_UUID: 3,
            BSON_BINARY_SUBTYPE_MD5: 4,
            BSON_BINARY_SUBTYPE_USER_DEFINED: 128
        };

    function _typeof$2(e) {
        return (_typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var keysToCodecs = {
        $oid: objectid,
        $binary: binary,
        $symbol: symbol,
        $numberInt: int_32,
        $numberDecimal: decimal128,
        $numberDouble: double_1,
        $numberLong: long_1$1,
        $minKey: min_key,
        $maxKey: max_key,
        $regularExpression: regexp,
        $timestamp: timestamp
    };

    function deserializeValue(e, t, r, n) {
        if ("number" == typeof r) {
            if (n.relaxed) return r;
            if (Math.floor(r) === r) {
                if (BSON_INT32_MIN <= r && r <= BSON_INT32_MAX) return new int_32(r);
                if (BSON_INT64_MIN <= r && r <= BSON_INT64_MAX) return new long_1$1.fromNumber(r)
            }
            return new double_1(r)
        }
        if (null == r || "object" !== _typeof$2(r)) return r;
        if (r.$undefined) return null;
        for (var o = Object.keys(r).filter(function(e) {
                return e.startsWith("$") && null != r[e]
            }), i = 0; i < o.length; i++) {
            var s = keysToCodecs[o[i]];
            if (s) return s.fromExtendedJSON(r, n)
        }
        if (null != r.$date) {
            var u = r.$date,
                a = new Date;
            return "string" == typeof u ? a.setTime(Date.parse(u)) : long_1$1.isLong(u) ? a.setTime(u.toNumber()) : "number" == typeof u && n.relaxed && a.setTime(u), a
        }
        if (null != r.$code) {
            var c = Object.assign({}, r);
            return r.$scope && (c.$scope = deserializeValue(e, null, r.$scope)), code$1.fromExtendedJSON(r)
        }
        if (null != r.$ref || null != r.$dbPointer) {
            var f = r.$ref ? r : r.$dbPointer;
            if (f instanceof db_ref) return f;
            var h = Object.keys(f).filter(function(e) {
                    return e.startsWith("$")
                }),
                l = !0;
            if (h.forEach(function(e) {
                    -1 === ["$ref", "$id", "$db"].indexOf(e) && (l = !1)
                }), l) return db_ref.fromExtendedJSON(f)
        }
        return r
    }

    function parse(e, r) {
        var n = this;
        return "boolean" == typeof(r = Object.assign({}, {
            relaxed: !0
        }, r)).relaxed && (r.strict = !r.relaxed), "boolean" == typeof r.strict && (r.relaxed = !r.strict), JSON.parse(e, function(e, t) {
            return deserializeValue(n, e, t, r)
        })
    }
    var BSON_INT32_MAX = 2147483647,
        BSON_INT32_MIN = -2147483648,
        BSON_INT64_MAX = 0x8000000000000000,
        BSON_INT64_MIN = -0x8000000000000000;

    function stringify(e, t, r, n) {
        null != r && "object" === _typeof$2(r) && (n = r, r = 0), null == t || "object" !== _typeof$2(t) || Array.isArray(t) || (n = t, t = null, r = 0), n = Object.assign({}, {
            relaxed: !0
        }, n);
        var o = Array.isArray(e) ? serializeArray(e, n) : serializeDocument(e, n);
        return JSON.stringify(o, t, r)
    }

    function serialize(e, t) {
        return t = t || {}, JSON.parse(stringify(e, t))
    }

    function deserialize(e, t) {
        return t = t || {}, parse(JSON.stringify(e), t)
    }

    function serializeArray(e, t) {
        return e.map(function(e) {
            return serializeValue(e, t)
        })
    }

    function getISOString(e) {
        var t = e.toISOString();
        return 0 !== e.getUTCMilliseconds() ? t : t.slice(0, -5) + "Z"
    }

    function serializeValue(e, t) {
        if (Array.isArray(e)) return serializeArray(e, t);
        if (void 0 === e) return null;
        if (e instanceof Date) {
            var r = e.getTime(),
                n = -1 < r && r < 2534023188e5;
            return t.relaxed && n ? {
                $date: getISOString(e)
            } : {
                $date: {
                    $numberLong: e.getTime().toString()
                }
            }
        }
        if ("number" == typeof e && !t.relaxed) {
            if (Math.floor(e) === e) {
                var o = BSON_INT64_MIN <= e && e <= BSON_INT64_MAX;
                if (BSON_INT32_MIN <= e && e <= BSON_INT32_MAX) return {
                    $numberInt: e.toString()
                };
                if (o) return {
                    $numberLong: e.toString()
                }
            }
            return {
                $numberDouble: e.toString()
            }
        }
        if (e instanceof RegExp) {
            var i = e.flags;
            return void 0 === i && (i = e.toString().match(/[gimuy]*$/)[0]), new regexp(e.source, i).toExtendedJSON()
        }
        return null != e && "object" === _typeof$2(e) ? serializeDocument(e, t) : e
    }
    var BSON_TYPE_MAPPINGS = {
        Binary: function(e) {
            return new binary(e.value(), e.subtype)
        },
        Code: function(e) {
            return new code$1(e.code, e.scope)
        },
        DBRef: function(e) {
            return new db_ref(e.collection || e.namespace, e.oid, e.db, e.fields)
        },
        Decimal128: function(e) {
            return new decimal128(e.bytes)
        },
        Double: function(e) {
            return new double_1(e.value)
        },
        Int32: function(e) {
            return new int_32(e.value)
        },
        Long: function(e) {
            return long_1$1.fromBits(null != e.low ? e.low : e.low_, null != e.low ? e.high : e.high_, null != e.low ? e.unsigned : e.unsigned_)
        },
        MaxKey: function() {
            return new max_key
        },
        MinKey: function() {
            return new min_key
        },
        ObjectID: function(e) {
            return new objectid(e)
        },
        ObjectId: function(e) {
            return new objectid(e)
        },
        BSONRegExp: function(e) {
            return new regexp(e.pattern, e.options)
        },
        Symbol: function(e) {
            return new symbol(e.value)
        },
        Timestamp: function(e) {
            return timestamp.fromBits(e.low, e.high)
        }
    };

    function serializeDocument(e, t) {
        if (null == e || "object" !== _typeof$2(e)) throw new Error("not an object instance");
        var r = e._bsontype;
        if (void 0 === r) {
            var n = {};
            for (var o in e) n[o] = serializeValue(e[o], t);
            return n
        }
        if ("string" == typeof r) {
            var i = e;
            if ("function" != typeof i.toExtendedJSON) {
                var s = BSON_TYPE_MAPPINGS[r];
                if (!s) throw new TypeError("Unrecognized or invalid _bsontype: " + r);
                i = s(i)
            }
            return "Code" === r && i.scope ? i = new code$1(i.code, serializeValue(i.scope, t)) : "DBRef" === r && i.oid && (i = new db_ref(i.collection, serializeValue(i.oid, t), i.db, i.fields)), i.toExtendedJSON(t)
        }
        throw new Error("_bsontype must be a string, but was: " + _typeof$2(r))
    }
    var extended_json = {
            parse: parse,
            deserialize: deserialize,
            serialize: serialize,
            stringify: stringify
        },
        FIRST_BIT = 128,
        FIRST_TWO_BITS = 192,
        FIRST_THREE_BITS = 224,
        FIRST_FOUR_BITS = 240,
        FIRST_FIVE_BITS = 248,
        TWO_BIT_CHAR = 192,
        THREE_BIT_CHAR = 224,
        FOUR_BIT_CHAR = 240,
        CONTINUING_CHAR = 128;

    function validateUtf8(e, t, r) {
        for (var n = 0, o = t; o < r; o += 1) {
            var i = e[o];
            if (n) {
                if ((i & FIRST_TWO_BITS) !== CONTINUING_CHAR) return !1;
                n -= 1
            } else if (i & FIRST_BIT)
                if ((i & FIRST_THREE_BITS) === TWO_BIT_CHAR) n = 1;
                else if ((i & FIRST_FOUR_BITS) === THREE_BIT_CHAR) n = 2;
            else {
                if ((i & FIRST_FIVE_BITS) !== FOUR_BIT_CHAR) return !1;
                n = 3
            }
        }
        return !n
    }
    var validateUtf8_1 = validateUtf8,
        validate_utf8 = {
            validateUtf8: validateUtf8_1
        },
        Buffer$4 = buffer.Buffer,
        validateUtf8$1 = validate_utf8.validateUtf8,
        JS_INT_MAX_LONG = long_1$1.fromNumber(constants.JS_INT_MAX),
        JS_INT_MIN_LONG = long_1$1.fromNumber(constants.JS_INT_MIN),
        functionCache = {};

    function deserialize$1(e, t, r) {
        var n = (t = null == t ? {} : t) && t.index ? t.index : 0,
            o = e[n] | e[n + 1] << 8 | e[n + 2] << 16 | e[n + 3] << 24;
        if (o < 5) throw new Error("bson size must be >= 5, is ".concat(o));
        if (t.allowObjectSmallerThanBufferSize && e.length < o) throw new Error("buffer length ".concat(e.length, " must be >= bson size ").concat(o));
        if (!t.allowObjectSmallerThanBufferSize && e.length !== o) throw new Error("buffer length ".concat(e.length, " must === bson size ").concat(o));
        if (o + n > e.length) throw new Error("(bson size ".concat(o, " + options.index ").concat(n, " must be <= buffer length ").concat(Buffer$4.byteLength(e), ")"));
        if (0 !== e[n + o - 1]) throw new Error("One object, sized correctly, with a spot for an EOO, but the EOO isn't 0x00");
        return deserializeObject(e, n, t, r)
    }

    function deserializeObject(e, t, r, n) {
        var o = null != r.evalFunctions && r.evalFunctions,
            i = null != r.cacheFunctions && r.cacheFunctions,
            s = null != r.cacheFunctionsCrc32 && r.cacheFunctionsCrc32;
        if (!s) var u = null;
        var a = null == r.fieldsAsRaw ? null : r.fieldsAsRaw,
            c = null != r.raw && r.raw,
            f = "boolean" == typeof r.bsonRegExp && r.bsonRegExp,
            h = null != r.promoteBuffers && r.promoteBuffers,
            l = null == r.promoteLongs || r.promoteLongs,
            d = null == r.promoteValues || r.promoteValues,
            p = t;
        if (e.length < 5) throw new Error("corrupt bson message < 5 bytes long");
        var y = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
        if (y < 5 || y > e.length) throw new Error("corrupt bson message");
        for (var g = n ? [] : {}, v = 0;;) {
            var m = e[t++];
            if (0 === m) break;
            for (var _ = t; 0 !== e[_] && _ < e.length;) _++;
            if (_ >= Buffer$4.byteLength(e)) throw new Error("Bad BSON Document: illegal CString");
            var E = n ? v++ : e.toString("utf8", t, _);
            if (t = _ + 1, m === constants.BSON_DATA_STRING) {
                var A = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                if (A <= 0 || A > e.length - t || 0 !== e[t + A - 1]) throw new Error("bad string length in bson");
                if (!validateUtf8$1(e, t, t + A - 1)) throw new Error("Invalid UTF-8 string in BSON document");
                var b = e.toString("utf8", t, t + A - 1);
                g[E] = b, t += A
            } else if (m === constants.BSON_DATA_OID) {
                var w = Buffer$4.alloc(12);
                e.copy(w, 0, t, t + 12), g[E] = new objectid(w), t += 12
            } else if (m === constants.BSON_DATA_INT && !1 === d) g[E] = new int_32(e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24);
            else if (m === constants.BSON_DATA_INT) g[E] = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
            else if (m === constants.BSON_DATA_NUMBER && !1 === d) g[E] = new double_1(e.readDoubleLE(t)), t += 8;
            else if (m === constants.BSON_DATA_NUMBER) g[E] = e.readDoubleLE(t), t += 8;
            else if (m === constants.BSON_DATA_DATE) {
                var S = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24,
                    R = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                g[E] = new Date(new long_1$1(S, R).toNumber())
            } else if (m === constants.BSON_DATA_BOOLEAN) {
                if (0 !== e[t] && 1 !== e[t]) throw new Error("illegal boolean type value");
                g[E] = 1 === e[t++]
            } else if (m === constants.BSON_DATA_OBJECT) {
                var T = t,
                    O = e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24;
                if (O <= 0 || O > e.length - t) throw new Error("bad embedded document length in bson");
                g[E] = c ? e.slice(t, t + O) : deserializeObject(e, T, r, !1), t += O
            } else if (m === constants.BSON_DATA_ARRAY) {
                var N = t,
                    I = e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24,
                    B = r,
                    P = t + I;
                if (a && a[E]) {
                    for (var C in B = {}, r) B[C] = r[C];
                    B.raw = !0
                }
                if (g[E] = deserializeObject(e, N, B, !0), 0 !== e[(t += I) - 1]) throw new Error("invalid array terminator byte");
                if (t !== P) throw new Error("corrupted array bson")
            } else if (m === constants.BSON_DATA_UNDEFINED) g[E] = void 0;
            else if (m === constants.BSON_DATA_NULL) g[E] = null;
            else if (m === constants.BSON_DATA_LONG) {
                var $ = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24,
                    U = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24,
                    D = new long_1$1($, U);
                g[E] = l && !0 === d && D.lessThanOrEqual(JS_INT_MAX_LONG) && D.greaterThanOrEqual(JS_INT_MIN_LONG) ? D.toNumber() : D
            } else if (m === constants.BSON_DATA_DECIMAL128) {
                var x = Buffer$4.alloc(16);
                e.copy(x, 0, t, t + 16), t += 16;
                var L = new decimal128(x);
                g[E] = L.toObject ? L.toObject() : L
            } else if (m === constants.BSON_DATA_BINARY) {
                var F = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24,
                    k = F,
                    M = e[t++];
                if (F < 0) throw new Error("Negative binary type element size found");
                if (F > Buffer$4.byteLength(e)) throw new Error("Binary type size larger than document size");
                if (null != e.slice) {
                    if (M === binary.SUBTYPE_BYTE_ARRAY) {
                        if ((F = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24) < 0) throw new Error("Negative binary type element size found for subtype 0x02");
                        if (k - 4 < F) throw new Error("Binary type with subtype 0x02 contains to long binary size");
                        if (F < k - 4) throw new Error("Binary type with subtype 0x02 contains to short binary size")
                    }
                    g[E] = h && d ? e.slice(t, t + F) : new binary(e.slice(t, t + F), M)
                } else {
                    var j = "undefined" != typeof Uint8Array ? new Uint8Array(new ArrayBuffer(F)) : new Array(F);
                    if (M === binary.SUBTYPE_BYTE_ARRAY) {
                        if ((F = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24) < 0) throw new Error("Negative binary type element size found for subtype 0x02");
                        if (k - 4 < F) throw new Error("Binary type with subtype 0x02 contains to long binary size");
                        if (F < k - 4) throw new Error("Binary type with subtype 0x02 contains to short binary size")
                    }
                    for (_ = 0; _ < F; _++) j[_] = e[t + _];
                    g[E] = h && d ? j : new binary(j, M)
                }
                t += F
            } else if (m === constants.BSON_DATA_REGEXP && !1 === f) {
                for (_ = t; 0 !== e[_] && _ < e.length;) _++;
                if (_ >= e.length) throw new Error("Bad BSON Document: illegal CString");
                var z = e.toString("utf8", t, _);
                for (_ = t = _ + 1; 0 !== e[_] && _ < e.length;) _++;
                if (_ >= e.length) throw new Error("Bad BSON Document: illegal CString");
                var q = e.toString("utf8", t, _);
                t = _ + 1;
                var V = new Array(q.length);
                for (_ = 0; _ < q.length; _++) switch (q[_]) {
                    case "m":
                        V[_] = "m";
                        break;
                    case "s":
                        V[_] = "g";
                        break;
                    case "i":
                        V[_] = "i"
                }
                g[E] = new RegExp(z, V.join(""))
            } else if (m === constants.BSON_DATA_REGEXP && !0 === f) {
                for (_ = t; 0 !== e[_] && _ < e.length;) _++;
                if (_ >= e.length) throw new Error("Bad BSON Document: illegal CString");
                var Y = e.toString("utf8", t, _);
                for (_ = t = _ + 1; 0 !== e[_] && _ < e.length;) _++;
                if (_ >= e.length) throw new Error("Bad BSON Document: illegal CString");
                var K = e.toString("utf8", t, _);
                t = _ + 1, g[E] = new regexp(Y, K)
            } else if (m === constants.BSON_DATA_SYMBOL) {
                var W = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                if (W <= 0 || W > e.length - t || 0 !== e[t + W - 1]) throw new Error("bad string length in bson");
                g[E] = e.toString("utf8", t, t + W - 1), t += W
            } else if (m === constants.BSON_DATA_TIMESTAMP) {
                var H = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24,
                    G = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                g[E] = new timestamp(H, G)
            } else if (m === constants.BSON_DATA_MIN_KEY) g[E] = new min_key;
            else if (m === constants.BSON_DATA_MAX_KEY) g[E] = new max_key;
            else if (m === constants.BSON_DATA_CODE) {
                var J = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                if (J <= 0 || J > e.length - t || 0 !== e[t + J - 1]) throw new Error("bad string length in bson");
                var X = e.toString("utf8", t, t + J - 1);
                if (o)
                    if (i) {
                        var Z = s ? u(X) : X;
                        g[E] = isolateEvalWithHash(functionCache, Z, X, g)
                    } else g[E] = isolateEval(X);
                else g[E] = new code$1(X);
                t += J
            } else if (m === constants.BSON_DATA_CODE_W_SCOPE) {
                var Q = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                if (Q < 13) throw new Error("code_w_scope total size shorter minimum expected length");
                var ee = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                if (ee <= 0 || ee > e.length - t || 0 !== e[t + ee - 1]) throw new Error("bad string length in bson");
                var te = e.toString("utf8", t, t + ee - 1),
                    re = t += ee,
                    ne = e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24,
                    oe = deserializeObject(e, re, r, !1);
                if (t += ne, Q < 8 + ne + ee) throw new Error("code_w_scope total size is to short, truncating scope");
                if (8 + ne + ee < Q) throw new Error("code_w_scope total size is to long, clips outer document");
                if (o) {
                    if (i) {
                        var ie = s ? u(te) : te;
                        g[E] = isolateEvalWithHash(functionCache, ie, te, g)
                    } else g[E] = isolateEval(te);
                    g[E].scope = oe
                } else g[E] = new code$1(te, oe)
            } else {
                if (m !== constants.BSON_DATA_DBPOINTER) throw new Error("Detected unknown BSON type " + m.toString(16) + ' for fieldname "' + E + '", are you using the latest BSON parser?');
                var se = e[t++] | e[t++] << 8 | e[t++] << 16 | e[t++] << 24;
                if (se <= 0 || se > e.length - t || 0 !== e[t + se - 1]) throw new Error("bad string length in bson");
                if (!validateUtf8$1(e, t, t + se - 1)) throw new Error("Invalid UTF-8 string in BSON document");
                var ue = e.toString("utf8", t, t + se - 1);
                t += se;
                var ae = Buffer$4.alloc(12);
                e.copy(ae, 0, t, t + 12);
                var ce = new objectid(ae);
                t += 12, g[E] = new db_ref(ue, ce)
            }
        }
        if (y !== t - p) {
            if (n) throw new Error("corrupt array bson");
            throw new Error("corrupt object bson")
        }
        var fe = Object.keys(g).filter(function(e) {
                return e.startsWith("$")
            }),
            he = !0;
        if (fe.forEach(function(e) {
                -1 === ["$ref", "$id", "$db"].indexOf(e) && (he = !1)
            }), !he) return g;
        if (null != g.$id && null != g.$ref) {
            var le = Object.assign({}, g);
            return delete le.$ref, delete le.$id, delete le.$db, new db_ref(g.$ref, g.$id, g.$db || null, le)
        }
        return g
    }

    function isolateEvalWithHash(functionCache, hash, functionString, object) {
        var value = null;
        return null == functionCache[hash] && (eval("value = " + functionString), functionCache[hash] = value), functionCache[hash].bind(object)
    }

    function isolateEval(functionString) {
        var value = null;
        return eval("value = " + functionString), value
    }
    var deserializer = deserialize$1;

    function readIEEE754(e, t, r, n, o) {
        var i, s, u = "big" === r,
            a = 8 * o - n - 1,
            c = (1 << a) - 1,
            f = c >> 1,
            h = -7,
            l = u ? 0 : o - 1,
            d = u ? 1 : -1,
            p = e[t + l];
        for (l += d, i = p & (1 << -h) - 1, p >>= -h, h += a; 0 < h; i = 256 * i + e[t + l], l += d, h -= 8);
        for (s = i & (1 << -h) - 1, i >>= -h, h += n; 0 < h; s = 256 * s + e[t + l], l += d, h -= 8);
        if (0 === i) i = 1 - f;
        else {
            if (i === c) return s ? NaN : 1 / 0 * (p ? -1 : 1);
            s += Math.pow(2, n), i -= f
        }
        return (p ? -1 : 1) * s * Math.pow(2, i - n)
    }

    function writeIEEE754(e, t, r, n, o, i) {
        var s, u, a, c = "big" === n,
            f = 8 * i - o - 1,
            h = (1 << f) - 1,
            l = h >> 1,
            d = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            p = c ? i - 1 : 0,
            y = c ? -1 : 1,
            g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (u = isNaN(t) ? 1 : 0, s = h) : (s = Math.floor(Math.log(t) / Math.LN2), t * (a = Math.pow(2, -s)) < 1 && (s--, a *= 2), 2 <= (t += 1 <= s + l ? d / a : d * Math.pow(2, 1 - l)) * a && (s++, a /= 2), h <= s + l ? (u = 0, s = h) : 1 <= s + l ? (u = (t * a - 1) * Math.pow(2, o), s += l) : (u = t * Math.pow(2, l - 1) * Math.pow(2, o), s = 0)), isNaN(t) && (u = 0); 8 <= o;) e[r + p] = 255 & u, p += y, u /= 256, o -= 8;
        for (s = s << o | u, isNaN(t) && (s += 8), f += o; 0 < f;) e[r + p] = 255 & s, p += y, s /= 256, f -= 8;
        e[r + p - y] |= 128 * g
    }
    var float_parser = {
        readIEEE754: readIEEE754,
        writeIEEE754: writeIEEE754
    };

    function _typeof$3(e) {
        return (_typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var Buffer$5 = buffer.Buffer,
        writeIEEE754$1 = float_parser.writeIEEE754,
        normalizedFunctionString$1 = utils.normalizedFunctionString,
        regexp$1 = /\x00/,
        ignoreKeys = new Set(["$db", "$ref", "$id", "$clusterTime"]),
        isDate$1 = function(e) {
            return "object" === _typeof$3(e) && "[object Date]" === Object.prototype.toString.call(e)
        },
        isRegExp$1 = function(e) {
            return "[object RegExp]" === Object.prototype.toString.call(e)
        };

    function serializeString(e, t, r, n, o) {
        e[n++] = constants.BSON_DATA_STRING;
        var i = o ? e.write(t, n, "ascii") : e.write(t, n, "utf8");
        e[(n = n + i + 1) - 1] = 0;
        var s = e.write(r, n + 4, "utf8");
        return e[n + 3] = s + 1 >> 24 & 255, e[n + 2] = s + 1 >> 16 & 255, e[n + 1] = s + 1 >> 8 & 255, e[n] = s + 1 & 255, n = n + 4 + s, e[n++] = 0, n
    }

    function serializeNumber(e, t, r, n, o) {
        if (Math.floor(r) === r && r >= constants.JS_INT_MIN && r <= constants.JS_INT_MAX)
            if (r >= constants.BSON_INT32_MIN && r <= constants.BSON_INT32_MAX) e[n++] = constants.BSON_DATA_INT, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, e[n++] = 255 & r, e[n++] = r >> 8 & 255, e[n++] = r >> 16 & 255, e[n++] = r >> 24 & 255;
            else if (r >= constants.JS_INT_MIN && r <= constants.JS_INT_MAX) {
            e[n++] = constants.BSON_DATA_NUMBER, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, writeIEEE754$1(e, r, n, "little", 52, 8), n += 8
        } else {
            e[n++] = constants.BSON_DATA_LONG, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var i = long_1$1.fromNumber(r),
                s = i.getLowBits(),
                u = i.getHighBits();
            e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255, e[n++] = 255 & u, e[n++] = u >> 8 & 255, e[n++] = u >> 16 & 255, e[n++] = u >> 24 & 255
        } else e[n++] = constants.BSON_DATA_NUMBER, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, writeIEEE754$1(e, r, n, "little", 52, 8), n += 8;
        return n
    }

    function serializeNull(e, t, r, n, o) {
        return e[n++] = constants.BSON_DATA_NULL, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, n
    }

    function serializeBoolean(e, t, r, n, o) {
        return e[n++] = constants.BSON_DATA_BOOLEAN, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, e[n++] = r ? 1 : 0, n
    }

    function serializeDate(e, t, r, n, o) {
        e[n++] = constants.BSON_DATA_DATE, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var i = long_1$1.fromNumber(r.getTime()),
            s = i.getLowBits(),
            u = i.getHighBits();
        return e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255, e[n++] = 255 & u, e[n++] = u >> 8 & 255, e[n++] = u >> 16 & 255, e[n++] = u >> 24 & 255, n
    }

    function serializeRegExp(e, t, r, n, o) {
        if (e[n++] = constants.BSON_DATA_REGEXP, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, r.source && null != r.source.match(regexp$1)) throw Error("value " + r.source + " must not contain null bytes");
        return n += e.write(r.source, n, "utf8"), e[n++] = 0, r.ignoreCase && (e[n++] = 105), r.global && (e[n++] = 115), r.multiline && (e[n++] = 109), e[n++] = 0, n
    }

    function serializeBSONRegExp(e, t, r, n, o) {
        if (e[n++] = constants.BSON_DATA_REGEXP, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, null != r.pattern.match(regexp$1)) throw Error("pattern " + r.pattern + " must not contain null bytes");
        return n += e.write(r.pattern, n, "utf8"), e[n++] = 0, n += e.write(r.options.split("").sort().join(""), n, "utf8"), e[n++] = 0, n
    }

    function serializeMinMax(e, t, r, n, o) {
        return null === r ? e[n++] = constants.BSON_DATA_NULL : "MinKey" === r._bsontype ? e[n++] = constants.BSON_DATA_MIN_KEY : e[n++] = constants.BSON_DATA_MAX_KEY, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, n
    }

    function serializeObjectId(e, t, r, n, o) {
        if (e[n++] = constants.BSON_DATA_OID, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, "string" == typeof r.id) e.write(r.id, n, "binary");
        else {
            if (!r.id || !r.id.copy) throw new TypeError("object [" + JSON.stringify(r) + "] is not a valid ObjectId");
            r.id.copy(e, n, 0, 12)
        }
        return n + 12
    }

    function serializeBuffer(e, t, r, n, o) {
        e[n++] = constants.BSON_DATA_BINARY, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var i = r.length;
        return e[n++] = 255 & i, e[n++] = i >> 8 & 255, e[n++] = i >> 16 & 255, e[n++] = i >> 24 & 255, e[n++] = constants.BSON_BINARY_SUBTYPE_DEFAULT, r.copy(e, n, 0, i), n += i
    }

    function serializeObject(e, t, r, n, o, i, s, u, a, c) {
        for (var f = 0; f < c.length; f++)
            if (c[f] === r) throw new Error("cyclic dependency detected");
        c.push(r), e[n++] = Array.isArray(r) ? constants.BSON_DATA_ARRAY : constants.BSON_DATA_OBJECT, n += a ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var h = serializeInto(e, r, o, n, i + 1, s, u, c);
        return c.pop(), h
    }

    function serializeDecimal128(e, t, r, n, o) {
        return e[n++] = constants.BSON_DATA_DECIMAL128, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, r.bytes.copy(e, n, 0, 16), n + 16
    }

    function serializeLong(e, t, r, n, o) {
        e[n++] = "Long" === r._bsontype ? constants.BSON_DATA_LONG : constants.BSON_DATA_TIMESTAMP, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var i = r.getLowBits(),
            s = r.getHighBits();
        return e[n++] = 255 & i, e[n++] = i >> 8 & 255, e[n++] = i >> 16 & 255, e[n++] = i >> 24 & 255, e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255, n
    }

    function serializeInt32(e, t, r, n, o) {
        return e[n++] = constants.BSON_DATA_INT, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, e[n++] = 255 & r, e[n++] = r >> 8 & 255, e[n++] = r >> 16 & 255, e[n++] = r >> 24 & 255, n
    }

    function serializeDouble(e, t, r, n, o) {
        return e[n++] = constants.BSON_DATA_NUMBER, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0, writeIEEE754$1(e, r.value, n, "little", 52, 8), n += 8
    }

    function serializeFunction(e, t, r, n, o, i, s) {
        e[n++] = constants.BSON_DATA_CODE, n += s ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var u = normalizedFunctionString$1(r),
            a = e.write(u, n + 4, "utf8") + 1;
        return e[n] = 255 & a, e[n + 1] = a >> 8 & 255, e[n + 2] = a >> 16 & 255, e[n + 3] = a >> 24 & 255, n = n + 4 + a - 1, e[n++] = 0, n
    }

    function serializeCode(e, t, r, n, o, i, s, u, a) {
        if (r.scope && "object" === _typeof$3(r.scope)) {
            e[n++] = constants.BSON_DATA_CODE_W_SCOPE, n += a ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var c = n,
                f = "string" == typeof r.code ? r.code : r.code.toString();
            n += 4;
            var h = e.write(f, n + 4, "utf8") + 1;
            e[n] = 255 & h, e[n + 1] = h >> 8 & 255, e[n + 2] = h >> 16 & 255, e[n + 3] = h >> 24 & 255, e[n + 4 + h - 1] = 0, n = n + h + 4;
            var l = serializeInto(e, r.scope, o, n, i + 1, s, u);
            n = l - 1;
            var d = l - c;
            e[c++] = 255 & d, e[c++] = d >> 8 & 255, e[c++] = d >> 16 & 255, e[c++] = d >> 24 & 255, e[n++] = 0
        } else {
            e[n++] = constants.BSON_DATA_CODE, n += a ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
            var p = r.code.toString(),
                y = e.write(p, n + 4, "utf8") + 1;
            e[n] = 255 & y, e[n + 1] = y >> 8 & 255, e[n + 2] = y >> 16 & 255, e[n + 3] = y >> 24 & 255, n = n + 4 + y - 1, e[n++] = 0
        }
        return n
    }

    function serializeBinary(e, t, r, n, o) {
        e[n++] = constants.BSON_DATA_BINARY, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var i = r.value(!0),
            s = r.position;
        return r.sub_type === binary.SUBTYPE_BYTE_ARRAY && (s += 4), e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255, e[n++] = r.sub_type, r.sub_type === binary.SUBTYPE_BYTE_ARRAY && (s -= 4, e[n++] = 255 & s, e[n++] = s >> 8 & 255, e[n++] = s >> 16 & 255, e[n++] = s >> 24 & 255), i.copy(e, n, 0, r.position), n += r.position
    }

    function serializeSymbol(e, t, r, n, o) {
        e[n++] = constants.BSON_DATA_SYMBOL, n += o ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var i = e.write(r.value, n + 4, "utf8") + 1;
        return e[n] = 255 & i, e[n + 1] = i >> 8 & 255, e[n + 2] = i >> 16 & 255, e[n + 3] = i >> 24 & 255, n = n + 4 + i - 1, e[n++] = 0, n
    }

    function serializeDBRef(e, t, r, n, o, i, s) {
        e[n++] = constants.BSON_DATA_OBJECT, n += s ? e.write(t, n, "ascii") : e.write(t, n, "utf8"), e[n++] = 0;
        var u, a = n,
            c = {
                $ref: r.collection || r.namespace,
                $id: r.oid
            };
        null != r.db && (c.$db = r.db);
        var f = (u = serializeInto(e, c = Object.assign(c, r.fields), !1, n, o + 1, i)) - a;
        return e[a++] = 255 & f, e[a++] = f >> 8 & 255, e[a++] = f >> 16 & 255, e[a++] = f >> 24 & 255, u
    }

    function serializeInto(e, t, r, n, o, i, s, u) {
        n = n || 0, (u = u || []).push(t);
        var a = n + 4;
        if (Array.isArray(t))
            for (var c = 0; c < t.length; c++) {
                var f = "" + c,
                    h = t[c];
                if (h && h.toBSON) {
                    if ("function" != typeof h.toBSON) throw new TypeError("toBSON is not a function");
                    h = h.toBSON()
                }
                var l = _typeof$3(h);
                if ("string" === l) a = serializeString(e, f, h, a, !0);
                else if ("number" === l) a = serializeNumber(e, f, h, a, !0);
                else if ("boolean" === l) a = serializeBoolean(e, f, h, a, !0);
                else if (h instanceof Date || isDate$1(h)) a = serializeDate(e, f, h, a, !0);
                else if (void 0 === h) a = serializeNull(e, f, h, a, !0);
                else if (null === h) a = serializeNull(e, f, h, a, !0);
                else if ("ObjectId" === h._bsontype || "ObjectID" === h._bsontype) a = serializeObjectId(e, f, h, a, !0);
                else if (Buffer$5.isBuffer(h)) a = serializeBuffer(e, f, h, a, !0);
                else if (h instanceof RegExp || isRegExp$1(h)) a = serializeRegExp(e, f, h, a, !0);
                else if ("object" === l && null == h._bsontype) a = serializeObject(e, f, h, a, r, o, i, s, !0, u);
                else if ("object" === l && "Decimal128" === h._bsontype) a = serializeDecimal128(e, f, h, a, !0);
                else if ("Long" === h._bsontype || "Timestamp" === h._bsontype) a = serializeLong(e, f, h, a, !0);
                else if ("Double" === h._bsontype) a = serializeDouble(e, f, h, a, !0);
                else if ("function" == typeof h && i) a = serializeFunction(e, f, h, a, r, o, i, !0);
                else if ("Code" === h._bsontype) a = serializeCode(e, f, h, a, r, o, i, s, !0);
                else if ("Binary" === h._bsontype) a = serializeBinary(e, f, h, a, !0);
                else if ("Symbol" === h._bsontype) a = serializeSymbol(e, f, h, a, !0);
                else if ("DBRef" === h._bsontype) a = serializeDBRef(e, f, h, a, o, i, !0);
                else if ("BSONRegExp" === h._bsontype) a = serializeBSONRegExp(e, f, h, a, !0);
                else if ("Int32" === h._bsontype) a = serializeInt32(e, f, h, a, !0);
                else if ("MinKey" === h._bsontype || "MaxKey" === h._bsontype) a = serializeMinMax(e, f, h, a, !0);
                else if (void 0 !== h._bsontype) throw new TypeError("Unrecognized or invalid _bsontype: " + h._bsontype)
            } else if (t instanceof map)
                for (var d = t.entries(), p = !1; !p;) {
                    var y = d.next();
                    if (!(p = y.done)) {
                        var g = y.value[0],
                            v = y.value[1],
                            m = _typeof$3(v);
                        if ("string" == typeof g && !ignoreKeys.has(g)) {
                            if (null != g.match(regexp$1)) throw Error("key " + g + " must not contain null bytes");
                            if (r) {
                                if ("$" === g[0]) throw Error("key " + g + " must not start with '$'");
                                if (~g.indexOf(".")) throw Error("key " + g + " must not contain '.'")
                            }
                        }
                        if ("string" === m) a = serializeString(e, g, v, a);
                        else if ("number" === m) a = serializeNumber(e, g, v, a);
                        else if ("boolean" === m) a = serializeBoolean(e, g, v, a);
                        else if (v instanceof Date || isDate$1(v)) a = serializeDate(e, g, v, a);
                        else if (null === v || void 0 === v && !1 === s) a = serializeNull(e, g, v, a);
                        else if ("ObjectId" === v._bsontype || "ObjectID" === v._bsontype) a = serializeObjectId(e, g, v, a);
                        else if (Buffer$5.isBuffer(v)) a = serializeBuffer(e, g, v, a);
                        else if (v instanceof RegExp || isRegExp$1(v)) a = serializeRegExp(e, g, v, a);
                        else if ("object" === m && null == v._bsontype) a = serializeObject(e, g, v, a, r, o, i, s, !1, u);
                        else if ("object" === m && "Decimal128" === v._bsontype) a = serializeDecimal128(e, g, v, a);
                        else if ("Long" === v._bsontype || "Timestamp" === v._bsontype) a = serializeLong(e, g, v, a);
                        else if ("Double" === v._bsontype) a = serializeDouble(e, g, v, a);
                        else if ("Code" === v._bsontype) a = serializeCode(e, g, v, a, r, o, i, s);
                        else if ("function" == typeof v && i) a = serializeFunction(e, g, v, a, r, o, i);
                        else if ("Binary" === v._bsontype) a = serializeBinary(e, g, v, a);
                        else if ("Symbol" === v._bsontype) a = serializeSymbol(e, g, v, a);
                        else if ("DBRef" === v._bsontype) a = serializeDBRef(e, g, v, a, o, i);
                        else if ("BSONRegExp" === v._bsontype) a = serializeBSONRegExp(e, g, v, a);
                        else if ("Int32" === v._bsontype) a = serializeInt32(e, g, v, a);
                        else if ("MinKey" === v._bsontype || "MaxKey" === v._bsontype) a = serializeMinMax(e, g, v, a);
                        else if (void 0 !== v._bsontype) throw new TypeError("Unrecognized or invalid _bsontype: " + v._bsontype)
                    }
                } else {
                    if (t.toBSON) {
                        if ("function" != typeof t.toBSON) throw new TypeError("toBSON is not a function");
                        if (null != (t = t.toBSON()) && "object" !== _typeof$3(t)) throw new TypeError("toBSON function did not return an object")
                    }
                    for (var _ in t) {
                        var E = t[_];
                        if (E && E.toBSON) {
                            if ("function" != typeof E.toBSON) throw new TypeError("toBSON is not a function");
                            E = E.toBSON()
                        }
                        var A = _typeof$3(E);
                        if ("string" == typeof _ && !ignoreKeys.has(_)) {
                            if (null != _.match(regexp$1)) throw Error("key " + _ + " must not contain null bytes");
                            if (r) {
                                if ("$" === _[0]) throw Error("key " + _ + " must not start with '$'");
                                if (~_.indexOf(".")) throw Error("key " + _ + " must not contain '.'")
                            }
                        }
                        if ("string" === A) a = serializeString(e, _, E, a);
                        else if ("number" === A) a = serializeNumber(e, _, E, a);
                        else if ("boolean" === A) a = serializeBoolean(e, _, E, a);
                        else if (E instanceof Date || isDate$1(E)) a = serializeDate(e, _, E, a);
                        else if (void 0 === E) !1 === s && (a = serializeNull(e, _, E, a));
                        else if (null === E) a = serializeNull(e, _, E, a);
                        else if ("ObjectId" === E._bsontype || "ObjectID" === E._bsontype) a = serializeObjectId(e, _, E, a);
                        else if (Buffer$5.isBuffer(E)) a = serializeBuffer(e, _, E, a);
                        else if (E instanceof RegExp || isRegExp$1(E)) a = serializeRegExp(e, _, E, a);
                        else if ("object" === A && null == E._bsontype) a = serializeObject(e, _, E, a, r, o, i, s, !1, u);
                        else if ("object" === A && "Decimal128" === E._bsontype) a = serializeDecimal128(e, _, E, a);
                        else if ("Long" === E._bsontype || "Timestamp" === E._bsontype) a = serializeLong(e, _, E, a);
                        else if ("Double" === E._bsontype) a = serializeDouble(e, _, E, a);
                        else if ("Code" === E._bsontype) a = serializeCode(e, _, E, a, r, o, i, s);
                        else if ("function" == typeof E && i) a = serializeFunction(e, _, E, a, r, o, i);
                        else if ("Binary" === E._bsontype) a = serializeBinary(e, _, E, a);
                        else if ("Symbol" === E._bsontype) a = serializeSymbol(e, _, E, a);
                        else if ("DBRef" === E._bsontype) a = serializeDBRef(e, _, E, a, o, i);
                        else if ("BSONRegExp" === E._bsontype) a = serializeBSONRegExp(e, _, E, a);
                        else if ("Int32" === E._bsontype) a = serializeInt32(e, _, E, a);
                        else if ("MinKey" === E._bsontype || "MaxKey" === E._bsontype) a = serializeMinMax(e, _, E, a);
                        else if (void 0 !== E._bsontype) throw new TypeError("Unrecognized or invalid _bsontype: " + E._bsontype)
                    }
                }
        u.pop(), e[a++] = 0;
        var b = a - n;
        return e[n++] = 255 & b, e[n++] = b >> 8 & 255, e[n++] = b >> 16 & 255, e[n++] = b >> 24 & 255, a
    }
    var serializer = serializeInto;

    function _typeof$4(e) {
        return (_typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }
    var Buffer$6 = buffer.Buffer,
        normalizedFunctionString$2 = utils.normalizedFunctionString;

    function isDate$2(e) {
        return "object" === _typeof$4(e) && "[object Date]" === Object.prototype.toString.call(e)
    }

    function calculateObjectSize(e, t, r) {
        var n = 5;
        if (Array.isArray(e))
            for (var o = 0; o < e.length; o++) n += calculateElement(o.toString(), e[o], t, !0, r);
        else
            for (var i in e.toBSON && (e = e.toBSON()), e) n += calculateElement(i, e[i], t, !1, r);
        return n
    }

    function calculateElement(e, t, r, n, o) {
        switch (t && t.toBSON && (t = t.toBSON()), _typeof$4(t)) {
            case "string":
                return 1 + Buffer$6.byteLength(e, "utf8") + 1 + 4 + Buffer$6.byteLength(t, "utf8") + 1;
            case "number":
                return Math.floor(t) === t && t >= constants.JS_INT_MIN && t <= constants.JS_INT_MAX && t >= constants.BSON_INT32_MIN && t <= constants.BSON_INT32_MAX ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 5 : (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 9;
            case "undefined":
                return n || !o ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 : 0;
            case "boolean":
                return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 2;
            case "object":
                if (null == t || "MinKey" === t._bsontype || "MaxKey" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1;
                if ("ObjectId" === t._bsontype || "ObjectID" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 13;
                if (t instanceof Date || isDate$2(t)) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 9;
                if (void 0 !== Buffer$6 && Buffer$6.isBuffer(t)) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 6 + t.length;
                if ("Long" === t._bsontype || "Double" === t._bsontype || "Timestamp" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 9;
                if ("Decimal128" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 17;
                if ("Code" === t._bsontype) return null != t.scope && 0 < Object.keys(t.scope).length ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + 4 + Buffer$6.byteLength(t.code.toString(), "utf8") + 1 + calculateObjectSize(t.scope, r, o) : (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + Buffer$6.byteLength(t.code.toString(), "utf8") + 1;
                if ("Binary" === t._bsontype) return t.sub_type === binary.SUBTYPE_BYTE_ARRAY ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + (t.position + 1 + 4 + 1 + 4) : (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + (t.position + 1 + 4 + 1);
                if ("Symbol" === t._bsontype) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + Buffer$6.byteLength(t.value, "utf8") + 4 + 1 + 1;
                if ("DBRef" === t._bsontype) {
                    var i = Object.assign({
                        $ref: t.collection,
                        $id: t.oid
                    }, t.fields);
                    return null != t.db && (i.$db = t.db), (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + calculateObjectSize(i, r, o)
                }
                return t instanceof RegExp || "[object RegExp]" === Object.prototype.toString.call(t) ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + Buffer$6.byteLength(t.source, "utf8") + 1 + (t.global ? 1 : 0) + (t.ignoreCase ? 1 : 0) + (t.multiline ? 1 : 0) + 1 : "BSONRegExp" === t._bsontype ? (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + Buffer$6.byteLength(t.pattern, "utf8") + 1 + Buffer$6.byteLength(t.options, "utf8") + 1 : (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + calculateObjectSize(t, r, o) + 1;
            case "function":
                if (t instanceof RegExp || "[object RegExp]" === Object.prototype.toString.call(t) || "[object RegExp]" === String.call(t)) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + Buffer$6.byteLength(t.source, "utf8") + 1 + (t.global ? 1 : 0) + (t.ignoreCase ? 1 : 0) + (t.multiline ? 1 : 0) + 1;
                if (r && null != t.scope && 0 < Object.keys(t.scope).length) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + 4 + Buffer$6.byteLength(normalizedFunctionString$2(t), "utf8") + 1 + calculateObjectSize(t.scope, r, o);
                if (r) return (null != e ? Buffer$6.byteLength(e, "utf8") + 1 : 0) + 1 + 4 + Buffer$6.byteLength(normalizedFunctionString$2(t), "utf8") + 1
        }
        return 0
    }
    var calculate_size = calculateObjectSize,
        Buffer$7 = buffer.Buffer,
        ensure_buffer = function(e) {
            if (e instanceof Buffer$7) return e;
            if (e instanceof Uint8Array) return Buffer$7.from(e.buffer);
            throw new TypeError("Must use either Buffer or Uint8Array")
        },
        Buffer$8 = buffer.Buffer,
        MAXSIZE = 17825792,
        buffer$1 = Buffer$8.alloc(MAXSIZE);

    function setInternalBufferSize(e) {
        buffer$1.length < e && (buffer$1 = Buffer$8.alloc(e))
    }

    function serialize$1(e, t) {
        var r = "boolean" == typeof(t = t || {}).checkKeys && t.checkKeys,
            n = "boolean" == typeof t.serializeFunctions && t.serializeFunctions,
            o = "boolean" != typeof t.ignoreUndefined || t.ignoreUndefined,
            i = "number" == typeof t.minInternalBufferSize ? t.minInternalBufferSize : MAXSIZE;
        buffer$1.length < i && (buffer$1 = Buffer$8.alloc(i));
        var s = serializer(buffer$1, e, r, 0, 0, n, o, []),
            u = Buffer$8.alloc(s);
        return buffer$1.copy(u, 0, 0, u.length), u
    }

    function serializeWithBufferAndIndex(e, t, r) {
        var n = "boolean" == typeof(r = r || {}).checkKeys && r.checkKeys,
            o = "boolean" == typeof r.serializeFunctions && r.serializeFunctions,
            i = "boolean" != typeof r.ignoreUndefined || r.ignoreUndefined,
            s = "number" == typeof r.index ? r.index : 0,
            u = serializer(buffer$1, e, n, 0, 0, o, i);
        return buffer$1.copy(t, s, 0, u), s + u - 1
    }

    function deserialize$2(e, t) {
        return e = ensure_buffer(e), deserializer(e, t)
    }

    function calculateObjectSize$1(e, t) {
        var r = "boolean" == typeof(t = t || {}).serializeFunctions && t.serializeFunctions,
            n = "boolean" != typeof t.ignoreUndefined || t.ignoreUndefined;
        return calculate_size(e, r, n)
    }

    function deserializeStream(e, t, r, n, o, i) {
        i = Object.assign({
            allowObjectSmallerThanBufferSize: !0
        }, i), e = ensure_buffer(e);
        for (var s = t, u = 0; u < r; u++) {
            var a = e[s] | e[s + 1] << 8 | e[s + 2] << 16 | e[s + 3] << 24;
            i.index = s, n[o + u] = deserializer(e, i), s += a
        }
        return s
    }
    var bson = {
            BSON_INT32_MAX: constants.BSON_INT32_MAX,
            BSON_INT32_MIN: constants.BSON_INT32_MIN,
            BSON_INT64_MAX: constants.BSON_INT64_MAX,
            BSON_INT64_MIN: constants.BSON_INT64_MIN,
            JS_INT_MAX: constants.JS_INT_MAX,
            JS_INT_MIN: constants.JS_INT_MIN,
            BSON_DATA_NUMBER: constants.BSON_DATA_NUMBER,
            BSON_DATA_STRING: constants.BSON_DATA_STRING,
            BSON_DATA_OBJECT: constants.BSON_DATA_OBJECT,
            BSON_DATA_ARRAY: constants.BSON_DATA_ARRAY,
            BSON_DATA_BINARY: constants.BSON_DATA_BINARY,
            BSON_DATA_UNDEFINED: constants.BSON_DATA_UNDEFINED,
            BSON_DATA_OID: constants.BSON_DATA_OID,
            BSON_DATA_BOOLEAN: constants.BSON_DATA_BOOLEAN,
            BSON_DATA_DATE: constants.BSON_DATA_DATE,
            BSON_DATA_NULL: constants.BSON_DATA_NULL,
            BSON_DATA_REGEXP: constants.BSON_DATA_REGEXP,
            BSON_DATA_DBPOINTER: constants.BSON_DATA_DBPOINTER,
            BSON_DATA_CODE: constants.BSON_DATA_CODE,
            BSON_DATA_SYMBOL: constants.BSON_DATA_SYMBOL,
            BSON_DATA_CODE_W_SCOPE: constants.BSON_DATA_CODE_W_SCOPE,
            BSON_DATA_INT: constants.BSON_DATA_INT,
            BSON_DATA_TIMESTAMP: constants.BSON_DATA_TIMESTAMP,
            BSON_DATA_LONG: constants.BSON_DATA_LONG,
            BSON_DATA_DECIMAL128: constants.BSON_DATA_DECIMAL128,
            BSON_DATA_MIN_KEY: constants.BSON_DATA_MIN_KEY,
            BSON_DATA_MAX_KEY: constants.BSON_DATA_MAX_KEY,
            BSON_BINARY_SUBTYPE_DEFAULT: constants.BSON_BINARY_SUBTYPE_DEFAULT,
            BSON_BINARY_SUBTYPE_FUNCTION: constants.BSON_BINARY_SUBTYPE_FUNCTION,
            BSON_BINARY_SUBTYPE_BYTE_ARRAY: constants.BSON_BINARY_SUBTYPE_BYTE_ARRAY,
            BSON_BINARY_SUBTYPE_UUID: constants.BSON_BINARY_SUBTYPE_UUID,
            BSON_BINARY_SUBTYPE_MD5: constants.BSON_BINARY_SUBTYPE_MD5,
            BSON_BINARY_SUBTYPE_USER_DEFINED: constants.BSON_BINARY_SUBTYPE_USER_DEFINED,
            Code: code$1,
            Map: map,
            BSONSymbol: symbol,
            DBRef: db_ref,
            Binary: binary,
            ObjectId: objectid,
            Long: long_1$1,
            Timestamp: timestamp,
            Double: double_1,
            Int32: int_32,
            MinKey: min_key,
            MaxKey: max_key,
            BSONRegExp: regexp,
            Decimal128: decimal128,
            serialize: serialize$1,
            serializeWithBufferAndIndex: serializeWithBufferAndIndex,
            deserialize: deserialize$2,
            calculateObjectSize: calculateObjectSize$1,
            deserializeStream: deserializeStream,
            setInternalBufferSize: setInternalBufferSize,
            ObjectID: objectid,
            EJSON: extended_json
        },
        bson_54 = bson.EJSON,
        AuthEventKind, wO;
    wO = AuthEventKind || (AuthEventKind = {}), wO[wO.ActiveUserChanged = 0] = "ActiveUserChanged", wO[wO.ListenerRegistered = 1] = "ListenerRegistered", wO[wO.UserAdded = 2] = "UserAdded", wO[wO.UserLinked = 3] = "UserLinked", wO[wO.UserLoggedIn = 4] = "UserLoggedIn", wO[wO.UserLoggedOut = 5] = "UserLoggedOut", wO[wO.UserRemoved = 6] = "UserRemoved";
    var AuthInfo = function() {
            function r(e, t, r, n, o, i, s, u) {
                this.userId = e, this.deviceId = t, this.accessToken = r, this.refreshToken = n, this.loggedInProviderType = o, this.loggedInProviderName = i, this.lastAuthActivity = s, this.userProfile = u
            }
            return r.empty = function() {
                return new r(void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0)
            }, Object.defineProperty(r.prototype, "hasUser", {
                get: function() {
                    return void 0 !== this.userId
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(r.prototype, "isEmpty", {
                get: function() {
                    return void 0 === this.deviceId
                },
                enumerable: !0,
                configurable: !0
            }), r.prototype.loggedOut = function() {
                return new r(this.userId, this.deviceId, void 0, void 0, this.loggedInProviderType, this.loggedInProviderName, new Date, this.userProfile)
            }, r.prototype.withClearedUser = function() {
                return new r(void 0, this.deviceId, void 0, void 0, void 0, void 0, void 0, void 0)
            }, r.prototype.withAuthProvider = function(e, t) {
                return new r(this.userId, this.deviceId, this.accessToken, this.refreshToken, e, t, new Date, this.userProfile)
            }, r.prototype.withNewAuthActivityTime = function() {
                return new r(this.userId, this.deviceId, this.accessToken, this.refreshToken, this.loggedInProviderType, this.loggedInProviderName, new Date, this.userProfile)
            }, Object.defineProperty(r.prototype, "isLoggedIn", {
                get: function() {
                    return void 0 !== this.accessToken && void 0 !== this.refreshToken
                },
                enumerable: !0,
                configurable: !0
            }), r.prototype.merge = function(e) {
                return new r(void 0 === e.userId ? this.userId : e.userId, void 0 === e.deviceId ? this.deviceId : e.deviceId, void 0 === e.accessToken ? this.accessToken : e.accessToken, void 0 === e.refreshToken ? this.refreshToken : e.refreshToken, void 0 === e.loggedInProviderType ? this.loggedInProviderType : e.loggedInProviderType, void 0 === e.loggedInProviderName ? this.loggedInProviderName : e.loggedInProviderName, void 0 === e.lastAuthActivity ? this.lastAuthActivity : e.lastAuthActivity, void 0 === e.userProfile ? this.userProfile : e.userProfile)
            }, r
        }(),
        __extends = (JO = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                JO(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        JO, _Error = function(e) {
            Error.call(this, e), Error.captureStackTrace && Error.captureStackTrace(this), this.message = e, this.name = this.constructor.name
        };
    _Error.prototype = Object.create(Error.prototype);
    var StitchError = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends(t, e), t
        }(_Error),
        _a, VO;
    VO = exports.StitchRequestErrorCode || (exports.StitchRequestErrorCode = {}), VO[VO.TRANSPORT_ERROR = 0] = "TRANSPORT_ERROR", VO[VO.DECODING_ERROR = 1] = "DECODING_ERROR", VO[VO.ENCODING_ERROR = 2] = "ENCODING_ERROR";
    var requestErrorCodeDescs = (_a = {}, _a[exports.StitchRequestErrorCode.TRANSPORT_ERROR] = "the request transport encountered an error communicating with Stitch", _a[exports.StitchRequestErrorCode.DECODING_ERROR] = "an error occurred while decoding a response from Stitch", _a[exports.StitchRequestErrorCode.ENCODING_ERROR] = "an error occurred while encoding a request for Stitch", _a),
        __extends$1 = (WO = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                WO(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        WO, StitchRequestError = function(o) {
            function e(e, t) {
                var r = this,
                    n = "(" + exports.StitchRequestErrorCode[t] + "): " + requestErrorCodeDescs[t] + ": " + e.message;
                return (r = o.call(this, n) || this).underlyingError = e, r.errorCode = t, r.errorCodeName = exports.StitchRequestErrorCode[t], r
            }
            return __extends$1(e, o), e
        }(StitchError),
        jP;
    jP = exports.StitchServiceErrorCode || (exports.StitchServiceErrorCode = {}), jP[jP.MissingAuthReq = 0] = "MissingAuthReq", jP[jP.InvalidSession = 1] = "InvalidSession", jP[jP.UserAppDomainMismatch = 2] = "UserAppDomainMismatch", jP[jP.DomainNotAllowed = 3] = "DomainNotAllowed", jP[jP.ReadSizeLimitExceeded = 4] = "ReadSizeLimitExceeded", jP[jP.InvalidParameter = 5] = "InvalidParameter", jP[jP.MissingParameter = 6] = "MissingParameter", jP[jP.TwilioError = 7] = "TwilioError", jP[jP.GCMError = 8] = "GCMError", jP[jP.HTTPError = 9] = "HTTPError", jP[jP.AWSError = 10] = "AWSError", jP[jP.MongoDBError = 11] = "MongoDBError", jP[jP.ArgumentsNotAllowed = 12] = "ArgumentsNotAllowed", jP[jP.FunctionExecutionError = 13] = "FunctionExecutionError", jP[jP.NoMatchingRuleFound = 14] = "NoMatchingRuleFound", jP[jP.InternalServerError = 15] = "InternalServerError", jP[jP.AuthProviderNotFound = 16] = "AuthProviderNotFound", jP[jP.AuthProviderAlreadyExists = 17] = "AuthProviderAlreadyExists", jP[jP.ServiceNotFound = 18] = "ServiceNotFound", jP[jP.ServiceTypeNotFound = 19] = "ServiceTypeNotFound", jP[jP.ServiceAlreadyExists = 20] = "ServiceAlreadyExists", jP[jP.ServiceCommandNotFound = 21] = "ServiceCommandNotFound", jP[jP.ValueNotFound = 22] = "ValueNotFound", jP[jP.ValueAlreadyExists = 23] = "ValueAlreadyExists", jP[jP.ValueDuplicateName = 24] = "ValueDuplicateName", jP[jP.FunctionNotFound = 25] = "FunctionNotFound", jP[jP.FunctionAlreadyExists = 26] = "FunctionAlreadyExists", jP[jP.FunctionDuplicateName = 27] = "FunctionDuplicateName", jP[jP.FunctionSyntaxError = 28] = "FunctionSyntaxError", jP[jP.FunctionInvalid = 29] = "FunctionInvalid", jP[jP.IncomingWebhookNotFound = 30] = "IncomingWebhookNotFound", jP[jP.IncomingWebhookAlreadyExists = 31] = "IncomingWebhookAlreadyExists", jP[jP.IncomingWebhookDuplicateName = 32] = "IncomingWebhookDuplicateName", jP[jP.RuleNotFound = 33] = "RuleNotFound", jP[jP.ApiKeyNotFound = 34] = "ApiKeyNotFound", jP[jP.RuleAlreadyExists = 35] = "RuleAlreadyExists", jP[jP.RuleDuplicateName = 36] = "RuleDuplicateName", jP[jP.AuthProviderDuplicateName = 37] = "AuthProviderDuplicateName", jP[jP.RestrictedHost = 38] = "RestrictedHost", jP[jP.ApiKeyAlreadyExists = 39] = "ApiKeyAlreadyExists", jP[jP.IncomingWebhookAuthFailed = 40] = "IncomingWebhookAuthFailed", jP[jP.ExecutionTimeLimitExceeded = 41] = "ExecutionTimeLimitExceeded", jP[jP.FunctionNotCallable = 42] = "FunctionNotCallable", jP[jP.UserAlreadyConfirmed = 43] = "UserAlreadyConfirmed", jP[jP.UserNotFound = 44] = "UserNotFound", jP[jP.UserDisabled = 45] = "UserDisabled", jP[jP.Unknown = 46] = "Unknown";
    var apiErrorCodes = {
        APIKeyAlreadyExists: exports.StitchServiceErrorCode.ApiKeyAlreadyExists,
        APIKeyNotFound: exports.StitchServiceErrorCode.ApiKeyNotFound,
        AWSError: exports.StitchServiceErrorCode.AWSError,
        ArgumentsNotAllowed: exports.StitchServiceErrorCode.ArgumentsNotAllowed,
        AuthProviderAlreadyExists: exports.StitchServiceErrorCode.AuthProviderAlreadyExists,
        AuthProviderDuplicateName: exports.StitchServiceErrorCode.AuthProviderDuplicateName,
        AuthProviderNotFound: exports.StitchServiceErrorCode.AuthProviderNotFound,
        DomainNotAllowed: exports.StitchServiceErrorCode.DomainNotAllowed,
        ExecutionTimeLimitExceeded: exports.StitchServiceErrorCode.ExecutionTimeLimitExceeded,
        FunctionAlreadyExists: exports.StitchServiceErrorCode.FunctionAlreadyExists,
        FunctionDuplicateName: exports.StitchServiceErrorCode.FunctionDuplicateName,
        FunctionExecutionError: exports.StitchServiceErrorCode.FunctionExecutionError,
        FunctionInvalid: exports.StitchServiceErrorCode.FunctionInvalid,
        FunctionNotCallable: exports.StitchServiceErrorCode.FunctionNotCallable,
        FunctionNotFound: exports.StitchServiceErrorCode.FunctionNotFound,
        FunctionSyntaxError: exports.StitchServiceErrorCode.FunctionSyntaxError,
        GCMError: exports.StitchServiceErrorCode.GCMError,
        HTTPError: exports.StitchServiceErrorCode.HTTPError,
        IncomingWebhookAlreadyExists: exports.StitchServiceErrorCode.IncomingWebhookAlreadyExists,
        IncomingWebhookAuthFailed: exports.StitchServiceErrorCode.IncomingWebhookAuthFailed,
        IncomingWebhookDuplicateName: exports.StitchServiceErrorCode.IncomingWebhookDuplicateName,
        IncomingWebhookNotFound: exports.StitchServiceErrorCode.IncomingWebhookNotFound,
        InternalServerError: exports.StitchServiceErrorCode.InternalServerError,
        InvalidParameter: exports.StitchServiceErrorCode.InvalidParameter,
        InvalidSession: exports.StitchServiceErrorCode.InvalidSession,
        MissingAuthReq: exports.StitchServiceErrorCode.MissingAuthReq,
        MissingParameter: exports.StitchServiceErrorCode.MissingParameter,
        MongoDBError: exports.StitchServiceErrorCode.MongoDBError,
        NoMatchingRuleFound: exports.StitchServiceErrorCode.NoMatchingRuleFound,
        ReadSizeLimitExceeded: exports.StitchServiceErrorCode.ReadSizeLimitExceeded,
        RestrictedHost: exports.StitchServiceErrorCode.RestrictedHost,
        RuleAlreadyExists: exports.StitchServiceErrorCode.RuleAlreadyExists,
        RuleDuplicateName: exports.StitchServiceErrorCode.RuleDuplicateName,
        RuleNotFound: exports.StitchServiceErrorCode.RuleNotFound,
        ServiceAlreadyExists: exports.StitchServiceErrorCode.ServiceAlreadyExists,
        ServiceCommandNotFound: exports.StitchServiceErrorCode.ServiceCommandNotFound,
        ServiceNotFound: exports.StitchServiceErrorCode.ServiceNotFound,
        ServiceTypeNotFound: exports.StitchServiceErrorCode.ServiceTypeNotFound,
        TwilioError: exports.StitchServiceErrorCode.TwilioError,
        UserAlreadyConfirmed: exports.StitchServiceErrorCode.UserAlreadyConfirmed,
        UserAppDomainMismatch: exports.StitchServiceErrorCode.UserAppDomainMismatch,
        UserDisabled: exports.StitchServiceErrorCode.UserDisabled,
        UserNotFound: exports.StitchServiceErrorCode.UserNotFound,
        ValueAlreadyExists: exports.StitchServiceErrorCode.ValueAlreadyExists,
        ValueDuplicateName: exports.StitchServiceErrorCode.ValueDuplicateName,
        ValueNotFound: exports.StitchServiceErrorCode.ValueNotFound
    };

    function stitchServiceErrorCodeFromApi(e) {
        return e in apiErrorCodes ? apiErrorCodes[e] : exports.StitchServiceErrorCode.Unknown
    }
    var __extends$2 = (lP = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                lP(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        lP, StitchServiceError = function(n) {
            function e(e, t) {
                void 0 === t && (t = exports.StitchServiceErrorCode.Unknown);
                var r = n.call(this, e) || this;
                return r.message = e, r.errorCode = t, r.errorCodeName = exports.StitchServiceErrorCode[t], r
            }
            return __extends$2(e, n), e
        }(StitchError),
        ContentTypes = function() {
            function e() {}
            return e.APPLICATION_JSON = "application/json", e.TEXT_EVENT_STREAM = "text/event-stream", e
        }(),
        Headers = function() {
            function t() {}
            return t.getAuthorizationBearer = function(e) {
                return t.AUTHORIZATION_BEARER + " " + e
            }, t.CONTENT_TYPE = (t.CONTENT_TYPE_CANON = "Content-Type").toLocaleLowerCase(), t.AUTHORIZATION = (t.AUTHORIZATION_CANON = "Authorization").toLocaleLowerCase(), t.ACCEPT = (t.ACCEPT_CANON = "Accept").toLocaleLowerCase(), t.AUTHORIZATION_BEARER = "Bearer", t
        }(),
        Fields, CP, Method, OP;

    function wrapDecodingError(e) {
        return e instanceof StitchError ? e : new StitchRequestError(e, exports.StitchRequestErrorCode.DECODING_ERROR)
    }

    function handleRequestError(t) {
        if (void 0 === t.body) throw new StitchServiceError("received unexpected status code " + t.statusCode, exports.StitchServiceErrorCode.Unknown);
        var e;
        try {
            e = t.body
        } catch (e) {
            throw new StitchServiceError("received unexpected status code " + t.statusCode, exports.StitchServiceErrorCode.Unknown)
        }
        var r = handleRichError(t, e);
        throw new StitchServiceError(r, exports.StitchServiceErrorCode.Unknown)
    }

    function handleRichError(e, t) {
        if (void 0 === e.headers[Headers.CONTENT_TYPE] || void 0 !== e.headers[Headers.CONTENT_TYPE] && e.headers[Headers.CONTENT_TYPE] !== ContentTypes.APPLICATION_JSON) return t;
        var r = JSON.parse(t);
        if (!(r instanceof Object)) return t;
        var n = r;
        if (void 0 === n[Fields.ERROR]) return t;
        var o = n[Fields.ERROR];
        if (void 0 === n[Fields.ERROR_CODE]) return o;
        var i = n[Fields.ERROR_CODE];
        throw new StitchServiceError(o, stitchServiceErrorCodeFromApi(i))
    }
    CP = Fields || (Fields = {}), CP.ERROR = "error", CP.ERROR_CODE = "error_code", OP = Method || (Method = {}), OP.GET = "GET", OP.POST = "POST", OP.PUT = "PUT", OP.DELETE = "DELETE", OP.HEAD = "HEAD", OP.OPTIONS = "OPTIONS", OP.TRACE = "TRACE", OP.PATCH = "PATCH";
    var Method$1 = Method,
        StitchRequest = function() {
            function e(e, t, r, n, o) {
                this.method = e, this.path = t, this.headers = r, this.body = o, this.startedAt = n
            }
            return Object.defineProperty(e.prototype, "builder", {
                get: function() {
                    return new e.Builder(this)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        VP, WP;
    VP = StitchRequest || (StitchRequest = {}), WP = function() {
        function e(e) {
            void 0 !== e && (this.method = e.method, this.path = e.path, this.headers = e.headers, this.body = e.body, this.startedAt = e.startedAt)
        }
        return e.prototype.withMethod = function(e) {
            return this.method = e, this
        }, e.prototype.withPath = function(e) {
            return this.path = e, this
        }, e.prototype.withHeaders = function(e) {
            return this.headers = e, this
        }, e.prototype.withBody = function(e) {
            return this.body = e, this
        }, e.prototype.build = function() {
            if (void 0 === this.method) throw Error("must set method");
            if (void 0 === this.path) throw Error("must set non-empty path");
            return void 0 === this.startedAt && (this.startedAt = Date.now() / 1e3), new VP(this.method, this.path, void 0 === this.headers ? {} : this.headers, this.startedAt, this.body)
        }, e
    }(), VP.Builder = WP;
    var __extends$3 = (bQ = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                bQ(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        bQ, StitchAuthRequest = function(o) {
            function e(e, t, r) {
                void 0 === t && (t = !1), void 0 === r && (r = !0);
                var n = o.call(this, e.method, e.path, e.headers, e.startedAt, e.body) || this;
                return n.useRefreshToken = t, n.shouldRefreshOnFailure = r, n
            }
            return __extends$3(e, o), Object.defineProperty(e.prototype, "builder", {
                get: function() {
                    return new e.Builder(this)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(StitchRequest),
        qQ, rQ;
    qQ = StitchAuthRequest || (StitchAuthRequest = {}), rQ = function(t) {
        function e(e) {
            return t.call(this, e) || this
        }
        return __extends$3(e, t), e.prototype.withAccessToken = function() {
            return this.useRefreshToken = !1, this
        }, e.prototype.withRefreshToken = function() {
            return this.useRefreshToken = !0, this
        }, e.prototype.withShouldRefreshOnFailure = function(e) {
            return this.shouldRefreshOnFailure = e, this
        }, e.prototype.build = function() {
            return this.useRefreshToken && (this.shouldRefreshOnFailure = !1), new qQ(t.prototype.build.call(this), this.useRefreshToken, this.shouldRefreshOnFailure)
        }, e
    }(StitchRequest.Builder), qQ.Builder = rQ;
    var __extends$4 = (wQ = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                wQ(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        wQ, StitchAuthDocRequest = function(n) {
            function e(e, t) {
                var r = this;
                return (r = e instanceof StitchAuthRequest ? n.call(this, e, e.useRefreshToken, e.shouldRefreshOnFailure) || this : n.call(this, e) || this).document = t, r
            }
            return __extends$4(e, n), Object.defineProperty(e.prototype, "builder", {
                get: function() {
                    return new e.Builder(this)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(StitchAuthRequest),
        KQ, LQ;
    KQ = StitchAuthDocRequest || (StitchAuthDocRequest = {}), LQ = function(r) {
        function e(e) {
            var t = r.call(this, e) || this;
            return void 0 !== e && (t.document = e.document, t.useRefreshToken = e.useRefreshToken), t
        }
        return __extends$4(e, r), e.prototype.withDocument = function(e) {
            return this.document = e, this
        }, e.prototype.withAccessToken = function() {
            return this.useRefreshToken = !1, this
        }, e.prototype.build = function() {
            if (void 0 === this.document || !(this.document instanceof Object)) throw new Error("document must be set: " + this.document);
            return void 0 === this.headers && this.withHeaders({}), this.headers[Headers.CONTENT_TYPE] = ContentTypes.APPLICATION_JSON, this.withBody(bson_54.stringify(this.document, {
                relaxed: !1
            })), new KQ(r.prototype.build.call(this), this.document)
        }, e
    }(StitchAuthRequest.Builder), KQ.Builder = LQ;
    var __extends$5 = (RQ = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                RQ(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        RQ, StitchDocRequest = function(n) {
            function e(e, t) {
                var r = n.call(this, e.method, e.path, e.headers, e.startedAt, e.body) || this;
                return r.document = t, r
            }
            return __extends$5(e, n), Object.defineProperty(e.prototype, "builder", {
                get: function() {
                    return new e.Builder(this)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(StitchRequest),
        dR, eR, _a$1, kR;
    dR = StitchDocRequest || (StitchDocRequest = {}), eR = function(r) {
        function e(e) {
            var t = r.call(this, e) || this;
            return void 0 !== e && (t.document = e.document), t
        }
        return __extends$5(e, r), e.prototype.withDocument = function(e) {
            return this.document = e, this
        }, e.prototype.build = function() {
            if (void 0 === this.document || !(this.document instanceof Object)) throw new Error("document must be set");
            return void 0 === this.headers && this.withHeaders({}), this.headers[Headers.CONTENT_TYPE] = ContentTypes.APPLICATION_JSON, this.withBody(bson_54.stringify(this.document, {
                relaxed: !1
            })), new dR(r.prototype.build.call(this), this.document)
        }, e
    }(StitchRequest.Builder), dR.Builder = eR, kR = exports.StitchClientErrorCode || (exports.StitchClientErrorCode = {}), kR[kR.LoggedOutDuringRequest = 0] = "LoggedOutDuringRequest", kR[kR.MustAuthenticateFirst = 1] = "MustAuthenticateFirst", kR[kR.UserNoLongerValid = 2] = "UserNoLongerValid", kR[kR.UserNotFound = 3] = "UserNotFound", kR[kR.UserNotLoggedIn = 4] = "UserNotLoggedIn", kR[kR.CouldNotLoadPersistedAuthInfo = 5] = "CouldNotLoadPersistedAuthInfo", kR[kR.CouldNotPersistAuthInfo = 6] = "CouldNotPersistAuthInfo", kR[kR.StreamingNotSupported = 7] = "StreamingNotSupported", kR[kR.StreamClosed = 8] = "StreamClosed", kR[kR.UnexpectedArguments = 9] = "UnexpectedArguments";
    var clientErrorCodeDescs = (_a$1 = {}, _a$1[exports.StitchClientErrorCode.LoggedOutDuringRequest] = "logged out while making a request to Stitch", _a$1[exports.StitchClientErrorCode.MustAuthenticateFirst] = "method called requires being authenticated", _a$1[exports.StitchClientErrorCode.UserNoLongerValid] = "user instance being accessed is no longer valid; please get a new user with auth.getUser()", _a$1[exports.StitchClientErrorCode.UserNotFound] = "user not found in list of users", _a$1[exports.StitchClientErrorCode.UserNotLoggedIn] = "cannot make the active user a logged out user; please use loginWithCredential() to switch to this user", _a$1[exports.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo] = "failed to load stored auth information for Stitch", _a$1[exports.StitchClientErrorCode.CouldNotPersistAuthInfo] = "failed to save auth information for Stitch", _a$1[exports.StitchClientErrorCode.StreamingNotSupported] = "streaming not supported in this SDK", _a$1[exports.StitchClientErrorCode.StreamClosed] = "stream is closed", _a$1[exports.StitchClientErrorCode.UnexpectedArguments] = "function does not accept arguments", _a$1),
        __extends$6 = (lR = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                lR(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        lR, StitchClientError = function(n) {
            function e(e) {
                var t = this,
                    r = "(" + exports.StitchClientErrorCode[e] + "): " + clientErrorCodeDescs[e];
                return (t = n.call(this, r) || this).errorCode = e, t.errorCodeName = exports.StitchClientErrorCode[e], t
            }
            return __extends$6(e, n), e
        }(StitchError),
        Event = function() {
            function e(e, t) {
                this.eventName = e, this.data = t
            }
            return e.MESSAGE_EVENT = "message", e
        }(),
        StitchEvent = function() {
            function h(e, t, r) {
                this.eventName = e, t = t || "";
                for (var n = [], o = 0; o < t.length; o++) {
                    var i = t[o];
                    switch (i) {
                        case "%":
                            if (o + 2 >= t.length) break;
                            var s = void 0;
                            switch (t.substring(o + 1, o + 3)) {
                                case "25":
                                    s = !0, n.push("%");
                                    break;
                                case "0A":
                                    s = !0, n.push("\n");
                                    break;
                                case "0D":
                                    s = !0, n.push("\r");
                                    break;
                                default:
                                    s = !1
                            }
                            if (s) {
                                o += 2;
                                continue
                            }
                    }
                    n.push(i)
                }
                var u = n.join("");
                switch (this.eventName) {
                    case h.ERROR_EVENT_NAME:
                        var a = void 0,
                            c = void 0;
                        try {
                            var f = bson_54.parse(u, {
                                strict: !1
                            });
                            a = f[ErrorFields.Error], c = stitchServiceErrorCodeFromApi(f[ErrorFields.ErrorCode])
                        } catch (e) {
                            a = u, c = exports.StitchServiceErrorCode.Unknown
                        }
                        this.error = new StitchServiceError(a, c);
                        break;
                    case Event.MESSAGE_EVENT:
                        this.data = bson_54.parse(u, {
                            strict: !1
                        }), r && (this.data = r.decode(this.data))
                }
            }
            return h.fromEvent = function(e, t) {
                return new h(e.eventName, e.data, t)
            }, h.ERROR_EVENT_NAME = "error", h
        }(),
        ErrorFields, SR;
    SR = ErrorFields || (ErrorFields = {}), SR.Error = "error", SR.ErrorCode = "error_code";
    var Stream = function() {
            function e(e, t) {
                this.eventStream = e, this.decoder = t, this.listeners = []
            }
            return e.prototype.next = function() {
                var r = this;
                return this.eventStream.nextEvent().then(function(e) {
                    var t = StitchEvent.fromEvent(e, r.decoder);
                    if (t.eventName === StitchEvent.ERROR_EVENT_NAME) throw t.error;
                    return t.eventName === Event.MESSAGE_EVENT ? t.data : r.next()
                })
            }, e.prototype.onNext = function(r) {
                var n = this,
                    e = {
                        onEvent: function(e) {
                            var t = StitchEvent.fromEvent(e, n.decoder);
                            t.eventName === Event.MESSAGE_EVENT && r(t.data)
                        }
                    };
                this.eventStream.addListener(e)
            }, e.prototype.onError = function(r) {
                var n = this,
                    e = {
                        onEvent: function(e) {
                            var t = StitchEvent.fromEvent(e, n.decoder);
                            t.eventName === StitchEvent.ERROR_EVENT_NAME && r(t.error)
                        }
                    };
                this.eventStream.addListener(e)
            }, e.prototype.addListener = function(r) {
                var n = this,
                    e = {
                        onEvent: function(e) {
                            var t = StitchEvent.fromEvent(e, n.decoder);
                            t.eventName === StitchEvent.ERROR_EVENT_NAME ? r.onError && r.onError(t.error) : r.onNext && r.onNext(t.data)
                        }
                    };
                this.listeners.push([r, e]), this.eventStream.addListener(e)
            }, e.prototype.removeListener = function(e) {
                for (var t = -1, r = 0; r < this.listeners.length; r++)
                    if (this.listeners[r][0] === e) {
                        t = r;
                        break
                    } if (-1 !== t) {
                    var n = this.listeners[t][1];
                    this.listeners.splice(t, 1), this.eventStream.removeListener(n)
                }
            }, e.prototype.isOpen = function() {
                return this.eventStream.isOpen()
            }, e.prototype.close = function() {
                this.eventStream.close()
            }, e
        }(),
        NAME = "name",
        EMAIL = "email",
        PICTURE_URL = "picture",
        FIRST_NAME = "first_name",
        LAST_NAME = "last_name",
        GENDER = "gender",
        BIRTHDAY = "birthday",
        MIN_AGE = "min_age",
        MAX_AGE = "max_age",
        StitchUserProfileImpl = function() {
            function e(e, t, r) {
                void 0 === t && (t = {}), void 0 === r && (r = []), this.userType = e, this.data = t, this.identities = r
            }
            return e.empty = function() {
                return new e
            }, Object.defineProperty(e.prototype, "name", {
                get: function() {
                    return this.data[NAME]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "email", {
                get: function() {
                    return this.data[EMAIL]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "pictureUrl", {
                get: function() {
                    return this.data[PICTURE_URL]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "firstName", {
                get: function() {
                    return this.data[FIRST_NAME]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "lastName", {
                get: function() {
                    return this.data[LAST_NAME]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "gender", {
                get: function() {
                    return this.data[GENDER]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "birthday", {
                get: function() {
                    return this.data[BIRTHDAY]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "minAge", {
                get: function() {
                    var e = this.data[MIN_AGE];
                    if (void 0 !== e) return e
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "maxAge", {
                get: function() {
                    var e = this.data[MAX_AGE];
                    if (void 0 !== e) return e
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        CoreStitchUserImpl = function() {
            function e(e, t, r, n, o, i, s) {
                this.id = e, this.loggedInProviderType = t, this.loggedInProviderName = r, this.profile = void 0 === i ? StitchUserProfileImpl.empty() : i, this.isLoggedIn = n, this.lastAuthActivity = o, this.customData = void 0 === s ? {} : s
            }
            return Object.defineProperty(e.prototype, "userType", {
                get: function() {
                    return this.profile.userType
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "identities", {
                get: function() {
                    return this.profile.identities
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.equals = function(e) {
                return this.id === e.id && JSON.stringify(this.identities) === JSON.stringify(e.identities) && this.isLoggedIn === e.isLoggedIn && this.loggedInProviderName === e.loggedInProviderName && this.loggedInProviderType === e.loggedInProviderType && JSON.stringify(this.profile) === JSON.stringify(e.profile)
            }, e
        }(),
        AnonymousAuthProvider = function() {
            function e() {}
            return e.TYPE = "anon-user", e.DEFAULT_NAME = "anon-user", e
        }(),
        StitchAuthResponseCredential = function(e, t, r, n) {
            this.authInfo = e, this.providerType = t, this.providerName = r, this.asLink = n
        };

    function base64Decode(e) {
        var t, r = e.length % 4;
        0 != r ? t = e + "=".repeat(4 - r) : t = e;
        var n = toByteArray_1(t);
        return utf8Slice$1(n, 0, n.length)
    }

    function base64Encode(e) {
        var t;
        return "undefined" == typeof Uint8Array && (t = utf8ToBytes$1(e)), t = new Uint8Array(utf8ToBytes$1(e)), fromByteArray_1(t)
    }

    function utf8ToBytes$1(e) {
        for (var t, r = 1 / 0, n = e.length, o = null, i = [], s = 0; s < n; s++) {
            if (55295 < (t = e.charCodeAt(s)) && t < 57344) {
                if (!o) {
                    if (56319 < t) {
                        -1 < (r -= 3) && i.push(239, 191, 189);
                        continue
                    }
                    if (s + 1 === n) {
                        -1 < (r -= 3) && i.push(239, 191, 189);
                        continue
                    }
                    o = t;
                    continue
                }
                if (t < 56320) {
                    -1 < (r -= 3) && i.push(239, 191, 189), o = t;
                    continue
                }
                t = o - 55296 << 10 | t - 56320 | 65536, o = null
            } else o && (-1 < (r -= 3) && i.push(239, 191, 189), o = null);
            if (t < 128) {
                if ((r -= 1) < 0) break;
                i.push(t)
            } else if (t < 2048) {
                if ((r -= 2) < 0) break;
                i.push(t >> 6 | 192, 63 & t | 128)
            } else if (t < 65536) {
                if ((r -= 3) < 0) break;
                i.push(t >> 12 | 224, t >> 6 & 63 | 128, 63 & t | 128)
            } else {
                if (!(t < 2097152)) throw new Error("Invalid code point");
                if ((r -= 4) < 0) break;
                i.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, 63 & t | 128)
            }
        }
        return i
    }

    function utf8Slice$1(e, t, r) {
        var n = "",
            o = "";
        r = Math.min(e.length, r || 1 / 0);
        for (var i = t = t || 0; i < r; i++) e[i] <= 127 ? (n += decodeUtf8Char(o) + String.fromCharCode(e[i]), o = "") : o += "%" + e[i].toString(16);
        return n + decodeUtf8Char(o)
    }

    function decodeUtf8Char(e) {
        try {
            return decodeURIComponent(e)
        } catch (e) {
            return String.fromCharCode(65533)
        }
    }
    var EXPIRES = "exp",
        ISSUED_AT = "iat",
        USER_DATA = "user_data",
        JWT = function() {
            function n(e, t, r) {
                this.expires = e, this.issuedAt = t, this.userData = r
            }
            return n.fromEncoded = function(e) {
                var t = n.splitToken(e),
                    r = JSON.parse(base64Decode(t[1]));
                return new n(r[EXPIRES], r[ISSUED_AT], r[USER_DATA])
            }, n.splitToken = function(e) {
                var t = e.split(".");
                if (3 !== t.length) throw new Error("Malformed JWT token. The string " + e + " should have 3 parts.");
                return t
            }, n
        }(),
        SLEEP_MILLIS = 6e4,
        EXPIRATION_WINDOW_SECS = 300,
        AccessTokenRefresher = function() {
            function e(e) {
                this.auth = e
            }
            return e.prototype.shouldRefresh = function() {
                var e = this.auth;
                if (void 0 === e) return !1;
                if (!e.isLoggedIn) return !1;
                var t, r = e.authInfo;
                if (void 0 === r) return !1;
                if (!r.isLoggedIn) return !1;
                try {
                    t = JWT.fromEncoded(r.accessToken)
                } catch (e) {
                    return console.log(e), !1
                }
                return !(Date.now() / 1e3 < t.expires - EXPIRATION_WINDOW_SECS)
            }, e.prototype.run = function() {
                var e = this;
                this.shouldRefresh() ? this.auth.refreshAccessToken().then(function() {
                    e.nextTimeout = setTimeout(function() {
                        return e.run()
                    }, SLEEP_MILLIS)
                }).catch(function() {
                    e.nextTimeout = setTimeout(function() {
                        return e.run()
                    }, SLEEP_MILLIS)
                }) : this.nextTimeout = setTimeout(function() {
                    return e.run()
                }, SLEEP_MILLIS)
            }, e.prototype.stop = function() {
                clearTimeout(this.nextTimeout)
            }, e
        }(),
        __extends$7 = (yT = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                yT(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        yT, Fields$1, HT;
    HT = Fields$1 || (Fields$1 = {}), HT.USER_ID = "user_id", HT.DEVICE_ID = "device_id", HT.ACCESS_TOKEN = "access_token", HT.REFRESH_TOKEN = "refresh_token";
    var ApiAuthInfo = function(o) {
            function t(e, t, r, n) {
                return o.call(this, e, t, r, n) || this
            }
            return __extends$7(t, o), t.fromJSON = function(e) {
                return new t(e[Fields$1.USER_ID], e[Fields$1.DEVICE_ID], e[Fields$1.ACCESS_TOKEN], e[Fields$1.REFRESH_TOKEN])
            }, t.prototype.toJSON = function() {
                var e;
                return (e = {})[Fields$1.USER_ID] = this.userId, e[Fields$1.DEVICE_ID] = this.deviceId, e[Fields$1.ACCESS_TOKEN] = this.accessToken, e[Fields$1.REFRESH_TOKEN] = this.refreshToken, e
            }, t
        }(AuthInfo),
        Assertions = function() {
            function e() {}
            return e.keyPresent = function(e, t) {
                if (void 0 === t[e]) throw new Error("expected " + e + " to be present")
            }, e
        }(),
        StitchUserIdentity = function(e, t) {
            this.id = e, this.providerType = t
        },
        __extends$8 = (WT = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                WT(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        WT, Fields$2, dU;
    dU = Fields$2 || (Fields$2 = {}), dU.ID = "id", dU.PROVIDER_TYPE = "provider_type";
    var ApiStitchUserIdentity = function(r) {
            function t(e, t) {
                return r.call(this, e, t) || this
            }
            return __extends$8(t, r), t.fromJSON = function(e) {
                return new t(e[Fields$2.ID], e[Fields$2.PROVIDER_TYPE])
            }, t.prototype.toJSON = function() {
                var e;
                return (e = {})[Fields$2.ID] = this.id, e[Fields$2.PROVIDER_TYPE] = this.providerType, e
            }, t
        }(StitchUserIdentity),
        __extends$9 = (kU = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                kU(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        kU, Fields$3, tU;
    tU = Fields$3 || (Fields$3 = {}), tU.DATA = "data", tU.USER_TYPE = "type", tU.IDENTITIES = "identities";
    var ApiCoreUserProfile = function(n) {
            function t(e, t, r) {
                return n.call(this, e, t, r) || this
            }
            return __extends$9(t, n), t.fromJSON = function(e) {
                return Assertions.keyPresent(Fields$3.USER_TYPE, e), Assertions.keyPresent(Fields$3.DATA, e), Assertions.keyPresent(Fields$3.IDENTITIES, e), new t(e[Fields$3.USER_TYPE], e[Fields$3.DATA], e[Fields$3.IDENTITIES].map(ApiStitchUserIdentity.fromJSON))
            }, t.prototype.toJSON = function() {
                var e;
                return (e = {})[Fields$3.DATA] = this.data, e[Fields$3.USER_TYPE] = this.userType, e[Fields$3.IDENTITIES] = this.identities, e
            }, t
        }(StitchUserProfileImpl),
        __extends$a = (BU = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                BU(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        BU, Fields$4, KU;
    KU = Fields$4 || (Fields$4 = {}), KU.ID = "id", KU.PROVIDER_TYPE = "provider_type";
    var StoreStitchUserIdentity = function(r) {
            function t(e, t) {
                return r.call(this, e, t) || this
            }
            return __extends$a(t, r), t.decode = function(e) {
                return new t(e[Fields$4.ID], e[Fields$4.PROVIDER_TYPE])
            }, t.prototype.encode = function() {
                var e;
                return (e = {})[Fields$4.ID] = this.id, e[Fields$4.PROVIDER_TYPE] = this.providerType, e
            }, t
        }(StitchUserIdentity),
        __extends$b = (RU = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                RU(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        RU, Fields$5, $U;
    $U = Fields$5 || (Fields$5 = {}), $U.DATA = "data", $U.USER_TYPE = "type", $U.IDENTITIES = "identities";
    var StoreCoreUserProfile = function(o) {
            function t(e, t, r) {
                var n = o.call(this, e, t, r) || this;
                return n.userType = e, n.data = t, n.identities = r, n
            }
            return __extends$b(t, o), t.decode = function(e) {
                return e ? new t(e[Fields$5.USER_TYPE], e[Fields$5.DATA], e[Fields$5.IDENTITIES].map(function(e) {
                    return StoreStitchUserIdentity.decode(e)
                })) : void 0
            }, t.prototype.encode = function() {
                var e;
                return (e = {})[Fields$5.DATA] = this.data, e[Fields$5.USER_TYPE] = this.userType, e[Fields$5.IDENTITIES] = this.identities.map(function(e) {
                    return e.encode()
                }), e
            }, t
        }(StitchUserProfileImpl),
        __extends$c = (jV = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                jV(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        jV, Fields$6, sV;

    function readActiveUserFromStorage(e) {
        var t = e.get(StoreAuthInfo.ACTIVE_USER_STORAGE_NAME);
        if (t) return StoreAuthInfo.decode(JSON.parse(t))
    }

    function readCurrentUsersFromStorage(e) {
        var t = e.get(StoreAuthInfo.ALL_USERS_STORAGE_NAME);
        if (!t) return new Map;
        var r = JSON.parse(t);
        if (!Array.isArray(r)) throw new StitchClientError(exports.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo);
        var n = new Map;
        return r.forEach(function(e) {
            var t = StoreAuthInfo.decode(e);
            n.set(t.userId, t)
        }), n
    }

    function writeActiveUserAuthInfoToStorage(e, t) {
        if (e.isEmpty) t.remove(StoreAuthInfo.ACTIVE_USER_STORAGE_NAME);
        else {
            var r = new StoreAuthInfo(e.userId, e.deviceId, e.accessToken, e.refreshToken, e.loggedInProviderType, e.loggedInProviderName, e.lastAuthActivity, e.userProfile ? new StoreCoreUserProfile(e.userProfile.userType, e.userProfile.data, e.userProfile.identities.map(function(e) {
                return new StoreStitchUserIdentity(e.id, e.providerType)
            })) : void 0);
            t.set(StoreAuthInfo.ACTIVE_USER_STORAGE_NAME, JSON.stringify(r.encode()))
        }
    }

    function writeAllUsersAuthInfoToStorage(e, t) {
        var n = [];
        e.forEach(function(e, t) {
            var r = new StoreAuthInfo(t, e.deviceId, e.accessToken, e.refreshToken, e.loggedInProviderType, e.loggedInProviderName, e.lastAuthActivity, e.userProfile ? new StoreCoreUserProfile(e.userProfile.userType, e.userProfile.data, e.userProfile.identities.map(function(e) {
                return new StoreStitchUserIdentity(e.id, e.providerType)
            })) : void 0);
            n.push(r.encode())
        }), t.set(StoreAuthInfo.ALL_USERS_STORAGE_NAME, JSON.stringify(n))
    }
    sV = Fields$6 || (Fields$6 = {}), sV.USER_ID = "user_id", sV.DEVICE_ID = "device_id", sV.ACCESS_TOKEN = "access_token", sV.REFRESH_TOKEN = "refresh_token", sV.LAST_AUTH_ACTIVITY = "last_auth_activity", sV.LOGGED_IN_PROVIDER_TYPE = "logged_in_provider_type", sV.LOGGED_IN_PROVIDER_NAME = "logged_in_provider_name", sV.USER_PROFILE = "user_profile";
    var StoreAuthInfo = function(c) {
            function f(e, t, r, n, o, i, s, u) {
                var a = c.call(this, e, t, r, n, o, i, s, u) || this;
                return a.userProfile = u, a
            }
            return __extends$c(f, c), f.decode = function(e) {
                var t = e[Fields$6.USER_ID],
                    r = e[Fields$6.DEVICE_ID],
                    n = e[Fields$6.ACCESS_TOKEN],
                    o = e[Fields$6.REFRESH_TOKEN],
                    i = e[Fields$6.LOGGED_IN_PROVIDER_TYPE],
                    s = e[Fields$6.LOGGED_IN_PROVIDER_NAME],
                    u = e[Fields$6.USER_PROFILE],
                    a = e[Fields$6.LAST_AUTH_ACTIVITY];
                return new f(t, r, n, o, i, s, new Date(a), StoreCoreUserProfile.decode(u))
            }, f.prototype.encode = function() {
                var e = {};
                return e[Fields$6.USER_ID] = this.userId, e[Fields$6.ACCESS_TOKEN] = this.accessToken, e[Fields$6.REFRESH_TOKEN] = this.refreshToken, e[Fields$6.DEVICE_ID] = this.deviceId, e[Fields$6.LOGGED_IN_PROVIDER_NAME] = this.loggedInProviderName, e[Fields$6.LOGGED_IN_PROVIDER_TYPE] = this.loggedInProviderType, e[Fields$6.LAST_AUTH_ACTIVITY] = this.lastAuthActivity ? this.lastAuthActivity.getTime() : void 0, e[Fields$6.USER_PROFILE] = this.userProfile ? this.userProfile.encode() : void 0, e
            }, f.ACTIVE_USER_STORAGE_NAME = "auth_info", f.ALL_USERS_STORAGE_NAME = "all_auth_infos", f
        }(AuthInfo),
        __values = function(e) {
            var t = "function" == typeof Symbol && e[Symbol.iterator],
                r = 0;
            return t ? t.call(e) : {
                next: function() {
                    return e && r >= e.length && (e = void 0), {
                        value: e && e[r++],
                        done: !e
                    }
                }
            }
        },
        __read = function(e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e),
                s = [];
            try {
                for (;
                    (void 0 === t || 0 < t--) && !(n = i.next()).done;) s.push(n.value)
            } catch (e) {
                o = {
                    error: e
                }
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return s
        },
        OPTIONS = "options",
        DEVICE = "device",
        CoreStitchAuth = function() {
            function e(e, t, r, n) {
                var o, i;
                void 0 === n && (n = !0), this.requestClient = e, this.authRoutes = t, this.storage = r;
                try {
                    o = readCurrentUsersFromStorage(r)
                } catch (e) {
                    throw new StitchClientError(exports.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo)
                }
                this.allUsersAuthInfo = o;
                try {
                    i = readActiveUserFromStorage(r)
                } catch (e) {
                    throw new StitchClientError(exports.StitchClientErrorCode.CouldNotLoadPersistedAuthInfo)
                }
                this.activeUserAuthInfo = void 0 === i ? AuthInfo.empty() : i, this.activeUserAuthInfo.hasUser && (this.currentUser = this.prepUser(this.activeUserAuthInfo)), n && (this.accessTokenRefresher = new AccessTokenRefresher(this), this.accessTokenRefresher.run())
            }
            return Object.defineProperty(e.prototype, "authInfo", {
                get: function() {
                    return this.activeUserAuthInfo
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "isLoggedIn", {
                get: function() {
                    return void 0 !== this.currentUser && this.currentUser.isLoggedIn
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "user", {
                get: function() {
                    return this.currentUser
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "hasDeviceId", {
                get: function() {
                    return void 0 !== this.activeUserAuthInfo.deviceId && "" !== this.activeUserAuthInfo.deviceId && "000000000000000000000000" !== this.activeUserAuthInfo.deviceId
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "deviceId", {
                get: function() {
                    if (this.hasDeviceId) return this.activeUserAuthInfo.deviceId
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.listUsers = function() {
                var t = this,
                    r = [];
                return this.allUsersAuthInfo.forEach(function(e) {
                    r.push(t.prepUser(e))
                }), r
            }, e.prototype.doAuthenticatedRequest = function(t, e) {
                var r = this;
                try {
                    return this.requestClient.doRequest(this.prepareAuthRequest(t, e || this.activeUserAuthInfo)).catch(function(e) {
                        return r.handleAuthFailure(e, t)
                    })
                } catch (e) {
                    return Promise.reject(e)
                }
            }, e.prototype.doAuthenticatedRequestWithDecoder = function(e, r) {
                return this.doAuthenticatedRequest(e).then(function(e) {
                    var t = bson_54.parse(e.body, {
                        strict: !1
                    });
                    return r ? r.decode(t) : t
                }).catch(function(e) {
                    throw wrapDecodingError(e)
                })
            }, e.prototype.openAuthenticatedEventStream = function(t, r) {
                var n = this;
                if (void 0 === r && (r = !0), !this.isLoggedIn) throw new StitchClientError(exports.StitchClientErrorCode.MustAuthenticateFirst);
                var e = t.useRefreshToken ? this.activeUserAuthInfo.refreshToken : this.activeUserAuthInfo.accessToken;
                return this.requestClient.doStreamRequest(t.builder.withPath(t.path + "&stitch_at=" + e).build(), r, function() {
                    return n.openAuthenticatedEventStream(t, !1)
                }).catch(function(e) {
                    return n.handleAuthFailureForEventStream(e, t, r)
                })
            }, e.prototype.openAuthenticatedStreamWithDecoder = function(e, t) {
                return this.openAuthenticatedEventStream(e).then(function(e) {
                    return new Stream(e, t)
                })
            }, e.prototype.refreshAccessToken = function() {
                var n = this,
                    e = (new StitchAuthRequest.Builder).withRefreshToken().withPath(this.authRoutes.sessionRoute).withMethod(Method$1.POST);
                return this.doAuthenticatedRequest(e.build()).then(function(e) {
                    try {
                        var t = ApiAuthInfo.fromJSON(JSON.parse(e.body));
                        if (n.activeUserAuthInfo = n.activeUserAuthInfo.merge(t), t.accessToken && n.user instanceof CoreStitchUserImpl) {
                            var r = JWT.fromEncoded(t.accessToken).userData;
                            n.user.customData = void 0 === r ? {} : r
                        }
                    } catch (e) {
                        throw new StitchRequestError(e, exports.StitchRequestErrorCode.DECODING_ERROR)
                    }
                    try {
                        writeActiveUserAuthInfoToStorage(n.activeUserAuthInfo, n.storage), n.allUsersAuthInfo.set(n.activeUserAuthInfo.userId, n.activeUserAuthInfo), writeAllUsersAuthInfoToStorage(n.allUsersAuthInfo, n.storage)
                    } catch (e) {
                        throw new StitchClientError(exports.StitchClientErrorCode.CouldNotPersistAuthInfo)
                    }
                })
            }, e.prototype.switchToUserWithId = function(e) {
                var t = this.allUsersAuthInfo.get(e);
                if (void 0 === t) throw new StitchClientError(exports.StitchClientErrorCode.UserNotFound);
                if (!t.isLoggedIn) throw new StitchClientError(exports.StitchClientErrorCode.UserNotLoggedIn);
                this.activeUserAuthInfo.hasUser && this.allUsersAuthInfo.set(this.activeUserAuthInfo.userId, this.activeUserAuthInfo.withNewAuthActivityTime());
                var r = t.withNewAuthActivityTime();
                this.allUsersAuthInfo.set(e, r), writeActiveUserAuthInfoToStorage(r, this.storage), this.activeUserAuthInfo = r;
                var n = this.currentUser;
                return this.currentUser = this.prepUser(r), this.onAuthEvent(), this.dispatchAuthEvent({
                    currentActiveUser: this.currentUser,
                    kind: AuthEventKind.ActiveUserChanged,
                    previousActiveUser: n
                }), this.currentUser
            }, e.prototype.loginWithCredentialInternal = function(e) {
                var t, r, n = this;
                if (e instanceof StitchAuthResponseCredential) return this.processLogin(e, e.authInfo, e.asLink).then(function(e) {
                    return n.dispatchAuthEvent({
                        kind: AuthEventKind.UserLoggedIn,
                        loggedInUser: e
                    }), e
                });
                if (e.providerCapabilities.reusesExistingSession) try {
                    for (var o = __values(this.allUsersAuthInfo), i = o.next(); !i.done; i = o.next()) {
                        var s = __read(i.value, 2),
                            u = s[0],
                            a = s[1];
                        if (a.loggedInProviderType === e.providerType) {
                            if (a.isLoggedIn) try {
                                return Promise.resolve(this.switchToUserWithId(u))
                            } catch (e) {
                                return Promise.reject(e)
                            }
                            void 0 !== a.userId && this.removeUserWithIdInternal(a.userId)
                        }
                    }
                } catch (e) {
                    t = {
                        error: e
                    }
                } finally {
                    try {
                        i && !i.done && (r = o.return) && r.call(o)
                    } finally {
                        if (t) throw t.error
                    }
                }
                return this.doLogin(e, !1)
            }, e.prototype.linkUserWithCredentialInternal = function(e, t) {
                return void 0 !== this.currentUser && e.id !== this.currentUser.id ? Promise.reject(new StitchClientError(exports.StitchClientErrorCode.UserNoLongerValid)) : this.doLogin(t, !0)
            }, e.prototype.logoutInternal = function() {
                return this.isLoggedIn && this.currentUser ? this.logoutUserWithIdInternal(this.currentUser.id) : Promise.resolve()
            }, e.prototype.logoutUserWithIdInternal = function(e) {
                var t = this,
                    r = this.allUsersAuthInfo.get(e);
                if (void 0 === r) return Promise.reject(new StitchClientError(exports.StitchClientErrorCode.UserNotFound));
                if (!r.isLoggedIn) return Promise.resolve();
                var n = function() {
                    t.clearUserAuthTokens(r.userId), r.loggedInProviderType === AnonymousAuthProvider.TYPE && t.removeUserWithIdInternal(r.userId)
                };
                return this.doLogout(r).then(function() {
                    n()
                }).catch(function() {
                    n()
                })
            }, e.prototype.removeUserInternal = function() {
                return this.isLoggedIn && void 0 !== this.currentUser ? this.removeUserWithIdInternal(this.currentUser.id) : Promise.resolve()
            }, e.prototype.removeUserWithIdInternal = function(t) {
                var r = this,
                    n = this.allUsersAuthInfo.get(t);
                if (void 0 === n) return Promise.reject(new StitchClientError(exports.StitchClientErrorCode.UserNotFound));
                var o = function() {
                    r.clearUserAuthTokens(n.userId), r.allUsersAuthInfo.delete(t), writeAllUsersAuthInfoToStorage(r.allUsersAuthInfo, r.storage);
                    var e = r.prepUser(n.loggedOut());
                    r.onAuthEvent(), r.dispatchAuthEvent({
                        kind: AuthEventKind.UserRemoved,
                        removedUser: e
                    })
                };
                return n.isLoggedIn ? this.doLogout(n).then(function() {
                    o()
                }).catch(function(e) {
                    o()
                }) : (o(), Promise.resolve())
            }, e.prototype.close = function() {
                this.accessTokenRefresher && this.accessTokenRefresher.stop()
            }, e.prototype.prepareAuthRequest = function(e, t) {
                if (!t.isLoggedIn) throw new StitchClientError(exports.StitchClientErrorCode.MustAuthenticateFirst);
                var r = e.builder,
                    n = r.headers || {};
                return e.useRefreshToken ? n[Headers.AUTHORIZATION] = Headers.getAuthorizationBearer(t.refreshToken) : n[Headers.AUTHORIZATION] = Headers.getAuthorizationBearer(t.accessToken), r.withHeaders(n), r.build()
            }, e.prototype.handleAuthFailureForEventStream = function(e, t, r) {
                var n = this;
                if (void 0 === r && (r = !0), !(e instanceof StitchServiceError) || e.errorCode !== exports.StitchServiceErrorCode.InvalidSession) throw e;
                if (t.useRefreshToken || !t.shouldRefreshOnFailure) throw this.clearActiveUserAuth(), e;
                return this.tryRefreshAccessToken(t.startedAt).then(function() {
                    return n.openAuthenticatedEventStream(t.builder.withShouldRefreshOnFailure(!1).build(), r)
                })
            }, e.prototype.handleAuthFailure = function(e, t) {
                var r = this;
                if (!(e instanceof StitchServiceError) || e.errorCode !== exports.StitchServiceErrorCode.InvalidSession) throw e;
                if (t.useRefreshToken || !t.shouldRefreshOnFailure) throw this.clearActiveUserAuth(), e;
                return this.tryRefreshAccessToken(t.startedAt).then(function() {
                    return r.doAuthenticatedRequest(t.builder.withShouldRefreshOnFailure(!1).build())
                })
            }, e.prototype.tryRefreshAccessToken = function(e) {
                if (!this.isLoggedIn) throw new StitchClientError(exports.StitchClientErrorCode.LoggedOutDuringRequest);
                try {
                    if (JWT.fromEncoded(this.activeUserAuthInfo.accessToken).issuedAt >= e) return Promise.resolve()
                } catch (e) {}
                return this.refreshAccessToken()
            }, e.prototype.prepUser = function(e) {
                return this.userFactory.makeUser(e.userId, e.loggedInProviderType, e.loggedInProviderName, e.isLoggedIn, e.lastAuthActivity, e.userProfile)
            }, e.prototype.attachAuthOptions = function(e) {
                var t = {};
                t[DEVICE] = this.deviceInfo, e[OPTIONS] = t
            }, e.prototype.doLogin = function(t, r) {
                var n = this,
                    o = this.currentUser;
                return this.doLoginRequest(t, r).then(function(e) {
                    return n.processLoginResponse(t, e, r)
                }).then(function(e) {
                    return n.onAuthEvent(), r ? n.dispatchAuthEvent({
                        kind: AuthEventKind.UserLinked,
                        linkedUser: e
                    }) : (n.dispatchAuthEvent({
                        kind: AuthEventKind.UserLoggedIn,
                        loggedInUser: e
                    }), n.dispatchAuthEvent({
                        currentActiveUser: e,
                        kind: AuthEventKind.ActiveUserChanged,
                        previousActiveUser: o
                    })), e
                })
            }, e.prototype.doLoginRequest = function(e, t) {
                var r = new StitchDocRequest.Builder;
                r.withMethod(Method$1.POST), t ? r.withPath(this.authRoutes.getAuthProviderLinkRoute(e.providerName)) : r.withPath(this.authRoutes.getAuthProviderLoginRoute(e.providerName));
                var n = e.material;
                if (this.attachAuthOptions(n), r.withDocument(n), !t) return this.requestClient.doRequest(r.build());
                var o = new StitchAuthDocRequest(r.build(), r.document);
                return this.doAuthenticatedRequest(o)
            }, e.prototype.processLogin = function(r, n, o) {
                var i = this,
                    s = this.activeUserAuthInfo,
                    u = this.currentUser;
                return n = this.activeUserAuthInfo.merge(new AuthInfo(n.userId, n.deviceId, n.accessToken, n.refreshToken, r.providerType, r.providerName, void 0, void 0)), this.activeUserAuthInfo = n, this.currentUser = this.userFactory.makeUser(this.activeUserAuthInfo.userId, r.providerType, r.providerName, this.activeUserAuthInfo.isLoggedIn, new Date, void 0, JWT.fromEncoded(n.accessToken).userData), this.doGetUserProfile().then(function(e) {
                    s.hasUser && i.allUsersAuthInfo.set(s.userId, s.withNewAuthActivityTime()), n = n.merge(new AuthInfo(n.userId, n.deviceId, n.accessToken, n.refreshToken, r.providerType, r.providerName, new Date, e));
                    var t = !i.allUsersAuthInfo.has(n.userId);
                    try {
                        writeActiveUserAuthInfoToStorage(n, i.storage), i.allUsersAuthInfo.set(n.userId, n), writeAllUsersAuthInfoToStorage(i.allUsersAuthInfo, i.storage)
                    } catch (e) {
                        throw i.activeUserAuthInfo = s, i.currentUser = u, n.userId !== s.userId && n.userId && i.allUsersAuthInfo.delete(n.userId), new StitchClientError(exports.StitchClientErrorCode.CouldNotPersistAuthInfo)
                    }
                    return i.activeUserAuthInfo = n, i.currentUser = i.userFactory.makeUser(i.activeUserAuthInfo.userId, r.providerType, r.providerName, i.activeUserAuthInfo.isLoggedIn, i.activeUserAuthInfo.lastAuthActivity, e, JWT.fromEncoded(n.accessToken).userData), t && (i.onAuthEvent(), i.dispatchAuthEvent({
                        addedUser: i.currentUser,
                        kind: AuthEventKind.UserAdded
                    })), i.currentUser
                }).catch(function(e) {
                    if (e instanceof StitchClientError) throw e;
                    if (o || s.hasUser) {
                        var t = i.activeUserAuthInfo;
                        i.activeUserAuthInfo = s, i.currentUser = u, o && (i.activeUserAuthInfo = i.activeUserAuthInfo.withAuthProvider(t.loggedInProviderType, t.loggedInProviderName))
                    } else i.clearActiveUserAuth();
                    throw e
                })
            }, e.prototype.processLoginResponse = function(e, t, r) {
                try {
                    if (!t) throw new StitchServiceError("the login response could not be processed for credential: " + e + ";response was undefined");
                    if (!t.body) throw new StitchServiceError("response with status code " + t.statusCode + " has empty body");
                    return this.processLogin(e, ApiAuthInfo.fromJSON(JSON.parse(t.body)), r)
                } catch (e) {
                    throw new StitchRequestError(e, exports.StitchRequestErrorCode.DECODING_ERROR)
                }
            }, e.prototype.doGetUserProfile = function() {
                var e = new StitchAuthRequest.Builder;
                return e.withMethod(Method$1.GET).withPath(this.authRoutes.profileRoute), this.doAuthenticatedRequest(e.build()).then(function(e) {
                    return ApiCoreUserProfile.fromJSON(JSON.parse(e.body))
                }).catch(function(e) {
                    throw e instanceof StitchError ? e : new StitchRequestError(e, exports.StitchRequestErrorCode.DECODING_ERROR)
                })
            }, e.prototype.doLogout = function(e) {
                var t = new StitchAuthRequest.Builder;
                return t.withRefreshToken().withPath(this.authRoutes.sessionRoute).withMethod(Method$1.DELETE), this.doAuthenticatedRequest(t.build(), e).then(function() {})
            }, e.prototype.clearActiveUserAuth = function() {
                this.isLoggedIn && this.clearUserAuthTokens(this.activeUserAuthInfo.userId)
            }, e.prototype.clearUserAuthTokens = function(e) {
                var t = this.allUsersAuthInfo.get(e);
                if (void 0 === t) {
                    if (this.activeUserAuthInfo.userId !== e) throw new StitchClientError(exports.StitchClientErrorCode.UserNotFound)
                } else if (!t.isLoggedIn) return;
                try {
                    var r = void 0;
                    if (t) {
                        var n = t.loggedOut();
                        this.allUsersAuthInfo.set(e, n), writeAllUsersAuthInfoToStorage(this.allUsersAuthInfo, this.storage), r = this.userFactory.makeUser(n.userId, n.loggedInProviderType, n.loggedInProviderName, n.isLoggedIn, n.lastAuthActivity, n.userProfile)
                    }
                    var o = !1;
                    this.activeUserAuthInfo.hasUser && this.activeUserAuthInfo.userId === e && (o = !0, this.activeUserAuthInfo = this.activeUserAuthInfo.withClearedUser(), this.currentUser = void 0, writeActiveUserAuthInfoToStorage(this.activeUserAuthInfo, this.storage)), r && (this.onAuthEvent(), this.dispatchAuthEvent({
                        kind: AuthEventKind.UserLoggedOut,
                        loggedOutUser: r
                    }), o && this.dispatchAuthEvent({
                        currentActiveUser: void 0,
                        kind: AuthEventKind.ActiveUserChanged,
                        previousActiveUser: r
                    }))
                } catch (e) {
                    throw new StitchClientError(exports.StitchClientErrorCode.CouldNotPersistAuthInfo)
                }
            }, e
        }(),
        DeviceFields, BY;
    BY = DeviceFields || (DeviceFields = {}), BY.DEVICE_ID = "deviceId", BY.APP_ID = "appId", BY.APP_VERSION = "appVersion", BY.PLATFORM = "platform", BY.PLATFORM_VERSION = "platformVersion", BY.SDK_VERSION = "sdkVersion";
    var DeviceFields$1 = DeviceFields,
        ProviderCapabilities = function(e) {
            void 0 === e && (e = !1), this.reusesExistingSession = e
        },
        AnonymousCredential = function(e) {
            void 0 === e && (e = AnonymousAuthProvider.DEFAULT_NAME), this.providerType = AnonymousAuthProvider.TYPE, this.material = {}, this.providerCapabilities = new ProviderCapabilities(!0), this.providerName = e
        },
        CustomAuthProvider = function() {
            function e() {}
            return e.TYPE = "custom-token", e.DEFAULT_NAME = "custom-token", e
        }(),
        Fields$7;
    (Fields$7 || (Fields$7 = {})).TOKEN = "token";
    var CustomCredential = function(e, t) {
            var r;
            void 0 === t && (t = CustomAuthProvider.DEFAULT_NAME), this.providerType = CustomAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.providerName = t, this.token = e, this.material = ((r = {})[Fields$7.TOKEN] = this.token, r)
        },
        FacebookAuthProvider = function() {
            function e() {}
            return e.TYPE = "oauth2-facebook", e.DEFAULT_NAME = "oauth2-facebook", e
        }(),
        Fields$8;
    (Fields$8 || (Fields$8 = {})).ACCESS_TOKEN = "accessToken";
    var FacebookCredential = function() {
            function e(e, t) {
                var r;
                void 0 === t && (t = FacebookAuthProvider.DEFAULT_NAME), this.providerType = FacebookAuthProvider.TYPE, this.providerName = t, this.accessToken = e, this.material = ((r = {})[Fields$8.ACCESS_TOKEN] = this.accessToken, r)
            }
            return Object.defineProperty(e.prototype, "providerCapabilities", {
                get: function() {
                    return new ProviderCapabilities(!1)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        FunctionAuthProvider = function() {
            function e() {}
            return e.TYPE = "custom-function", e.DEFAULT_NAME = "custom-function", e
        }(),
        FunctionCredential = function() {
            function e(e, t) {
                void 0 === t && (t = FunctionAuthProvider.DEFAULT_NAME), this.providerType = FunctionAuthProvider.TYPE, this.providerName = t, this.material = e
            }
            return Object.defineProperty(e.prototype, "providerCapabilities", {
                get: function() {
                    return new ProviderCapabilities(!1)
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        GoogleAuthProvider = function() {
            function e() {}
            return e.TYPE = "oauth2-google", e.DEFAULT_NAME = "oauth2-google", e
        }(),
        Fields$9;
    (Fields$9 || (Fields$9 = {})).AUTH_CODE = "authCode";
    var GoogleCredential = function(e, t) {
            var r;
            void 0 === t && (t = GoogleAuthProvider.DEFAULT_NAME), this.providerType = GoogleAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.providerName = t, this.authCode = e, this.material = ((r = {})[Fields$9.AUTH_CODE] = this.authCode, r)
        },
        ServerApiKeyAuthProvider = function() {
            function e() {}
            return e.TYPE = "api-key", e.DEFAULT_NAME = "api-key", e
        }(),
        Fields$a;
    (Fields$a || (Fields$a = {})).KEY = "key";
    var ServerApiKeyCredential = function(e, t) {
            var r;
            void 0 === t && (t = ServerApiKeyAuthProvider.DEFAULT_NAME), this.providerType = ServerApiKeyAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.providerName = t, this.key = e, this.material = ((r = {})[Fields$a.KEY] = this.key, r)
        },
        CoreAuthProviderClient = function(e, t, r) {
            this.providerName = e, this.requestClient = t, this.baseRoute = r
        },
        Fields$b, kZ;
    kZ = Fields$b || (Fields$b = {}), kZ.ID = "_id", kZ.KEY = "key", kZ.NAME = "name", kZ.DISABLED = "disabled";
    var UserApiKey = function() {
            function r(e, t, r, n) {
                this.id = bson.ObjectID.createFromHexString(e), this.key = t, this.name = r, this.disabled = n
            }
            return r.readFromApi = function(e) {
                var t = "string" == typeof e ? JSON.parse(e) : e;
                return Assertions.keyPresent(Fields$b.ID, t), Assertions.keyPresent(Fields$b.NAME, t), Assertions.keyPresent(Fields$b.DISABLED, t), new r(t[Fields$b.ID], t[Fields$b.KEY], t[Fields$b.NAME], t[Fields$b.DISABLED])
            }, r.prototype.toJSON = function() {
                var e;
                return (e = {})[Fields$b.ID] = this.id, e[Fields$b.KEY] = this.key, e[Fields$b.NAME] = this.name, e[Fields$b.DISABLED] = this.disabled, e
            }, r
        }(),
        UserApiKeyAuthProvider = function() {
            function e() {}
            return e.TYPE = "api-key", e.DEFAULT_NAME = "api-key", e
        }(),
        __extends$d = (uZ = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                uZ(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        uZ, ApiKeyFields;
    (ApiKeyFields || (ApiKeyFields = {})).NAME = "name";
    var CoreUserApiKeyAuthProviderClient = function(o) {
            function e(e, t) {
                var r = t.baseAuthRoute + "/api_keys",
                    n = UserApiKeyAuthProvider.DEFAULT_NAME;
                return o.call(this, n, e, r) || this
            }
            return __extends$d(e, o), e.prototype.createApiKey = function(e) {
                var t, r = new StitchAuthDocRequest.Builder;
                return r.withMethod(Method$1.POST).withPath(this.baseRoute).withDocument((t = {}, t[ApiKeyFields.NAME] = e, t)).withRefreshToken(), this.requestClient.doAuthenticatedRequest(r.build()).then(function(e) {
                    return UserApiKey.readFromApi(e.body)
                }).catch(function(e) {
                    throw wrapDecodingError(e)
                })
            }, e.prototype.fetchApiKey = function(e) {
                var t = new StitchAuthRequest.Builder;
                return t.withMethod(Method$1.GET).withPath(this.getApiKeyRoute(e.toHexString())), t.withRefreshToken(), this.requestClient.doAuthenticatedRequest(t.build()).then(function(e) {
                    return UserApiKey.readFromApi(e.body)
                }).catch(function(e) {
                    throw wrapDecodingError(e)
                })
            }, e.prototype.fetchApiKeys = function() {
                var e = new StitchAuthRequest.Builder;
                return e.withMethod(Method$1.GET).withPath(this.baseRoute), e.withRefreshToken(), this.requestClient.doAuthenticatedRequest(e.build()).then(function(e) {
                    var t = JSON.parse(e.body);
                    if (Array.isArray(t)) return t.map(function(e) {
                        return UserApiKey.readFromApi(e)
                    });
                    throw new StitchRequestError(new Error("unexpected non-array response from server"), exports.StitchRequestErrorCode.DECODING_ERROR)
                }).catch(function(e) {
                    throw wrapDecodingError(e)
                })
            }, e.prototype.deleteApiKey = function(e) {
                var t = new StitchAuthRequest.Builder;
                return t.withMethod(Method$1.DELETE).withPath(this.getApiKeyRoute(e.toHexString())), t.withRefreshToken(), this.requestClient.doAuthenticatedRequest(t.build()).then(function() {})
            }, e.prototype.enableApiKey = function(e) {
                var t = new StitchAuthRequest.Builder;
                return t.withMethod(Method$1.PUT).withPath(this.getApiKeyEnableRoute(e.toHexString())), t.withRefreshToken(), this.requestClient.doAuthenticatedRequest(t.build()).then(function() {})
            }, e.prototype.disableApiKey = function(e) {
                var t = new StitchAuthRequest.Builder;
                return t.withMethod(Method$1.PUT).withPath(this.getApiKeyDisableRoute(e.toHexString())), t.withRefreshToken(), this.requestClient.doAuthenticatedRequest(t.build()).then(function() {})
            }, e.prototype.getApiKeyRoute = function(e) {
                return this.baseRoute + "/" + e
            }, e.prototype.getApiKeyEnableRoute = function(e) {
                return this.getApiKeyRoute(e) + "/enable"
            }, e.prototype.getApiKeyDisableRoute = function(e) {
                return this.getApiKeyRoute(e) + "/disable"
            }, e
        }(CoreAuthProviderClient),
        Fields$c;
    (Fields$c || (Fields$c = {})).KEY = "key";
    var UserApiKeyCredential = function(e, t) {
            var r;
            void 0 === t && (t = UserApiKeyAuthProvider.DEFAULT_NAME), this.providerType = UserApiKeyAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.providerName = t, this.key = e, this.material = ((r = {})[Fields$c.KEY] = this.key, r)
        },
        UserPasswordAuthProvider = function() {
            function e() {}
            return e.TYPE = "local-userpass", e.DEFAULT_NAME = "local-userpass", e
        }(),
        __extends$e = (m$ = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                m$(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        m$, RegistrationFields, v$, ActionFields, w$;
    v$ = RegistrationFields || (RegistrationFields = {}), v$.EMAIL = "email", v$.PASSWORD = "password", w$ = ActionFields || (ActionFields = {}), w$.EMAIL = "email", w$.PASSWORD = "password", w$.TOKEN = "token", w$.TOKEN_ID = "tokenId", w$.ARGS = "arguments";
    var CoreUserPasswordAuthProviderClient = function(o) {
            function e(e, t, r) {
                void 0 === e && (e = UserPasswordAuthProvider.DEFAULT_NAME);
                var n = r.getAuthProviderRoute(e);
                return o.call(this, e, t, n) || this
            }
            return __extends$e(e, o), e.prototype.registerWithEmailInternal = function(e, t) {
                var r, n = new StitchDocRequest.Builder;
                return n.withMethod(Method$1.POST).withPath(this.getRegisterWithEmailRoute()), n.withDocument(((r = {})[RegistrationFields.EMAIL] = e, r[RegistrationFields.PASSWORD] = t, r)), this.requestClient.doRequest(n.build()).then(function() {})
            }, e.prototype.confirmUserInternal = function(e, t) {
                var r, n = new StitchDocRequest.Builder;
                return n.withMethod(Method$1.POST).withPath(this.getConfirmUserRoute()), n.withDocument(((r = {})[ActionFields.TOKEN] = e, r[ActionFields.TOKEN_ID] = t, r)), this.requestClient.doRequest(n.build()).then(function() {})
            }, e.prototype.resendConfirmationEmailInternal = function(e) {
                var t, r = new StitchDocRequest.Builder;
                return r.withMethod(Method$1.POST).withPath(this.getResendConfirmationEmailRoute()), r.withDocument(((t = {})[ActionFields.EMAIL] = e, t)), this.requestClient.doRequest(r.build()).then(function() {})
            }, e.prototype.resetPasswordInternal = function(e, t, r) {
                var n, o = new StitchDocRequest.Builder;
                return o.withMethod(Method$1.POST).withPath(this.getResetPasswordRoute()), o.withDocument(((n = {})[ActionFields.TOKEN] = e, n[ActionFields.TOKEN_ID] = t, n[ActionFields.PASSWORD] = r, n)), this.requestClient.doRequest(o.build()).then(function() {})
            }, e.prototype.sendResetPasswordEmailInternal = function(e) {
                var t, r = new StitchDocRequest.Builder;
                return r.withMethod(Method$1.POST).withPath(this.getSendResetPasswordEmailRoute()), r.withDocument(((t = {})[ActionFields.EMAIL] = e, t)), this.requestClient.doRequest(r.build()).then(function() {})
            }, e.prototype.callResetPasswordFunctionInternal = function(e, t, r) {
                var n, o = new StitchDocRequest.Builder;
                return o.withMethod(Method$1.POST).withPath(this.getCallResetPasswordFunctionRoute()), o.withDocument(((n = {})[ActionFields.EMAIL] = e, n[ActionFields.PASSWORD] = t, n[ActionFields.ARGS] = r, n)), this.requestClient.doRequest(o.build()).then(function() {})
            }, e.prototype.getRegisterWithEmailRoute = function() {
                return this.getExtensionRoute("register")
            }, e.prototype.getConfirmUserRoute = function() {
                return this.getExtensionRoute("confirm")
            }, e.prototype.getResendConfirmationEmailRoute = function() {
                return this.getExtensionRoute("confirm/send")
            }, e.prototype.getResetPasswordRoute = function() {
                return this.getExtensionRoute("reset")
            }, e.prototype.getSendResetPasswordEmailRoute = function() {
                return this.getExtensionRoute("reset/send")
            }, e.prototype.getCallResetPasswordFunctionRoute = function() {
                return this.getExtensionRoute("reset/call")
            }, e.prototype.getExtensionRoute = function(e) {
                return this.baseRoute + "/" + e
            }, e
        }(CoreAuthProviderClient),
        Fields$d, b_;
    b_ = Fields$d || (Fields$d = {}), b_.USERNAME = "username", b_.PASSWORD = "password";
    var UserPasswordCredential = function(e, t, r) {
            var n;
            void 0 === r && (r = UserPasswordAuthProvider.DEFAULT_NAME), this.username = e, this.password = t, this.providerName = r, this.providerType = UserPasswordAuthProvider.TYPE, this.providerCapabilities = new ProviderCapabilities(!1), this.material = ((n = {})[Fields$d.USERNAME] = this.username, n[Fields$d.PASSWORD] = this.password, n)
        },
        UserType, h_;
    h_ = UserType || (UserType = {}), h_.Normal = "normal", h_.Server = "server", h_.Unknown = "unknown";
    var UserType$1 = UserType,
        MemoryStorage = function() {
            function e(e) {
                this.suiteName = e, this.storage = {}
            }
            return e.prototype.get = function(e) {
                return this.storage[this.suiteName + "." + e]
            }, e.prototype.set = function(e, t) {
                this.storage[this.suiteName + "." + e] = t
            }, e.prototype.remove = function(e) {
                delete this.storage[this.suiteName + "." + e]
            }, e
        }(),
        RebindEvent = function() {},
        RebindEventType, p_;
    p_ = RebindEventType || (RebindEventType = {}), p_[p_.AUTH_EVENT = 0] = "AUTH_EVENT";
    var CoreStitchServiceClientImpl = function() {
            function e(e, t, r) {
                this.serviceField = "service", this.argumentsField = "arguments", this.requestClient = e, this.serviceRoutes = t, this.serviceName = r, this.serviceBinders = [], this.allocatedStreams = []
            }
            return e.prototype.callFunction = function(e, t, r) {
                return this.requestClient.doAuthenticatedRequestWithDecoder(this.getCallServiceFunctionRequest(e, t), r)
            }, e.prototype.streamFunction = function(e, t, r) {
                var n = this;
                return this.requestClient.openAuthenticatedStreamWithDecoder(this.getStreamServiceFunctionRequest(e, t), r).then(function(e) {
                    return n.allocatedStreams.push(e), e
                })
            }, e.prototype.bind = function(e) {
                this.serviceBinders.push(e)
            }, e.prototype.onRebindEvent = function(t) {
                switch (t.type) {
                    case RebindEventType.AUTH_EVENT:
                        t.event.kind === AuthEventKind.ActiveUserChanged && this.closeAllocatedStreams()
                }
                this.serviceBinders.forEach(function(e) {
                    e.onRebindEvent(t)
                })
            }, e.prototype.getStreamServiceFunctionRequest = function(e, t) {
                var r = {
                    name: e
                };
                void 0 !== this.serviceName && (r[this.serviceField] = this.serviceName), r[this.argumentsField] = t;
                var n = new StitchAuthRequest.Builder;
                return n.withMethod(Method$1.GET).withPath(this.serviceRoutes.functionCallRoute + "?stitch_request=" + encodeURIComponent(base64Encode(bson_54.stringify(r)))), n.build()
            }, e.prototype.getCallServiceFunctionRequest = function(e, t) {
                var r = {
                    name: e
                };
                void 0 !== this.serviceName && (r[this.serviceField] = this.serviceName), r[this.argumentsField] = t;
                var n = new StitchAuthDocRequest.Builder;
                return n.withMethod(Method$1.POST).withPath(this.serviceRoutes.functionCallRoute), n.withDocument(r), n.build()
            }, e.prototype.closeAllocatedStreams = function() {
                this.allocatedStreams.forEach(function(e) {
                    e.isOpen() && e.close()
                }), this.allocatedStreams = []
            }, e
        }(),
        CoreStitchAppClient = function() {
            function e(e, t) {
                this.functionService = new CoreStitchServiceClientImpl(e, t.serviceRoutes)
            }
            return e.prototype.callFunction = function(e, t, r) {
                return this.functionService.callFunction(e, t, r)
            }, e
        }(),
        __values$1 = function(e) {
            var t = "function" == typeof Symbol && e[Symbol.iterator],
                r = 0;
            return t ? t.call(e) : {
                next: function() {
                    return e && r >= e.length && (e = void 0), {
                        value: e && e[r++],
                        done: !e
                    }
                }
            }
        },
        BaseEventStream = function() {
            function n(e) {
                this.reconnecter = e, this.closed = !1, this.events = [], this.listeners = [], this.lastErr = void 0
            }
            return n.prototype.isOpen = function() {
                return !this.closed
            }, n.prototype.addListener = function(e) {
                var t = this;
                this.closed ? setTimeout(function() {
                    return e.onEvent(new Event(StitchEvent.ERROR_EVENT_NAME, "stream closed"))
                }, 0) : void 0 === this.lastErr ? (this.listeners.push(e), this.poll()) : setTimeout(function() {
                    return e.onEvent(new Event(StitchEvent.ERROR_EVENT_NAME, t.lastErr))
                }, 0)
            }, n.prototype.removeListener = function(e) {
                var t = this.listeners.indexOf(e); - 1 !== t && this.listeners.splice(t, 1)
            }, n.prototype.nextEvent = function() {
                var r = this;
                return this.closed ? Promise.reject(new Event(StitchEvent.ERROR_EVENT_NAME, "stream closed")) : void 0 !== this.lastErr ? Promise.reject(new Event(StitchEvent.ERROR_EVENT_NAME, this.lastErr)) : new Promise(function(t, e) {
                    r.listenOnce({
                        onEvent: function(e) {
                            t(e)
                        }
                    })
                })
            }, n.prototype.close = function() {
                this.closed || (this.closed = !0, this.afterClose())
            }, n.prototype.reconnect = function(t) {
                var r = this;
                this.reconnecter ? this.reconnecter().then(function(e) {
                    r.onReconnect(e)
                }).catch(function(e) {
                    if (!(e instanceof StitchError && e instanceof StitchRequestError)) return r.closed = !0, r.events.push(new Event(StitchEvent.ERROR_EVENT_NAME, "stream closed: " + t)), void r.poll();
                    setTimeout(function() {
                        return r.reconnect(e)
                    }, n.RETRY_TIMEOUT_MILLIS)
                }) : this.closed || (this.closed = !0, this.events.push(new Event(StitchEvent.ERROR_EVENT_NAME, "stream closed: " + t)), this.poll())
            }, n.prototype.poll = function() {
                for (var t, e; 0 !== this.events.length;) {
                    var r = this.events.pop();
                    try {
                        for (var n = __values$1(this.listeners), o = n.next(); !o.done; o = n.next()) {
                            var i = o.value;
                            i.onEvent && i.onEvent(r)
                        }
                    } catch (e) {
                        t = {
                            error: e
                        }
                    } finally {
                        try {
                            o && !o.done && (e = n.return) && e.call(n)
                        } finally {
                            if (t) throw t.error
                        }
                    }
                }
            }, n.prototype.listenOnce = function(t) {
                var r = this;
                if (this.closed) setTimeout(function() {
                    return t.onEvent(new Event(StitchEvent.ERROR_EVENT_NAME, "stream closed"))
                }, 0);
                else if (void 0 === this.lastErr) {
                    var n = {
                        onEvent: function(e) {
                            r.removeListener(n), t.onEvent(e)
                        }
                    };
                    this.addListener(n)
                } else setTimeout(function() {
                    return t.onEvent(new Event(StitchEvent.ERROR_EVENT_NAME, r.lastErr))
                }, 0)
            }, n.RETRY_TIMEOUT_MILLIS = 5e3, n
        }(),
        BasicRequest = function(e, t, r, n) {
            this.method = e, this.url = t, this.headers = r, this.body = n
        },
        A0, B0;
    A0 = BasicRequest || (BasicRequest = {}), B0 = function() {
        function e(e) {
            e && (this.method = e.method, this.url = e.url, this.headers = e.headers, this.body = e.body)
        }
        return e.prototype.withMethod = function(e) {
            return this.method = e, this
        }, e.prototype.withUrl = function(e) {
            return this.url = e, this
        }, e.prototype.withHeaders = function(e) {
            return this.headers = e, this
        }, e.prototype.withBody = function(e) {
            return this.body = e, this
        }, e.prototype.build = function() {
            if (void 0 === this.method) throw new Error("must set method");
            if (void 0 === this.url) throw new Error("must set non-empty url");
            return new A0(this.method, this.url, void 0 === this.headers ? {} : this.headers, this.body)
        }, e
    }(), A0.Builder = B0;
    var Response = function(r, e, t) {
            var n = this;
            this.statusCode = e, this.body = t, this.headers = {}, Object.keys(r).map(function(e, t) {
                n.headers[e.toLocaleLowerCase()] = r[e]
            })
        },
        BASE_ROUTE = "/api/client/v2.0";

    function getAppRoute(e) {
        return BASE_ROUTE + "/app/" + e
    }

    function getFunctionCallRoute(e) {
        return getAppRoute(e) + "/functions/call"
    }

    function getAppMetadataRoute(e) {
        return getAppRoute(e) + "/location"
    }

    function getAuthProviderRoute(e, t) {
        return getAppRoute(e) + "/auth/providers/" + t
    }

    function getAuthProviderLoginRoute(e, t) {
        return getAuthProviderRoute(e, t) + "/login"
    }

    function getAuthProviderLinkRoute(e, t) {
        return getAuthProviderLoginRoute(e, t) + "?link=true"
    }
    var StitchAppAuthRoutes = function() {
            function e(e) {
                var t = this;
                this.baseAuthRoute = BASE_ROUTE + "/auth", this.sessionRoute = t.baseAuthRoute + "/session", this.profileRoute = t.baseAuthRoute + "/profile", this.clientAppId = e
            }
            return e.prototype.getAuthProviderRoute = function(e) {
                return getAuthProviderRoute(this.clientAppId, e)
            }, e.prototype.getAuthProviderLoginRoute = function(e) {
                return getAuthProviderLoginRoute(this.clientAppId, e)
            }, e.prototype.getAuthProviderLinkRoute = function(e) {
                return getAuthProviderLinkRoute(this.clientAppId, e)
            }, e.prototype.getAuthProviderExtensionRoute = function(e, t) {
                return this.getAuthProviderRoute(e) + "/" + t
            }, e
        }(),
        Fields$e, e1;
    e1 = Fields$e || (Fields$e = {}), e1.DEPLOYMENT_MODEL = "deployment_model", e1.LOCATION = "location", e1.HOSTNAME = "hostname";
    var ApiAppMetadata = function() {
        function t(e, t, r) {
            this.deploymentModel = e, this.location = t, this.hostname = r
        }
        return t.fromJSON = function(e) {
            return new t(e[Fields$e.DEPLOYMENT_MODEL], e[Fields$e.LOCATION], e[Fields$e.HOSTNAME])
        }, t.prototype.toJSON = function() {
            var e;
            return (e = {})[Fields$e.DEPLOYMENT_MODEL] = this.deploymentModel, e[Fields$e.LOCATION] = this.location, e[Fields$e.HOSTNAME] = this.hostname, e
        }, t
    }();

    function inspectResponse(e, t, r) {
        return 200 <= r.statusCode && r.statusCode < 300 ? r : handleRequestError(r)
    }
    var BaseStitchRequestClient = function() {
            function e(e, t) {
                this.baseUrl = e, this.transport = t
            }
            return e.prototype.doRequestToURL = function(t, r) {
                return this.transport.roundTrip(this.buildRequest(t, r)).catch(function(e) {
                    throw new StitchRequestError(e, exports.StitchRequestErrorCode.TRANSPORT_ERROR)
                }).then(function(e) {
                    return inspectResponse(t, r, e)
                })
            }, e.prototype.doStreamRequestToURL = function(e, t, r, n) {
                return void 0 === r && (r = !0), this.transport.stream(this.buildRequest(e, t), r, n).catch(function(e) {
                    if (e instanceof StitchError) throw e;
                    throw new StitchRequestError(e, exports.StitchRequestErrorCode.TRANSPORT_ERROR)
                })
            }, e.prototype.buildRequest = function(e, t) {
                return (new BasicRequest.Builder).withMethod(e.method).withUrl("" + t + e.path).withHeaders(e.headers).withBody(e.body).build()
            }, e
        }(),
        StitchServiceRoutes = function(e) {
            this.clientAppId = e, this.functionCallRoute = getFunctionCallRoute(e)
        },
        StitchAppRoutes = function(e) {
            this.clientAppId = e, this.authRoutes = new StitchAppAuthRoutes(e), this.serviceRoutes = new StitchServiceRoutes(e), this.appMetadataRoute = getAppMetadataRoute(e), this.functionCallRoute = getFunctionCallRoute(e)
        },
        __extends$f = (G1 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                G1(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        G1, __awaiter = function(i, s, u, a) {
            return new(u || (u = Promise))(function(e, t) {
                function r(e) {
                    try {
                        o(a.next(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function n(e) {
                    try {
                        o(a.throw(e))
                    } catch (e) {
                        t(e)
                    }
                }

                function o(t) {
                    t.done ? e(t.value) : new u(function(e) {
                        e(t.value)
                    }).then(r, n)
                }
                o((a = a.apply(i, s || [])).next())
            })
        },
        __generator = function(r, n) {
            var o, i, s, e, u = {
                label: 0,
                sent: function() {
                    if (1 & s[0]) throw s[1];
                    return s[1]
                },
                trys: [],
                ops: []
            };
            return e = {
                next: t(0),
                throw: t(1),
                return: t(2)
            }, "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                return this
            }), e;

            function t(t) {
                return function(e) {
                    return function(t) {
                        if (o) throw new TypeError("Generator is already executing.");
                        for (; u;) try {
                            if (o = 1, i && (s = 2 & t[0] ? i.return : t[0] ? i.throw || ((s = i.return) && s.call(i), 0) : i.next) && !(s = s.call(i, t[1])).done) return s;
                            switch (i = 0, s && (t = [2 & t[0], s.value]), t[0]) {
                                case 0:
                                case 1:
                                    s = t;
                                    break;
                                case 4:
                                    return u.label++, {
                                        value: t[1],
                                        done: !1
                                    };
                                case 5:
                                    u.label++, i = t[1], t = [0];
                                    continue;
                                case 7:
                                    t = u.ops.pop(), u.trys.pop();
                                    continue;
                                default:
                                    if (!(s = 0 < (s = u.trys).length && s[s.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                        u = 0;
                                        continue
                                    }
                                    if (3 === t[0] && (!s || t[1] > s[0] && t[1] < s[3])) {
                                        u.label = t[1];
                                        break
                                    }
                                    if (6 === t[0] && u.label < s[1]) {
                                        u.label = s[1], s = t;
                                        break
                                    }
                                    if (s && u.label < s[2]) {
                                        u.label = s[2], u.ops.push(t);
                                        break
                                    }
                                    s[2] && u.ops.pop(), u.trys.pop();
                                    continue
                            }
                            t = n.call(r, u)
                        } catch (e) {
                            t = [6, e], i = 0
                        } finally {
                            o = s = 0
                        }
                        if (5 & t[0]) throw t[1];
                        return {
                            value: t[0] ? t[1] : void 0,
                            done: !0
                        }
                    }([t, e])
                }
            }
        },
        StitchAppRequestClient = function(i) {
            function e(e, t, r) {
                var n = i.call(this, t, r) || this;
                return n.clientAppId = e, n.routes = new StitchAppRoutes(e), n
            }
            return __extends$f(e, i), e.prototype.doRequest = function(t) {
                var r = this;
                return this.initAppMetadata().then(function(e) {
                    return i.prototype.doRequestToURL.call(r, t, e.hostname)
                })
            }, e.prototype.doStreamRequest = function(t, r, n) {
                var o = this;
                return void 0 === r && (r = !0), this.initAppMetadata().then(function(e) {
                    return i.prototype.doStreamRequestToURL.call(o, t, e.hostname, r, n)
                })
            }, e.prototype.getBaseURL = function() {
                return __awaiter(this, void 0, void 0, function() {
                    return __generator(this, function(e) {
                        return [2, this.initAppMetadata().then(function(e) {
                            return e.hostname
                        })]
                    })
                })
            }, e.prototype.initAppMetadata = function() {
                var t = this;
                if (this.appMetadata) return Promise.resolve(this.appMetadata);
                var e = (new StitchRequest.Builder).withMethod(Method$1.GET).withPath(this.routes.appMetadataRoute).build();
                return i.prototype.doRequestToURL.call(this, e, this.baseUrl).then(function(e) {
                    return t.appMetadata = ApiAppMetadata.fromJSON(bson_54.parse(e.body)), t.appMetadata
                })
            }, e
        }(BaseStitchRequestClient),
        __extends$g = (I2 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                I2(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        I2, StitchRequestClient = function(n) {
            function e(e, t) {
                return n.call(this, e, t) || this
            }
            return __extends$g(e, n), e.prototype.doRequest = function(e) {
                return n.prototype.doRequestToURL.call(this, e, this.baseUrl)
            }, e.prototype.doStreamRequest = function(e, t, r) {
                return void 0 === t && (t = !0), n.prototype.doStreamRequestToURL.call(this, e, this.baseUrl, t, r)
            }, e.prototype.getBaseURL = function() {
                return Promise.resolve(this.baseUrl)
            }, e
        }(BaseStitchRequestClient),
        __extends$h = (Z2 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                Z2(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        Z2, AuthRebindEvent = function(r) {
            function e(e) {
                var t = r.call(this) || this;
                return t.type = RebindEventType.AUTH_EVENT, t.event = e, t
            }
            return __extends$h(e, r), e
        }(RebindEvent),
        StitchClientConfiguration = function() {
            function e(e, t, r, n) {
                this.baseUrl = e, this.storage = t, this.dataDirectory = r, this.transport = n
            }
            return e.prototype.builder = function() {
                return new e.Builder(this)
            }, e
        }(),
        p3, q3;
    p3 = StitchClientConfiguration || (StitchClientConfiguration = {}), q3 = function() {
        function e(e) {
            e && (this.baseUrl = e.baseUrl, this.storage = e.storage, this.dataDirectory = e.dataDirectory, this.transport = e.transport)
        }
        return e.prototype.withBaseUrl = function(e) {
            return this.baseUrl = e, this
        }, e.prototype.withStorage = function(e) {
            return this.storage = e, this
        }, e.prototype.withDataDirectory = function(e) {
            return this.dataDirectory = e, this
        }, e.prototype.withTransport = function(e) {
            return this.transport = e, this
        }, e.prototype.build = function() {
            return new p3(this.baseUrl, this.storage, this.dataDirectory, this.transport)
        }, e
    }(), p3.Builder = q3;
    var __extends$i = (x3 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                x3(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        x3, M3, N3;
    exports.StitchAppClientConfiguration = function(o) {
        function e(e, t, r) {
            var n = o.call(this, e.baseUrl, e.storage, e.dataDirectory, e.transport) || this;
            return n.localAppVersion = r, n.localAppName = t, n
        }
        return __extends$i(e, o), e.prototype.builder = function() {
            return new e.Builder(this)
        }, e
    }(StitchClientConfiguration), M3 = exports.StitchAppClientConfiguration || (exports.StitchAppClientConfiguration = {}), N3 = function(r) {
        function e(e) {
            var t = r.call(this, e) || this;
            return e && (t.localAppVersion = e.localAppVersion, t.localAppName = e.localAppName), t
        }
        return __extends$i(e, r), e.prototype.withLocalAppName = function(e) {
            return this.localAppName = e, this
        }, e.prototype.withLocalAppVersion = function(e) {
            return this.localAppVersion = e, this
        }, e.prototype.build = function() {
            var e = r.prototype.build.call(this);
            return new M3(e, this.localAppName, this.localAppVersion)
        }, e
    }(StitchClientConfiguration.Builder), M3.Builder = N3;
    var StitchAppClientInfo = function(e, t, r, n) {
            this.clientAppId = e, this.dataDirectory = t, this.localAppName = r, this.localAppVersion = n
        },
        FacebookRedirectCredential = function(e, t, r) {
            void 0 === t && (t = FacebookAuthProvider.DEFAULT_NAME), void 0 === r && (r = FacebookAuthProvider.TYPE), this.redirectUrl = e, this.providerName = t, this.providerType = r
        },
        GoogleRedirectCredential = function(e, t, r) {
            void 0 === t && (t = GoogleAuthProvider.DEFAULT_NAME), void 0 === r && (r = GoogleAuthProvider.TYPE), this.redirectUrl = e, this.providerName = t, this.providerType = r
        },
        __extends$j = (g4 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                g4(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        g4, UserApiKeyAuthProviderClientImpl = function(r) {
            function e(e, t) {
                return r.call(this, e, t) || this
            }
            return __extends$j(e, r), e.prototype.createApiKey = function(e) {
                return r.prototype.createApiKey.call(this, e)
            }, e.prototype.fetchApiKey = function(e) {
                return r.prototype.fetchApiKey.call(this, e)
            }, e.prototype.fetchApiKeys = function() {
                return r.prototype.fetchApiKeys.call(this)
            }, e.prototype.deleteApiKey = function(e) {
                return r.prototype.deleteApiKey.call(this, e)
            }, e.prototype.enableApiKey = function(e) {
                return r.prototype.enableApiKey.call(this, e)
            }, e.prototype.disableApiKey = function(e) {
                return r.prototype.disableApiKey.call(this, e)
            }, e
        }(CoreUserApiKeyAuthProviderClient);
    (exports.UserApiKeyAuthProviderClient || (exports.UserApiKeyAuthProviderClient = {})).factory = new(function() {
        function e() {}
        return e.prototype.getClient = function(e, t, r) {
            return new UserApiKeyAuthProviderClientImpl(e, r)
        }, e
    }());
    var __extends$k = (D4 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                D4(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        D4, UserPasswordAuthProviderClientImpl = function(n) {
            function e(e, t) {
                return n.call(this, UserPasswordAuthProvider.DEFAULT_NAME, e, t) || this
            }
            return __extends$k(e, n), e.prototype.registerWithEmail = function(e, t) {
                return n.prototype.registerWithEmailInternal.call(this, e, t)
            }, e.prototype.confirmUser = function(e, t) {
                return n.prototype.confirmUserInternal.call(this, e, t)
            }, e.prototype.resendConfirmationEmail = function(e) {
                return n.prototype.resendConfirmationEmailInternal.call(this, e)
            }, e.prototype.resetPassword = function(e, t, r) {
                return n.prototype.resetPasswordInternal.call(this, e, t, r)
            }, e.prototype.sendResetPasswordEmail = function(e) {
                return n.prototype.sendResetPasswordEmailInternal.call(this, e)
            }, e.prototype.callResetPasswordFunction = function(e, t, r) {
                return n.prototype.callResetPasswordFunctionInternal.call(this, e, t, r)
            }, e
        }(CoreUserPasswordAuthProviderClient);
    (exports.UserPasswordAuthProviderClient || (exports.UserPasswordAuthProviderClient = {})).factory = new(function() {
        function e() {}
        return e.prototype.getClient = function(e, t, r) {
            return new UserPasswordAuthProviderClientImpl(t, r)
        }, e
    }());
    var support = {
        searchParams: "URLSearchParams" in self,
        iterable: "Symbol" in self && "iterator" in Symbol,
        blob: "FileReader" in self && "Blob" in self && function() {
            try {
                return new Blob, !0
            } catch (e) {
                return !1
            }
        }(),
        formData: "FormData" in self,
        arrayBuffer: "ArrayBuffer" in self
    };

    function isDataView(e) {
        return e && DataView.prototype.isPrototypeOf(e)
    }
    if (support.arrayBuffer) var viewClasses = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
        isArrayBufferView = ArrayBuffer.isView || function(e) {
            return e && -1 < viewClasses.indexOf(Object.prototype.toString.call(e))
        };

    function normalizeName(e) {
        if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
        return e.toLowerCase()
    }

    function normalizeValue(e) {
        return "string" != typeof e && (e = String(e)), e
    }

    function iteratorFor(t) {
        var e = {
            next: function() {
                var e = t.shift();
                return {
                    done: void 0 === e,
                    value: e
                }
            }
        };
        return support.iterable && (e[Symbol.iterator] = function() {
            return e
        }), e
    }

    function Headers$1(t) {
        this.map = {}, t instanceof Headers$1 ? t.forEach(function(e, t) {
            this.append(t, e)
        }, this) : Array.isArray(t) ? t.forEach(function(e) {
            this.append(e[0], e[1])
        }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
            this.append(e, t[e])
        }, this)
    }

    function consumed(e) {
        if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
        e.bodyUsed = !0
    }

    function fileReaderReady(r) {
        return new Promise(function(e, t) {
            r.onload = function() {
                e(r.result)
            }, r.onerror = function() {
                t(r.error)
            }
        })
    }

    function readBlobAsArrayBuffer(e) {
        var t = new FileReader,
            r = fileReaderReady(t);
        return t.readAsArrayBuffer(e), r
    }

    function readBlobAsText(e) {
        var t = new FileReader,
            r = fileReaderReady(t);
        return t.readAsText(e), r
    }

    function readArrayBufferAsText(e) {
        for (var t = new Uint8Array(e), r = new Array(t.length), n = 0; n < t.length; n++) r[n] = String.fromCharCode(t[n]);
        return r.join("")
    }

    function bufferClone(e) {
        if (e.slice) return e.slice(0);
        var t = new Uint8Array(e.byteLength);
        return t.set(new Uint8Array(e)), t.buffer
    }

    function Body() {
        return this.bodyUsed = !1, this._initBody = function(e) {
            (this._bodyInit = e) ? "string" == typeof e ? this._bodyText = e : support.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : support.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : support.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : support.arrayBuffer && support.blob && isDataView(e) ? (this._bodyArrayBuffer = bufferClone(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || isArrayBufferView(e)) ? this._bodyArrayBuffer = bufferClone(e) : this._bodyText = e = Object.prototype.toString.call(e): this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : support.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form_pageurlencoded;charset=UTF-8"))
        }, support.blob && (this.blob = function() {
            var e = consumed(this);
            if (e) return e;
            if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData) throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([this._bodyText]))
        }, this.arrayBuffer = function() {
            return this._bodyArrayBuffer ? consumed(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(readBlobAsArrayBuffer)
        }), this.text = function() {
            var e = consumed(this);
            if (e) return e;
            if (this._bodyBlob) return readBlobAsText(this._bodyBlob);
            if (this._bodyArrayBuffer) return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            if (this._bodyFormData) throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText)
        }, support.formData && (this.formData = function() {
            return this.text().then(decode)
        }), this.json = function() {
            return this.text().then(JSON.parse)
        }, this
    }
    Headers$1.prototype.append = function(e, t) {
        e = normalizeName(e), t = normalizeValue(t);
        var r = this.map[e];
        this.map[e] = r ? r + ", " + t : t
    }, Headers$1.prototype.delete = function(e) {
        delete this.map[normalizeName(e)]
    }, Headers$1.prototype.get = function(e) {
        return e = normalizeName(e), this.has(e) ? this.map[e] : null
    }, Headers$1.prototype.has = function(e) {
        return this.map.hasOwnProperty(normalizeName(e))
    }, Headers$1.prototype.set = function(e, t) {
        this.map[normalizeName(e)] = normalizeValue(t)
    }, Headers$1.prototype.forEach = function(e, t) {
        for (var r in this.map) this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this)
    }, Headers$1.prototype.keys = function() {
        var r = [];
        return this.forEach(function(e, t) {
            r.push(t)
        }), iteratorFor(r)
    }, Headers$1.prototype.values = function() {
        var t = [];
        return this.forEach(function(e) {
            t.push(e)
        }), iteratorFor(t)
    }, Headers$1.prototype.entries = function() {
        var r = [];
        return this.forEach(function(e, t) {
            r.push([t, e])
        }), iteratorFor(r)
    }, support.iterable && (Headers$1.prototype[Symbol.iterator] = Headers$1.prototype.entries);
    var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

    function normalizeMethod(e) {
        var t = e.toUpperCase();
        return -1 < methods.indexOf(t) ? t : e
    }

    function Request$1(e, t) {
        var r = (t = t || {}).body;
        if (e instanceof Request$1) {
            if (e.bodyUsed) throw new TypeError("Already read");
            this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new Headers$1(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, r || null == e._bodyInit || (r = e._bodyInit, e.bodyUsed = !0)
        } else this.url = String(e);
        if (this.credentials = t.credentials || this.credentials || "same-origin", !t.headers && this.headers || (this.headers = new Headers$1(t.headers)), this.method = normalizeMethod(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && r) throw new TypeError("Body not allowed for GET or HEAD requests");
        this._initBody(r)
    }

    function decode(e) {
        var o = new FormData;
        return e.trim().split("&").forEach(function(e) {
            if (e) {
                var t = e.split("="),
                    r = t.shift().replace(/\+/g, " "),
                    n = t.join("=").replace(/\+/g, " ");
                o.append(decodeURIComponent(r), decodeURIComponent(n))
            }
        }), o
    }

    function parseHeaders(e) {
        var o = new Headers$1;
        return e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(e) {
            var t = e.split(":"),
                r = t.shift().trim();
            if (r) {
                var n = t.join(":").trim();
                o.append(r, n)
            }
        }), o
    }

    function Response$1(e, t) {
        t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = 200 <= this.status && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new Headers$1(t.headers), this.url = t.url || "", this._initBody(e)
    }
    Request$1.prototype.clone = function() {
        return new Request$1(this, {
            body: this._bodyInit
        })
    }, Body.call(Request$1.prototype), Body.call(Response$1.prototype), Response$1.prototype.clone = function() {
        return new Response$1(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers$1(this.headers),
            url: this.url
        })
    }, Response$1.error = function() {
        var e = new Response$1(null, {
            status: 0,
            statusText: ""
        });
        return e.type = "error", e
    };
    var redirectStatuses = [301, 302, 303, 307, 308];
    Response$1.redirect = function(e, t) {
        if (-1 === redirectStatuses.indexOf(t)) throw new RangeError("Invalid status code");
        return new Response$1(null, {
            status: t,
            headers: {
                location: e
            }
        })
    };
    var DOMException = self.DOMException;
    try {
        new DOMException
    } catch (e) {
        DOMException = function(e, t) {
            this.message = e, this.name = t;
            var r = Error(e);
            this.stack = r.stack
        }, DOMException.prototype = Object.create(Error.prototype), DOMException.prototype.constructor = DOMException
    }

    function fetch$1(i, s) {
        return new Promise(function(r, e) {
            var t = new Request$1(i, s);
            if (t.signal && t.signal.aborted) return e(new DOMException("Aborted", "AbortError"));
            var n = new XMLHttpRequest;

            function o() {
                n.abort()
            }
            n.onload = function() {
                var e = {
                    status: n.status,
                    statusText: n.statusText,
                    headers: parseHeaders(n.getAllResponseHeaders() || "")
                };
                e.url = "responseURL" in n ? n.responseURL : e.headers.get("X-Request-URL");
                var t = "response" in n ? n.response : n.responseText;
                r(new Response$1(t, e))
            }, n.onerror = function() {
                e(new TypeError("Network request failed"))
            }, n.ontimeout = function() {
                e(new TypeError("Network request failed"))
            }, n.onabort = function() {
                e(new DOMException("Aborted", "AbortError"))
            }, n.open(t.method, t.url, !0), "include" === t.credentials ? n.withCredentials = !0 : "omit" === t.credentials && (n.withCredentials = !1), "responseType" in n && support.blob && (n.responseType = "blob"), t.headers.forEach(function(e, t) {
                n.setRequestHeader(t, e)
            }), t.signal && (t.signal.addEventListener("abort", o), n.onreadystatechange = function() {
                4 === n.readyState && t.signal.removeEventListener("abort", o)
            }), n.send(void 0 === t._bodyInit ? null : t._bodyInit)
        })
    }
    fetch$1.polyfill = !0, self.fetch || (self.fetch = fetch$1, self.Headers = Headers$1, self.Request = Request$1, self.Response = Response$1);
    var BrowserFetchTransport = function() {
            function e() {}
            return e.prototype.roundTrip = function(e) {
                var t = fetch$1(e.url, {
                        body: e.body,
                        headers: e.headers,
                        method: e.method,
                        mode: "cors"
                    }),
                    r = t.then(function(e) {
                        return e.text()
                    });
                return Promise.all([t, r]).then(function(e) {
                    var t = e[0],
                        r = e[1],
                        n = {};
                    return t.headers.forEach(function(e, t) {
                        n[t] = e
                    }), new Response(n, t.status, r)
                })
            }, e.prototype.stream = function(e, t, r) {
                throw void 0 === t && (t = !0), new StitchClientError(exports.StitchClientErrorCode.StreamingNotSupported)
            }, e
        }(),
        stitchPrefixKey = "__stitch.client",
        LocalStorage = function() {
            function e(e) {
                this.suiteName = e
            }
            return e.prototype.get = function(e) {
                return localStorage.getItem(this.getKey(e))
            }, e.prototype.set = function(e, t) {
                localStorage.setItem(this.getKey(e), t)
            }, e.prototype.remove = function(e) {
                localStorage.removeItem(this.getKey(e))
            }, e.prototype.getKey = function(e) {
                return stitchPrefixKey + "." + this.suiteName + "." + e
            }, e
        }(),
        __extends$l = (h7 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                h7(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        h7, EventSourceEventStream = function(i) {
            function e(e, t, r, n) {
                var o = i.call(this, n) || this;
                return o.evtSrc = e, o.onOpenError = r, o.openedOnce = !1, o.evtSrc.onopen = function(e) {
                    t(o), o.openedOnce = !0
                }, o.reset(), o
            }
            return __extends$l(e, i), e.prototype.open = function() {
                if (this.closed) throw new StitchClientError(exports.StitchClientErrorCode.StreamClosed)
            }, e.prototype.afterClose = function() {
                this.evtSrc.close()
            }, e.prototype.onReconnect = function(e) {
                this.evtSrc = e.evtSrc, this.reset(), this.events = e.events.concat(this.events)
            }, e.prototype.reset = function() {
                var t = this;
                this.evtSrc.onmessage = function(e) {
                    t.events.push(new Event(Event.MESSAGE_EVENT, e.data)), t.poll()
                }, this.evtSrc.onerror = function(e) {
                    return e instanceof MessageEvent ? (t.lastErr = e.data, t.events.push(new Event(StitchEvent.ERROR_EVENT_NAME, t.lastErr)), t.close(), void t.poll()) : t.openedOnce ? (t.evtSrc.close(), void t.reconnect()) : (t.close(), void t.onOpenError(new Error("event source failed to open and will not reconnect; check network log for more details")))
                }
            }, e
        }(BaseEventStream),
        __extends$m = (C7 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                C7(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        C7, __assign = Object.assign || function(e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
                for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        },
        BrowserFetchStreamTransport = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return __extends$m(t, e), t.prototype.stream = function(e, t, n) {
                void 0 === t && (t = !0);
                var r = __assign({}, e.headers);
                return r[Headers.ACCEPT] = ContentTypes.TEXT_EVENT_STREAM, r[Headers.CONTENT_TYPE] = ContentTypes.TEXT_EVENT_STREAM, fetch$1(e.url + "&stitch_validate=true", {
                    body: e.body,
                    headers: r,
                    method: e.method,
                    mode: "cors"
                }).then(function(t) {
                    var r = {};
                    return t.headers.forEach(function(e, t) {
                        r[t] = e
                    }), t.status < 200 || 300 <= t.status ? t.text().then(function(e) {
                        return handleRequestError(new Response(r, t.status, e))
                    }) : new Promise(function(t, r) {
                        return new EventSourceEventStream(new EventSource(e.url), function(e) {
                            return t(e)
                        }, function(e) {
                            return r(e)
                        }, n ? function() {
                            return n().then(function(e) {
                                return e
                            })
                        } : void 0)
                    })
                })
            }, t
        }(BrowserFetchTransport),
        StitchServiceClientImpl = function() {
            function e(e) {
                this.proxy = e
            }
            return e.prototype.callFunction = function(e, t, r) {
                return this.proxy.callFunction(e, t, r)
            }, e.prototype.streamFunction = function(e, t, r) {
                return this.proxy.streamFunction(e, t, r)
            }, e
        }();

    function defaultSetTimout$1() {
        throw new Error("setTimeout has not been defined")
    }

    function defaultClearTimeout$1() {
        throw new Error("clearTimeout has not been defined")
    }
    var cachedSetTimeout$1 = defaultSetTimout$1,
        cachedClearTimeout$1 = defaultClearTimeout$1;

    function runTimeout$1(t) {
        if (cachedSetTimeout$1 === setTimeout) return setTimeout(t, 0);
        if ((cachedSetTimeout$1 === defaultSetTimout$1 || !cachedSetTimeout$1) && setTimeout) return cachedSetTimeout$1 = setTimeout, setTimeout(t, 0);
        try {
            return cachedSetTimeout$1(t, 0)
        } catch (e) {
            try {
                return cachedSetTimeout$1.call(null, t, 0)
            } catch (e) {
                return cachedSetTimeout$1.call(this, t, 0)
            }
        }
    }

    function runClearTimeout$1(t) {
        if (cachedClearTimeout$1 === clearTimeout) return clearTimeout(t);
        if ((cachedClearTimeout$1 === defaultClearTimeout$1 || !cachedClearTimeout$1) && clearTimeout) return cachedClearTimeout$1 = clearTimeout, clearTimeout(t);
        try {
            return cachedClearTimeout$1(t)
        } catch (e) {
            try {
                return cachedClearTimeout$1.call(null, t)
            } catch (e) {
                return cachedClearTimeout$1.call(this, t)
            }
        }
    }
    "function" == typeof global$1.setTimeout && (cachedSetTimeout$1 = setTimeout), "function" == typeof global$1.clearTimeout && (cachedClearTimeout$1 = clearTimeout);
    var queue$1 = [],
        draining$1 = !1,
        currentQueue$1, queueIndex$1 = -1;

    function cleanUpNextTick$1() {
        draining$1 && currentQueue$1 && (draining$1 = !1, currentQueue$1.length ? queue$1 = currentQueue$1.concat(queue$1) : queueIndex$1 = -1, queue$1.length && drainQueue$1())
    }

    function drainQueue$1() {
        if (!draining$1) {
            var e = runTimeout$1(cleanUpNextTick$1);
            draining$1 = !0;
            for (var t = queue$1.length; t;) {
                for (currentQueue$1 = queue$1, queue$1 = []; ++queueIndex$1 < t;) currentQueue$1 && currentQueue$1[queueIndex$1].run();
                queueIndex$1 = -1, t = queue$1.length
            }
            currentQueue$1 = null, draining$1 = !1, runClearTimeout$1(e)
        }
    }

    function nextTick$1(e) {
        var t = new Array(arguments.length - 1);
        if (1 < arguments.length)
            for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        queue$1.push(new Item$1(e, t)), 1 !== queue$1.length || draining$1 || runTimeout$1(drainQueue$1)
    }

    function Item$1(e, t) {
        this.fun = e, this.array = t
    }
    Item$1.prototype.run = function() {
        this.fun.apply(null, this.array)
    };
    var title$1 = "browser",
        platform$1 = "browser",
        browser$1 = !0,
        env$1 = {},
        argv$1 = [],
        version$1 = "",
        versions$1 = {},
        release$1 = {},
        config$1 = {};

    function noop$1() {}
    var on$1 = noop$1,
        addListener$1 = noop$1,
        once$1 = noop$1,
        off$1 = noop$1,
        removeListener$1 = noop$1,
        removeAllListeners$1 = noop$1,
        emit$1 = noop$1;

    function binding$1(e) {
        throw new Error("process.binding is not supported")
    }

    function cwd$1() {
        return "/"
    }

    function chdir$1(e) {
        throw new Error("process.chdir is not supported")
    }

    function umask$1() {
        return 0
    }
    var performance$1 = global$1.performance || {},
        performanceNow$1 = performance$1.now || performance$1.mozNow || performance$1.msNow || performance$1.oNow || performance$1.webkitNow || function() {
            return (new Date).getTime()
        };

    function hrtime$1(e) {
        var t = .001 * performanceNow$1.call(performance$1),
            r = Math.floor(t),
            n = Math.floor(t % 1 * 1e9);
        return e && (r -= e[0], (n -= e[1]) < 0 && (r--, n += 1e9)), [r, n]
    }
    var startTime$1 = new Date;

    function uptime$1() {
        return (new Date - startTime$1) / 1e3
    }
    var process$1 = {
        nextTick: nextTick$1,
        title: title$1,
        browser: browser$1,
        env: env$1,
        argv: argv$1,
        version: version$1,
        versions: versions$1,
        on: on$1,
        addListener: addListener$1,
        once: once$1,
        off: off$1,
        removeListener: removeListener$1,
        removeAllListeners: removeAllListeners$1,
        emit: emit$1,
        binding: binding$1,
        cwd: cwd$1,
        chdir: chdir$1,
        umask: umask$1,
        hrtime: hrtime$1,
        platform: platform$1,
        release: release$1,
        config: config$1,
        uptime: uptime$1
    };

    function detect() {
        return "undefined" != typeof navigator ? parseUserAgent(navigator.userAgent) : getNodeVersion()
    }

    function detectOS(t) {
        var e = getOperatingSystemRules().filter(function(e) {
            return e.rule && e.rule.test(t)
        })[0];
        return e ? e.name : null
    }

    function getNodeVersion() {
        return void 0 !== process$1 && process$1.version && {
            name: "node",
            version: process$1.version.slice(1),
            os: process$1.platform
        }
    }

    function parseUserAgent(n) {
        var e = getBrowserRules();
        if (!n) return null;
        var t = e.map(function(e) {
            var t = e.rule.exec(n),
                r = t && t[1].split(/[._]/).slice(0, 3);
            return r && r.length < 3 && (r = r.concat(1 == r.length ? [0, 0] : [0])), t && {
                name: e.name,
                version: r.join(".")
            }
        }).filter(Boolean)[0] || null;
        return t && (t.os = detectOS(n)), /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/i.test(n) && ((t = t || {}).bot = !0), t
    }

    function getBrowserRules() {
        return buildRules([
            ["aol", /AOLShield\/([0-9\._]+)/],
            ["edge", /Edge\/([0-9\._]+)/],
            ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
            ["vivaldi", /Vivaldi\/([0-9\.]+)/],
            ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
            ["samsung", /SamsungBrowser\/([0-9\.]+)/],
            ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
            ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
            ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
            ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
            ["fxios", /FxiOS\/([0-9\.]+)/],
            ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
            ["opera", /OPR\/([0-9\.]+)(:?\s|$)$/],
            ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
            ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
            ["ie", /MSIE\s(7\.0)/],
            ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
            ["android", /Android\s([0-9\.]+)/],
            ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
            ["safari", /Version\/([0-9\._]+).*Safari/],
            ["facebook", /FBAV\/([0-9\.]+)/],
            ["instagram", /Instagram\s([0-9\.]+)/],
            ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/]
        ])
    }

    function getOperatingSystemRules() {
        return buildRules([
            ["iOS", /iP(hone|od|ad)/],
            ["Android OS", /Android/],
            ["BlackBerry OS", /BlackBerry|BB10/],
            ["Windows Mobile", /IEMobile/],
            ["Amazon OS", /Kindle/],
            ["Windows 3.11", /Win16/],
            ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
            ["Windows 98", /(Windows 98)|(Win98)/],
            ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
            ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
            ["Windows Server 2003", /(Windows NT 5.2)/],
            ["Windows Vista", /(Windows NT 6.0)/],
            ["Windows 7", /(Windows NT 6.1)/],
            ["Windows 8", /(Windows NT 6.2)/],
            ["Windows 8.1", /(Windows NT 6.3)/],
            ["Windows 10", /(Windows NT 10.0)/],
            ["Windows ME", /Windows ME/],
            ["Open BSD", /OpenBSD/],
            ["Sun OS", /SunOS/],
            ["Linux", /(Linux)|(X11)/],
            ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
            ["QNX", /QNX/],
            ["BeOS", /BeOS/],
            ["OS/2", /OS\/2/],
            ["Search Bot", /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/]
        ])
    }

    function buildRules(e) {
        return e.map(function(e) {
            return {
                name: e[0],
                rule: e[1]
            }
        })
    }
    var detectBrowser = {
            detect: detect,
            detectOS: detectOS,
            getNodeVersion: getNodeVersion,
            parseUserAgent: parseUserAgent
        },
        detectBrowser_1 = detectBrowser.detect,
        version$2 = "4.9.0",
        RedirectFragmentFields, U8;
    U8 = RedirectFragmentFields || (RedirectFragmentFields = {}), U8.StitchError = "_stitch_error", U8.State = "_stitch_state", U8.UserAuth = "_stitch_ua", U8.LinkUser = "_stitch_link_user", U8.StitchLink = "_stitch_link", U8.ClientAppId = "_stitch_client_app_id";
    var RedirectFragmentFields$1 = RedirectFragmentFields,
        RedirectKeys, V8;
    V8 = RedirectKeys || (RedirectKeys = {}), V8.ProviderName = "_stitch_redirect_provider_name", V8.ProviderType = "_stitch_redirect_provider_type", V8.State = "_stitch_redirect_state";
    var RedirectKeys$1 = RedirectKeys,
        __extends$n = (W8 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                W8(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        W8, StitchRedirectError = function(t) {
            function e(e) {
                return t.call(this, e) || this
            }
            return __extends$n(e, t), e
        }(StitchError),
        __extends$o = (g9 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                g9(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        g9, StitchUserImpl = function(c) {
            function e(e, t, r, n, o, i, s, u) {
                var a = c.call(this, e, t, r, n, o, i, u) || this;
                return a.auth = s, a
            }
            return __extends$o(e, c), e.prototype.linkWithCredential = function(e) {
                return this.auth.linkWithCredential(this, e)
            }, e.prototype.linkUserWithRedirect = function(e) {
                return this.auth.linkWithRedirectInternal(this, e)
            }, e
        }(CoreStitchUserImpl),
        StitchUserFactoryImpl = function() {
            function e(e) {
                this.auth = e
            }
            return e.prototype.makeUser = function(e, t, r, n, o, i, s) {
                return new StitchUserImpl(e, t, r, n, o, i, this.auth, s)
            }, e
        }(),
        __extends$p = (L9 = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                L9(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        L9, __read$1 = function(e, t) {
            var r = "function" == typeof Symbol && e[Symbol.iterator];
            if (!r) return e;
            var n, o, i = r.call(e),
                s = [];
            try {
                for (;
                    (void 0 === t || 0 < t--) && !(n = i.next()).done;) s.push(n.value)
            } catch (e) {
                o = {
                    error: e
                }
            } finally {
                try {
                    n && !n.done && (r = i.return) && r.call(i)
                } finally {
                    if (o) throw o.error
                }
            }
            return s
        },
        alphaNumericCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        StitchAuthImpl = function(s) {
            function u(e, t, r, n, o) {
                void 0 === o && (o = window);
                var i = s.call(this, e, t, r) || this;
                return i.browserAuthRoutes = t, i.authStorage = r, i.appInfo = n, i.jsdomWindow = o, i.listeners = new Set, i.synchronousListeners = new Set, i
            }
            return __extends$p(u, s), Object.defineProperty(u.prototype, "userFactory", {
                get: function() {
                    return new StitchUserFactoryImpl(this)
                },
                enumerable: !0,
                configurable: !0
            }), u.prototype.getProviderClient = function(e, t) {
                return isAuthProviderClientFactory(e) ? e.getClient(this, this.requestClient, this.authRoutes) : e.getNamedClient(t, this.requestClient, this.authRoutes)
            }, u.prototype.loginWithCredential = function(e) {
                return s.prototype.loginWithCredentialInternal.call(this, e)
            }, u.prototype.loginWithRedirect = function(t) {
                var r = this,
                    e = this.prepareRedirect(t),
                    n = e.redirectUrl,
                    o = e.state;
                this.requestClient.getBaseURL().then(function(e) {
                    r.jsdomWindow.location.replace(e + r.browserAuthRoutes.getAuthProviderRedirectRoute(t, n, o, r.deviceInfo))
                })
            }, u.prototype.linkWithRedirectInternal = function(e, r) {
                var n = this;
                if (void 0 !== this.user && e.id !== this.user.id) return Promise.reject(new StitchClientError(exports.StitchClientErrorCode.UserNoLongerValid));
                var t = this.prepareRedirect(r),
                    o = t.redirectUrl,
                    i = t.state;
                return this.requestClient.getBaseURL().then(function(e) {
                    var t = e + n.browserAuthRoutes.getAuthProviderLinkRedirectRoute(r, o, i, n.deviceInfo);
                    return (u.injectedFetch ? u.injectedFetch : fetch)(new Request(t, {
                        credentials: "include",
                        headers: {
                            Authorization: "Bearer " + n.authInfo.accessToken
                        },
                        mode: "cors"
                    }))
                }).then(function(e) {
                    n.jsdomWindow.location.replace(e.headers.get("X-Stitch-Location"))
                })
            }, u.prototype.hasRedirectResult = function() {
                var e = !1;
                try {
                    return e = this.parseRedirect().isValid
                } catch (e) {
                    return !1
                } finally {
                    e || this.cleanupRedirect()
                }
            }, u.prototype.handleRedirectResult = function() {
                try {
                    var e = this.authStorage.get(RedirectKeys$1.ProviderName),
                        t = this.authStorage.get(RedirectKeys$1.ProviderType),
                        r = this.parseRedirect();
                    return this.loginWithCredentialInternal(new StitchAuthResponseCredential(this.processRedirectResult(r), t, e, r.asLink)).then(function(e) {
                        return e
                    })
                } catch (e) {
                    return Promise.reject(e)
                }
            }, u.prototype.linkWithCredential = function(e, t) {
                return s.prototype.linkUserWithCredentialInternal.call(this, e, t)
            }, u.prototype.logout = function() {
                return 0 < arguments.length ? Promise.reject(new StitchClientError(exports.StitchClientErrorCode.UnexpectedArguments)) : s.prototype.logoutInternal.call(this)
            }, u.prototype.logoutUserWithId = function(e) {
                return s.prototype.logoutUserWithIdInternal.call(this, e)
            }, u.prototype.removeUser = function() {
                return 0 < arguments.length ? Promise.reject(new StitchClientError(exports.StitchClientErrorCode.UnexpectedArguments)) : s.prototype.removeUserInternal.call(this)
            }, u.prototype.removeUserWithId = function(e) {
                return s.prototype.removeUserWithIdInternal.call(this, e)
            }, Object.defineProperty(u.prototype, "deviceInfo", {
                get: function() {
                    var e = {};
                    this.hasDeviceId && (e[DeviceFields$1.DEVICE_ID] = this.deviceId), void 0 !== this.appInfo.localAppName && (e[DeviceFields$1.APP_ID] = this.appInfo.localAppName), void 0 !== this.appInfo.localAppVersion && (e[DeviceFields$1.APP_VERSION] = this.appInfo.localAppVersion);
                    var t = detectBrowser_1();
                    return t ? (e[DeviceFields$1.PLATFORM] = t.name, e[DeviceFields$1.PLATFORM_VERSION] = t.version) : (e[DeviceFields$1.PLATFORM] = "web", e[DeviceFields$1.PLATFORM_VERSION] = "0.0.0"), e[DeviceFields$1.SDK_VERSION] = version$2, e
                },
                enumerable: !0,
                configurable: !0
            }), u.prototype.addAuthListener = function(e) {
                this.listeners.add(e), this.onAuthEvent(e), this.dispatchAuthEvent({
                    kind: AuthEventKind.ListenerRegistered
                })
            }, u.prototype.addSynchronousAuthListener = function(e) {
                this.listeners.add(e), this.onAuthEvent(e), this.dispatchAuthEvent({
                    kind: AuthEventKind.ListenerRegistered
                })
            }, u.prototype.removeAuthListener = function(e) {
                this.listeners.delete(e)
            }, u.prototype.onAuthEvent = function(t) {
                var r = this;
                if (t) new Promise(function(e) {
                    t.onAuthEvent && t.onAuthEvent(r), e(void 0)
                });
                else this.listeners.forEach(function(e) {
                    r.onAuthEvent(e)
                })
            }, u.prototype.dispatchAuthEvent = function(t) {
                var r = this;
                switch (t.kind) {
                    case AuthEventKind.ActiveUserChanged:
                        this.dispatchBlockToListeners(function(e) {
                            e.onActiveUserChanged && e.onActiveUserChanged(r, t.currentActiveUser, t.previousActiveUser)
                        });
                        break;
                    case AuthEventKind.ListenerRegistered:
                        this.dispatchBlockToListeners(function(e) {
                            e.onListenerRegistered && e.onListenerRegistered(r)
                        });
                        break;
                    case AuthEventKind.UserAdded:
                        this.dispatchBlockToListeners(function(e) {
                            e.onUserAdded && e.onUserAdded(r, t.addedUser)
                        });
                        break;
                    case AuthEventKind.UserLinked:
                        this.dispatchBlockToListeners(function(e) {
                            e.onUserLinked && e.onUserLinked(r, t.linkedUser)
                        });
                        break;
                    case AuthEventKind.UserLoggedIn:
                        this.dispatchBlockToListeners(function(e) {
                            e.onUserLoggedIn && e.onUserLoggedIn(r, t.loggedInUser)
                        });
                        break;
                    case AuthEventKind.UserLoggedOut:
                        this.dispatchBlockToListeners(function(e) {
                            e.onUserLoggedOut && e.onUserLoggedOut(r, t.loggedOutUser)
                        });
                        break;
                    case AuthEventKind.UserRemoved:
                        this.dispatchBlockToListeners(function(e) {
                            e.onUserRemoved && e.onUserRemoved(r, t.removedUser)
                        });
                        break;
                    default:
                        return this.assertNever(t)
                }
            }, u.prototype.refreshCustomData = function() {
                return this.refreshAccessToken()
            }, u.prototype.assertNever = function(e) {
                throw new Error("unexpected object: " + e)
            }, u.prototype.dispatchBlockToListeners = function(r) {
                this.synchronousListeners.forEach(r), this.listeners.forEach(function(t) {
                    new Promise(function(e) {
                        r(t), e(void 0)
                    })
                })
            }, u.prototype.cleanupRedirect = function() {
                this.jsdomWindow.history.replaceState(null, "", this.pageRootUrl()), this.authStorage.remove(RedirectKeys$1.State), this.authStorage.remove(RedirectKeys$1.ProviderName), this.authStorage.remove(RedirectKeys$1.ProviderType)
            }, u.prototype.parseRedirect = function() {
                if (void 0 === this.jsdomWindow) throw new StitchRedirectError("running in a non-browser environment");
                if (!this.jsdomWindow.location || !this.jsdomWindow.location.hash) throw new StitchRedirectError("window location hash was undefined");
                var e = this.authStorage.get(RedirectKeys$1.State);
                return parseRedirectFragment(this.jsdomWindow.location.hash.substring(1), e, this.appInfo.clientAppId)
            }, u.prototype.processRedirectResult = function(e) {
                try {
                    if (!e.isValid) throw new StitchRedirectError("invalid redirect result");
                    if (e.lastError) throw new StitchRedirectError("error handling redirect: " + e.lastError);
                    if (!e.authInfo) throw new StitchRedirectError("no user auth value was found: it could not be decoded from fragment")
                } catch (e) {
                    throw e
                } finally {
                    this.cleanupRedirect()
                }
                return e.authInfo
            }, u.prototype.prepareRedirect = function(e) {
                this.authStorage.set(RedirectKeys$1.ProviderName, e.providerName), this.authStorage.set(RedirectKeys$1.ProviderType, e.providerType);
                var t = e.redirectUrl;
                void 0 === t && (t = this.pageRootUrl());
                var r = generateState();
                return this.authStorage.set(RedirectKeys$1.State, r), {
                    redirectUrl: t,
                    state: r
                }
            }, u.prototype.pageRootUrl = function() {
                return [this.jsdomWindow.location.protocol, "//", this.jsdomWindow.location.host, this.jsdomWindow.location.pathname].join("")
            }, u
        }(CoreStitchAuth);

    function generateState() {
        for (var e = "", t = 0; t < 64; ++t) e += alphaNumericCharacters.charAt(Math.floor(Math.random() * alphaNumericCharacters.length));
        return e
    }

    function unmarshallUserAuth(e) {
        var t = e.split("$");
        if (4 !== t.length) throw new StitchRedirectError("invalid user auth data provided while marshalling user authentication data: " + e);
        var r = __read$1(t, 4),
            n = r[0],
            o = r[1],
            i = r[2],
            s = r[3];
        return new AuthInfo(i, s, n, o)
    }
    var ParsedRedirectFragment = function() {
        function e() {
            this.stateValid = !1, this.clientAppIdValid = !1, this.asLink = !1
        }
        return Object.defineProperty(e.prototype, "isValid", {
            get: function() {
                return this.stateValid && this.clientAppIdValid
            },
            enumerable: !0,
            configurable: !0
        }), e
    }();

    function parseRedirectFragment(e, o, i) {
        var t = e.split("&"),
            s = new ParsedRedirectFragment;
        return t.forEach(function(e) {
            var t = e.split("=");
            switch (decodeURIComponent(t[0])) {
                case RedirectFragmentFields$1.StitchError:
                    s.lastError = decodeURIComponent(t[1]);
                    break;
                case RedirectFragmentFields$1.UserAuth:
                    try {
                        s.authInfo = unmarshallUserAuth(decodeURIComponent(t[1]))
                    } catch (e) {
                        s.lastError = e
                    }
                    break;
                case RedirectFragmentFields$1.StitchLink:
                    "ok" === t[1] && (s.asLink = !0);
                    break;
                case RedirectFragmentFields$1.State:
                    var r = decodeURIComponent(t[1]);
                    o === r && (s.stateValid = !0);
                    break;
                case RedirectFragmentFields$1.ClientAppId:
                    var n = decodeURIComponent(t[1]);
                    i === n && (s.clientAppIdValid = !0)
            }
        }), s
    }

    function isAuthProviderClientFactory(e) {
        return void 0 !== e.getClient
    }
    var __extends$q = (Kba = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                Kba(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        Kba, StitchBrowserAppAuthRoutes = function(t) {
            function e(e) {
                return t.call(this, e) || this
            }
            return __extends$q(e, t), e.prototype.getAuthProviderRedirectRoute = function(e, t, r, n) {
                return this.getAuthProviderLoginRoute(e.providerName) + "?redirect=" + encodeURI(t) + "&state=" + r + "&device=" + this.uriEncodeObject(n)
            }, e.prototype.getAuthProviderLinkRedirectRoute = function(e, t, r, n) {
                return this.getAuthProviderLoginRoute(e.providerName) + "?redirect=" + encodeURI(t) + "&state=" + r + "&device=" + this.uriEncodeObject(n) + "&link=true&providerRedirectHeader=true"
            }, e.prototype.uriEncodeObject = function(e) {
                return encodeURIComponent(base64Encode(JSON.stringify(e)))
            }, e
        }(StitchAppAuthRoutes),
        __extends$r = (dca = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function(e, t) {
                function r() {
                    this.constructor = e
                }
                dca(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }),
        dca, StitchBrowserAppRoutes = function(r) {
            function e(e) {
                var t = r.call(this, e) || this;
                return t.authRoutes = new StitchBrowserAppAuthRoutes(e), t
            }
            return __extends$r(e, r), e
        }(StitchAppRoutes),
        StitchAppClientImpl = function() {
            function e(e, t) {
                this.info = new StitchAppClientInfo(e, t.dataDirectory, t.localAppName, t.localAppVersion), this.routes = new StitchBrowserAppRoutes(this.info.clientAppId);
                var r = new StitchAppRequestClient(e, t.baseUrl, t.transport);
                this.auth = new StitchAuthImpl(r, this.routes.authRoutes, t.storage, this.info), this.coreClient = new CoreStitchAppClient(this.auth, this.routes), this.serviceClients = [], this.auth.addSynchronousAuthListener(this)
            }
            return e.prototype.getServiceClient = function(e, t) {
                if (isServiceClientFactory(e)) {
                    var r = new CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, "");
                    return this.bindServiceClient(r), e.getClient(r, this.info)
                }
                r = new CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, t);
                return this.bindServiceClient(r), e.getNamedClient(r, this.info)
            }, e.prototype.getGeneralServiceClient = function(e) {
                var t = new CoreStitchServiceClientImpl(this.auth, this.routes.serviceRoutes, e);
                return this.bindServiceClient(t), new StitchServiceClientImpl(t)
            }, e.prototype.callFunction = function(e, t) {
                return this.coreClient.callFunction(e, t)
            }, e.prototype.onActiveUserChanged = function(e, t, r) {
                this.onRebindEvent(new AuthRebindEvent({
                    currentActiveUser: t,
                    kind: AuthEventKind.ActiveUserChanged,
                    previousActiveUser: r
                }))
            }, e.prototype.bindServiceClient = function(e) {
                this.serviceClients.push(e)
            }, e.prototype.onRebindEvent = function(t) {
                this.serviceClients.forEach(function(e) {
                    e.onRebindEvent(t)
                })
            }, e
        }();

    function isServiceClientFactory(e) {
        return void 0 !== e.getClient
    }
    var DEFAULT_BASE_URL = "https://stitch.mongodb.com",
        appClients = {},
        Stitch = function() {
            function o() {}
            return Object.defineProperty(o, "defaultAppClient", {
                get: function() {
                    if (void 0 === o.defaultClientAppId) throw new Error("default app client has not yet been initialized/set");
                    return appClients[o.defaultClientAppId]
                },
                enumerable: !0,
                configurable: !0
            }), o.getAppClient = function(e) {
                if (void 0 === appClients[e]) throw new Error("client for app '" + e + "' has not yet been initialized");
                return appClients[e]
            }, o.hasAppClient = function(e) {
                return void 0 !== appClients[e]
            }, o.initializeDefaultAppClient = function(e, t) {
                if (void 0 === t && (t = (new exports.StitchAppClientConfiguration.Builder).build()), void 0 === e || "" === e) throw new Error("clientAppId must be set to a non-empty string");
                if (void 0 !== o.defaultClientAppId) throw new Error("default app can only be set once; currently set to '" + o.defaultClientAppId + "'");
                var r = o.initializeAppClient(e, t);
                return o.defaultClientAppId = e, r
            }, o.initializeAppClient = function(e, t) {
                if (void 0 === t && (t = (new exports.StitchAppClientConfiguration.Builder).build()), void 0 === e || "" === e) throw new Error("clientAppId must be set to a non-empty string");
                if (void 0 !== appClients[e]) throw new Error("client for app '" + e + "' has already been initialized");
                var r = t.builder ? t.builder() : new exports.StitchAppClientConfiguration.Builder(t);
                void 0 === r.storage && r.withStorage(new LocalStorage(e)), void 0 === r.transport && (window.EventSource ? r.withTransport(new BrowserFetchStreamTransport) : r.withTransport(new BrowserFetchTransport)), void 0 !== r.baseUrl && "" !== r.baseUrl || r.withBaseUrl(DEFAULT_BASE_URL), void 0 !== r.localAppName && "" !== r.localAppName || r.withLocalAppName(o.localAppName), void 0 !== r.localAppVersion && "" !== r.localAppVersion || r.withLocalAppVersion(o.localAppVersion);
                var n = new StitchAppClientImpl(e, r.build());
                return appClients[e] = n
            }, o.clearApps = function() {
                appClients = {}
            }, o
        }(),
        CoreRemoteMongoReadOperation = function() {
            function e(e, t, r, n) {
                this.command = e, this.args = t, this.service = r, n && (this.collectionDecoder = new(function() {
                    function e() {}
                    return e.prototype.decode = function(e) {
                        return e instanceof Array ? e.map(function(e) {
                            return n.decode(e)
                        }) : [n.decode(e)]
                    }, e
                }()))
            }
            return e.prototype.iterator = function() {
                return this.executeRead().then(function(e) {
                    return e[Symbol.iterator]()
                })
            }, e.prototype.first = function() {
                return this.executeRead().then(function(e) {
                    return e[0]
                })
            }, e.prototype.toArray = function() {
                return this.executeRead()
            }, e.prototype.asArray = function() {
                return this.toArray()
            }, e.prototype.executeRead = function() {
                return this.service.callFunction(this.command, [this.args], this.collectionDecoder)
            }, e
        }(),
        OperationType, ada;

    function operationTypeFromRemote(e) {
        switch (e) {
            case "insert":
                return OperationType.Insert;
            case "delete":
                return OperationType.Delete;
            case "replace":
                return OperationType.Replace;
            case "update":
                return OperationType.Update;
            default:
                return OperationType.Unknown
        }
    }
    ada = OperationType || (OperationType = {}), ada.Insert = "insert", ada.Delete = "delete", ada.Replace = "replace", ada.Update = "update", ada.Unknown = "unknown";
    var RemoteInsertManyResult = function(e) {
            var r = {};
            e.forEach(function(e, t) {
                r[t] = e
            }), this.insertedIds = r
        },
        RemoteInsertManyResultFields, RemoteInsertOneResultFields, RemoteUpdateResultFields, jda, RemoteDeleteResultFields, UpdateDescriptionFields, lda, ChangeEventFields, mda, CompactChangeEventFields, nda;
    (RemoteInsertManyResultFields || (RemoteInsertManyResultFields = {})).InsertedIds = "insertedIds", (RemoteInsertOneResultFields || (RemoteInsertOneResultFields = {})).InsertedId = "insertedId", jda = RemoteUpdateResultFields || (RemoteUpdateResultFields = {}), jda.MatchedCount = "matchedCount", jda.ModifiedCount = "modifiedCount", jda.UpsertedId = "upsertedId", (RemoteDeleteResultFields || (RemoteDeleteResultFields = {})).DeletedCount = "deletedCount", lda = UpdateDescriptionFields || (UpdateDescriptionFields = {}), lda.UpdatedFields = "updatedFields", lda.RemovedFields = "removedFields", mda = ChangeEventFields || (ChangeEventFields = {}), mda.Id = "_id", mda.OperationType = "operationType", mda.FullDocument = "fullDocument", mda.DocumentKey = "documentKey", mda.Namespace = "ns", mda.NamespaceDb = "db", mda.NamespaceColl = "coll", mda.UpdateDescription = "updateDescription", nda = CompactChangeEventFields || (CompactChangeEventFields = {}), nda.OperationType = "ot", nda.FullDocument = "fd", nda.DocumentKey = "dk", nda.UpdateDescription = "ud", nda.StitchDocumentVersion = "sdv", nda.StitchDocumentHash = "sdh";
    var RemoteInsertManyResultDecoder = function() {
            function e() {}
            return e.prototype.decode = function(e) {
                return new RemoteInsertManyResult(e[RemoteInsertManyResultFields.InsertedIds])
            }, e
        }(),
        RemoteInsertOneResultDecoder = function() {
            function e() {}
            return e.prototype.decode = function(e) {
                return {
                    insertedId: e[RemoteInsertOneResultFields.InsertedId]
                }
            }, e
        }(),
        RemoteUpdateResultDecoder = function() {
            function e() {}
            return e.prototype.decode = function(e) {
                return {
                    matchedCount: e[RemoteUpdateResultFields.MatchedCount],
                    modifiedCount: e[RemoteUpdateResultFields.ModifiedCount],
                    upsertedId: e[RemoteUpdateResultFields.UpsertedId]
                }
            }, e
        }(),
        RemoteDeleteResultDecoder = function() {
            function e() {}
            return e.prototype.decode = function(e) {
                return {
                    deletedCount: e[RemoteDeleteResultFields.DeletedCount]
                }
            }, e
        }(),
        UpdateDescriptionDecoder = function() {
            function e() {}
            return e.prototype.decode = function(e) {
                return Assertions.keyPresent(UpdateDescriptionFields.UpdatedFields, e), Assertions.keyPresent(UpdateDescriptionFields.RemovedFields, e), {
                    removedFields: e[UpdateDescriptionFields.RemovedFields],
                    updatedFields: e[UpdateDescriptionFields.UpdatedFields]
                }
            }, e
        }();

    function decodeBaseChangeEventFields(e, t, r, n) {
        var o, i;
        return o = t in e ? ResultDecoders.updateDescriptionDecoder.decode(e[t]) : void 0, r in e ? (i = e[r], n && (i = n.decode(i))) : i = void 0, {
            updateDescription: o,
            fullDocument: i
        }
    }
    var ChangeEventDecoder = function() {
            function e(e) {
                this.decoder = e
            }
            return e.prototype.decode = function(e) {
                Assertions.keyPresent(ChangeEventFields.Id, e), Assertions.keyPresent(ChangeEventFields.OperationType, e), Assertions.keyPresent(ChangeEventFields.Namespace, e), Assertions.keyPresent(ChangeEventFields.DocumentKey, e);
                var t = e[ChangeEventFields.Namespace],
                    r = decodeBaseChangeEventFields(e, ChangeEventFields.UpdateDescription, ChangeEventFields.FullDocument, this.decoder),
                    n = r.updateDescription,
                    o = r.fullDocument;
                return {
                    documentKey: e[ChangeEventFields.DocumentKey],
                    fullDocument: o,
                    id: e[ChangeEventFields.Id],
                    namespace: {
                        collection: t[ChangeEventFields.NamespaceColl],
                        database: t[ChangeEventFields.NamespaceDb]
                    },
                    operationType: operationTypeFromRemote(e[ChangeEventFields.OperationType]),
                    updateDescription: n
                }
            }, e
        }(),
        CompactChangeEventDecoder = function() {
            function e(e) {
                this.decoder = e
            }
            return e.prototype.decode = function(e) {
                Assertions.keyPresent(CompactChangeEventFields.OperationType, e), Assertions.keyPresent(CompactChangeEventFields.DocumentKey, e);
                var t, r, n = decodeBaseChangeEventFields(e, CompactChangeEventFields.UpdateDescription, CompactChangeEventFields.FullDocument, this.decoder),
                    o = n.updateDescription,
                    i = n.fullDocument;
                return t = CompactChangeEventFields.StitchDocumentVersion in e ? e[CompactChangeEventFields.StitchDocumentVersion] : void 0, r = CompactChangeEventFields.StitchDocumentHash in e ? e[CompactChangeEventFields.StitchDocumentHash] : void 0, {
                    documentKey: e[CompactChangeEventFields.DocumentKey],
                    fullDocument: i,
                    operationType: operationTypeFromRemote(e[CompactChangeEventFields.OperationType]),
                    stitchDocumentHash: r,
                    stitchDocumentVersion: t,
                    updateDescription: o
                }
            }, e
        }(),
        ResultDecoders = function() {
            function e() {}
            return e.remoteInsertManyResultDecoder = new RemoteInsertManyResultDecoder, e.remoteInsertOneResultDecoder = new RemoteInsertOneResultDecoder, e.remoteUpdateResultDecoder = new RemoteUpdateResultDecoder, e.remoteDeleteResultDecoder = new RemoteDeleteResultDecoder, e.updateDescriptionDecoder = new UpdateDescriptionDecoder, e.ChangeEventDecoder = ChangeEventDecoder, e.CompactChangeEventDecoder = CompactChangeEventDecoder, e
        }(),
        __assign$1 = Object.assign || function(e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
                for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        },
        CoreRemoteMongoCollectionImpl = function() {
            function t(e, t, r, n) {
                var o = this;
                this.name = e, this.databaseName = t, this.service = r, this.codec = n, this.namespace = this.databaseName + "." + this.name, this.baseOperationArgs = {
                    collection: o.name,
                    database: o.databaseName
                }
            }
            return t.prototype.withCollectionType = function(e) {
                return new t(this.name, this.databaseName, this.service, e)
            }, t.prototype.find = function(e, t) {
                void 0 === e && (e = {});
                var r = __assign$1({}, this.baseOperationArgs);
                return r.query = e, t && (t.limit && (r.limit = t.limit), t.projection && (r.project = t.projection), t.sort && (r.sort = t.sort)), new CoreRemoteMongoReadOperation("find", r, this.service, this.codec)
            }, t.prototype.findOne = function(e, t) {
                void 0 === e && (e = {});
                var r = __assign$1({}, this.baseOperationArgs);
                return r.query = e, t && (t.projection && (r.project = t.projection), t.sort && (r.sort = t.sort)), this.service.callFunction("findOne", [r], this.codec)
            }, t.prototype.findOneAndUpdate = function(e, t, r) {
                var n = __assign$1({}, this.baseOperationArgs);
                return n.filter = e, n.update = t, r && (r.projection && (n.projection = r.projection), r.sort && (n.sort = r.sort), r.upsert && (n.upsert = !0), r.returnNewDocument && (n.returnNewDocument = !0)), this.service.callFunction("findOneAndUpdate", [n], this.codec)
            }, t.prototype.findOneAndReplace = function(e, t, r) {
                var n = __assign$1({}, this.baseOperationArgs);
                return n.filter = e, n.update = t, r && (r.projection && (n.projection = r.projection), r.sort && (n.sort = r.sort), r.upsert && (n.upsert = !0), r.returnNewDocument && (n.returnNewDocument = !0)), this.service.callFunction("findOneAndReplace", [n], this.codec)
            }, t.prototype.findOneAndDelete = function(e, t) {
                var r = __assign$1({}, this.baseOperationArgs);
                return r.filter = e, t && (t.projection && (r.projection = t.projection), t.sort && (r.sort = t.sort)), this.service.callFunction("findOneAndDelete", [r], this.codec)
            }, t.prototype.aggregate = function(e) {
                var t = __assign$1({}, this.baseOperationArgs);
                return t.pipeline = e, new CoreRemoteMongoReadOperation("aggregate", t, this.service, this.codec)
            }, t.prototype.count = function(e, t) {
                void 0 === e && (e = {});
                var r = __assign$1({}, this.baseOperationArgs);
                return r.query = e, t && t.limit && (r.limit = t.limit), this.service.callFunction("count", [r])
            }, t.prototype.insertOne = function(e) {
                var t = __assign$1({}, this.baseOperationArgs);
                return t.document = this.generateObjectIdIfMissing(this.codec ? this.codec.encode(e) : e), this.service.callFunction("insertOne", [t], ResultDecoders.remoteInsertOneResultDecoder)
            }, t.prototype.insertMany = function(e) {
                var t = this,
                    r = __assign$1({}, this.baseOperationArgs);
                return r.documents = e.map(function(e) {
                    return t.generateObjectIdIfMissing(t.codec ? t.codec.encode(e) : e)
                }), this.service.callFunction("insertMany", [r], ResultDecoders.remoteInsertManyResultDecoder)
            }, t.prototype.deleteOne = function(e) {
                return this.executeDelete(e, !1)
            }, t.prototype.deleteMany = function(e) {
                return this.executeDelete(e, !0)
            }, t.prototype.updateOne = function(e, t, r) {
                return this.executeUpdate(e, t, r, !1)
            }, t.prototype.updateMany = function(e, t, r) {
                return this.executeUpdate(e, t, r, !0)
            }, t.prototype.watch = function(e) {
                var t = __assign$1({}, this.baseOperationArgs);
                return void 0 !== e && (e instanceof Array ? 0 !== e.length && (t.ids = e) : e instanceof Object && (t.filter = e)), t.useCompactEvents = !1, this.service.streamFunction("watch", [t], new ResultDecoders.ChangeEventDecoder(this.codec))
            }, t.prototype.watchCompact = function(e) {
                var t = __assign$1({}, this.baseOperationArgs);
                return t.ids = e, t.useCompactEvents = !0, this.service.streamFunction("watch", [t], new ResultDecoders.CompactChangeEventDecoder(this.codec))
            }, t.prototype.executeDelete = function(e, t) {
                var r = __assign$1({}, this.baseOperationArgs);
                return r.query = e, this.service.callFunction(t ? "deleteMany" : "deleteOne", [r], ResultDecoders.remoteDeleteResultDecoder)
            }, t.prototype.executeUpdate = function(e, t, r, n) {
                void 0 === n && (n = !1);
                var o = __assign$1({}, this.baseOperationArgs);
                return o.query = e, o.update = t, r && r.upsert && (o.upsert = r.upsert), this.service.callFunction(n ? "updateMany" : "updateOne", [o], ResultDecoders.remoteUpdateResultDecoder)
            }, t.prototype.generateObjectIdIfMissing = function(e) {
                if (!e._id) {
                    var t = e;
                    return t._id = new bson.ObjectID, t
                }
                return e
            }, t
        }(),
        CoreRemoteMongoDatabaseImpl = function() {
            function e(e, t) {
                this.name = e, this.service = t
            }
            return e.prototype.collection = function(e, t) {
                return new CoreRemoteMongoCollectionImpl(e, this.name, this.service, t)
            }, e
        }(),
        CoreRemoteMongoClientImpl = function() {
            function e(e) {
                this.service = e
            }
            return e.prototype.db = function(e) {
                return new CoreRemoteMongoDatabaseImpl(e, this.service)
            }, e
        }(),
        RemoteMongoCursor = function() {
            function e(e) {
                this.proxy = e
            }
            return e.prototype.next = function() {
                return Promise.resolve(this.proxy.next().value)
            }, e
        }(),
        RemoteMongoReadOperation = function() {
            function e(e) {
                this.proxy = e
            }
            return e.prototype.first = function() {
                return this.proxy.first()
            }, e.prototype.toArray = function() {
                return this.proxy.toArray()
            }, e.prototype.asArray = function() {
                return this.toArray()
            }, e.prototype.iterator = function() {
                return this.proxy.iterator().then(function(e) {
                    return new RemoteMongoCursor(e)
                })
            }, e
        }(),
        RemoteMongoCollectionImpl = function() {
            function t(e) {
                this.proxy = e, this.namespace = this.proxy.namespace
            }
            return t.prototype.withCollectionType = function(e) {
                return new t(this.proxy.withCollectionType(e))
            }, t.prototype.count = function(e, t) {
                return this.proxy.count(e, t)
            }, t.prototype.find = function(e, t) {
                return new RemoteMongoReadOperation(this.proxy.find(e, t))
            }, t.prototype.findOne = function(e, t) {
                return this.proxy.findOne(e, t)
            }, t.prototype.findOneAndUpdate = function(e, t, r) {
                return this.proxy.findOneAndUpdate(e, t, r)
            }, t.prototype.findOneAndReplace = function(e, t, r) {
                return this.proxy.findOneAndReplace(e, t, r)
            }, t.prototype.findOneAndDelete = function(e, t) {
                return this.proxy.findOneAndDelete(e, t)
            }, t.prototype.aggregate = function(e) {
                return new RemoteMongoReadOperation(this.proxy.aggregate(e))
            }, t.prototype.insertOne = function(e) {
                return this.proxy.insertOne(e)
            }, t.prototype.insertMany = function(e) {
                return this.proxy.insertMany(e)
            }, t.prototype.deleteOne = function(e) {
                return this.proxy.deleteOne(e)
            }, t.prototype.deleteMany = function(e) {
                return this.proxy.deleteMany(e)
            }, t.prototype.updateOne = function(e, t, r) {
                return this.proxy.updateOne(e, t, r)
            }, t.prototype.updateMany = function(e, t, r) {
                return this.proxy.updateMany(e, t, r)
            }, t.prototype.watch = function(e) {
                return this.proxy.watch(e)
            }, t.prototype.watchCompact = function(e) {
                return this.proxy.watchCompact(e)
            }, t
        }(),
        RemoteMongoDatabaseImpl = function() {
            function e(e) {
                this.proxy = e, this.name = this.proxy.name
            }
            return e.prototype.collection = function(e, t) {
                return new RemoteMongoCollectionImpl(this.proxy.collection(e, t))
            }, e
        }(),
        RemoteMongoClientImpl = function() {
            function e(e) {
                this.proxy = e
            }
            return e.prototype.db = function(e) {
                return new RemoteMongoDatabaseImpl(this.proxy.db(e))
            }, e
        }();
    (exports.RemoteMongoClient || (exports.RemoteMongoClient = {})).factory = new(function() {
        function e() {}
        return e.prototype.getNamedClient = function(e, t) {
            return new RemoteMongoClientImpl(new CoreRemoteMongoClientImpl(e))
        }, e
    }()), exports.AnonymousAuthProvider = AnonymousAuthProvider, exports.AnonymousCredential = AnonymousCredential, exports.BSON = bson, exports.BrowserFetchTransport = BrowserFetchTransport, exports.CustomAuthProvider = CustomAuthProvider, exports.CustomCredential = CustomCredential, exports.FacebookAuthProvider = FacebookAuthProvider, exports.FacebookCredential = FacebookCredential, exports.FacebookRedirectCredential = FacebookRedirectCredential, exports.FunctionAuthProvider = FunctionAuthProvider, exports.FunctionCredential = FunctionCredential, exports.GoogleAuthProvider = GoogleAuthProvider, exports.GoogleCredential = GoogleCredential, exports.GoogleRedirectCredential = GoogleRedirectCredential, exports.MemoryStorage = MemoryStorage, exports.ServerApiKeyAuthProvider = ServerApiKeyAuthProvider, exports.ServerApiKeyCredential = ServerApiKeyCredential, exports.Stitch = Stitch, exports.StitchAppClientInfo = StitchAppClientInfo, exports.StitchClientError = StitchClientError, exports.StitchRequestError = StitchRequestError, exports.StitchServiceError = StitchServiceError, exports.StitchUserIdentity = StitchUserIdentity, exports.Stream = Stream, exports.UserApiKey = UserApiKey, exports.UserApiKeyAuthProvider = UserApiKeyAuthProvider, exports.UserApiKeyCredential = UserApiKeyCredential, exports.UserPasswordAuthProvider = UserPasswordAuthProvider, exports.UserPasswordCredential = UserPasswordCredential, exports.UserType = UserType$1, exports.RemoteInsertManyResult = RemoteInsertManyResult, exports.RemoteMongoReadOperation = RemoteMongoReadOperation
}(this.stitch = this.stitch || {});
