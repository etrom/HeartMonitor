{% block content %}

  <div class="page-header">
      <img src="https://pbs.twimg.com/profile_images/2450268678/olxp11gnt09no2y2wpsh_normal.jpeg"><br>
      <b>{{ name.first }}</b><br>
    <p><img src="http://img2.wikia.nocookie.net/__cb20131106162838/shipping/images/b/b1/Flying_Heart_Icon.png"/></p>
    <p>This is the weekly Update email </p>
    <p>{{name.first}}, here is an overview of your partners bars. Is this information up to date?</p>
    <p><a href="{{link}}">What have you and {{partner.name}} done lately?</a></p>
    {% for bar in bars %}
    <li>{{bar.name}}</li>
    <div class="progress">
            <div class="progress-bar progress-bar-success progress-bar-striped " role="progressbar" aria-valuenow="{{bars.fulfillment}}" aria-valuemin="0" aria-valuemax="100" style="width: {{bar.fulfillment.toFixed()}}%">

              <!-- <span ng-show="show">{{bar.fulfillment.toFixed()}}%</span> -->

            </div>
    </div>
    {% endfor %}
    <p>For Love's Sake,</p>
    <p>The Heart Bar Team</p>
    <p><img src="http://icons.iconarchive.com/icons/mirella-gabriele/valentine/32/Heart-red-icon.png"/><br/></p>
    <p><br/></p>
</div>
{% endblock %}

