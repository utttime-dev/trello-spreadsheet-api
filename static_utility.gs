function getBoardId() {
  if (!TRELLO_API_KEY) {
    Logger.log('Set Api Key');
    return false;
  }
  else if (!TRELLO_TOKEN) {
    Logger.log('Set Token');
    return false
  }
  else if (!USER_NAME) {
    Logger.log('Set User Name');
    return false;
  }
  var url = 'https://trello.com/1/members/' + USER_NAME + '/boards?key=' + TRELLO_API_KEY + '&token=' + TRELLO_TOKEN + '&fields=name';
  res = JSON.parse(UrlFetchApp.fetch(url, {'method':'get'}));
  Logger.log(res);
  return res;
}

function getListIds() {
  if (!TRELLO_API_KEY) {
    Logger.log('Set Api Key');
    return false;
  }
  else if (!TRELLO_TOKEN) {
    Logger.log('Set Token');
    return false
  }
  else if (!BOARD_ID) {
    Logger.log('Set Board Id');
    return false;
  }
  var url = "https://trello.com/1/boards/" + BOARD_ID + "/lists?key=" + TRELLO_API_KEY + "&token=" + TRELLO_TOKEN + "&fields=name";
  res = JSON.parse(UrlFetchApp.fetch(url, {'method':'get'}));
  Logger.log(res);
  return res;
}

// ボードに参加している人数を算出する
function getMembers() {
  if (!TRELLO_API_KEY) {
    Logger.log('Set Api Key');
    return false;
  }
  else if (!TRELLO_TOKEN) {
    Logger.log('Set Token');
    return false
  }
  else if (!BOARD_ID) {
    Logger.log('Set Board Id');
    return false;
  }
  var url = "https://trello.com/1/boards/" + BOARD_ID + "/members?key=" + TRELLO_API_KEY + "&token=" + TRELLO_TOKEN + "&fields=username,fullName";
  res = JSON.parse(UrlFetchApp.fetch(url, {'method':'get'}));
  Logger.log(res);
  return res;
}

// Board上の全チケットの報酬を算出する
function getTotalPaymentOnBoard() {
  var lists = Object.keys(LIST_IDS);
  var payment = 0.0;
  for (let j = 0; j < lists.length; j++){
    var card_infos = getCardInfos(lists[j]);
    if ( !card_infos ) continue;
    for (let i =0; i < card_infos.length; i++) {
      let card  = new Card(card_infos[i].id, card_infos[i].idMembers, card_infos[i].idLabels, card_infos[i].shortUrl);
      if (!card) continue;
      payment += card.unit_price;
    }
  }
  Logger.log(payment);
}
