function getCardInfos(list_name) {
  if (!TRELLO_API_KEY) {
    Logger.log('Set Api Key');
    return false;
  }
  else if (!TRELLO_TOKEN) {
    Logger.log('Set Token');
    return false
  }
  else if (!LIST_IDS) {
    Logger.log('Set List Id');
    return false;
  }
  if(!list_name) list_name = 'done';
  var list_id = LIST_IDS[list_name];
  var url = "https://trello.com/1/lists/" + list_id + "/cards?key=" + TRELLO_API_KEY + "&token=" + TRELLO_TOKEN + "&fields=idMembers,idLabels,shortUrl,";

  res = JSON.parse(UrlFetchApp.fetch(url, {'method':'get'}));
//  Logger.log(res);
  return res;
}


function getMember(member_id) {
  if (!TRELLO_API_KEY) {
    Logger.log('Set Api Key');
    return false;
  }
  else if (!TRELLO_TOKEN) {
    Logger.log('Set Token');
    return false
  }
  else if (!member_id) {
    Logger.log('Set Member Id');
    return false;
  }
  var url = "https://trello.com/1/members/" + member_id + "/?key=" + TRELLO_API_KEY + "&token=" + TRELLO_TOKEN + "&fields=username,fullName,";

  res = JSON.parse(UrlFetchApp.fetch(url, {'method':'get'}));
//  Logger.log(res);
  return res;
}

function getLabel(label_id) {
  if (!TRELLO_API_KEY) {
    Logger.log('Set Api Key');
    return false;
  }
  else if (!TRELLO_TOKEN) {
    Logger.log('Set Token');
    return false
  }
  else if (!label_id) {
    Logger.log('Set Label Id');
    return false;
  }
  var url = "https://trello.com/1/labels/" + label_id + "/?key=" + TRELLO_API_KEY + "&token=" + TRELLO_TOKEN + "&fields=color";

  res = JSON.parse(UrlFetchApp.fetch(url, {'method':'get'}));
//  Logger.log(res);
  return res;
}
