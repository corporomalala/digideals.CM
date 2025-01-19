{% if page.scripts == "on" %}
{% assign vPageKey = page.slug %}{% capture vPageFile %}assets/script_{{ vPageKey }}.dependencies.js{% endcapture %}
{% include {{ vPageFile }} %}
{% endif %}