class Card {
  constructor(id, member_ids, label_ids, shortUrl) {
    this.id = id;
    this.member_ids = member_ids;
    this.label_ids = label_ids;
    this.shortUrl = shortUrl;
  }
  // メンバにアクセスするたびにAPIを叩いてしまうので，ゲッターにキャッシュを挟む

  get members() {
    if (!this.members_cache) {
      this.members_cache = this.getMembers();
    }
    return this.members_cache;
  }

  getMembers(key) {
    let members = [];
    for (let i = 0; i < this.member_ids.length; i++) {
      let id = this.member_ids[i];
      if(key) {
        members.push(getMember(id)[key]);
        continue;
      }
      members.push(getMember(id));
    }
    return members;
  }

  get labels() {
    if(!this.labels_cache) {
      this.labels_cache = this.getLabels();
    }
    return this.labels_cache
  }

  getLabels() {
    let labels = [];
    for (let i = 0; i< this.label_ids.length; i++ ){
      let id = this.label_ids[i];
      labels.push(getLabel(id));
    }
    return labels;
  }

  get price() {
    return this.getPrice();
  }

  getPrice() {
    var price_sum = 0;
    var labels = this.getLabels();
    for (let i = 0; i < labels.length; i++) {
      let label = labels[i];
      price_sum += PRICE_MAP[label.color];
    }
    // 報酬は人数で分割
    return price_sum / this.members.length;
  }

  get contributors() {
    var members = this.members;
    var contributors = [];
    for(let i = 0; i < members.length; i++) {
      contributors.push(members[i]['fullName']);
    }
    return contributors;
  }
}
