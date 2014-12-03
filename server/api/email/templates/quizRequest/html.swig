{% block content %}

  <div class="page-header">
      <img src="{{profilePic}}"><br>
      <b>{{ name.first }}</b><br>
    <p><img src="http://img2.wikia.nocookie.net/__cb20131106162838/shipping/images/b/b1/Flying_Heart_Icon.png"/></p>
    <p>{{name.first}} has just completed a Heart Bars Quiz! How well do you know your partner? Click the link below to find out!</p>
    <p><a href="{{link}}">PLAY NOW</a></p>
    <br>
    <p>A personal message from NAME:</p>
    <p>MESSAGE</p>
    <p><br/></p>
    <p>For Love's Sake,</p>
    <p>The Heart Bar Team</p>
    <p><img src="http://icons.iconarchive.com/icons/mirella-gabriele/valentine/32/Heart-red-icon.png"/><br/></p>
    <p><br/></p>
</div>
{% endblock %}

