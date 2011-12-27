var veneer = (function() {
  var self = {};

  function add_observer(overlay) {
    overlay.addEvent("click", function() {
      self.close();
    });
  }

  self.scale_dimensions_to_fit_in_box = function(width, height, max_width, max_height) {
    if (width > max_width) {
      height = max_width * (height / width);
      width = max_width;
    }
    if (height > max_height) {
      width = max_height * (width / height);
      height = max_height;
    }
    return {width: Math.floor(width), height: Math.floor(height)};
  }

  self.scale_dimensions_to_fit_in_window = function(width, height) {
    var window_size = window.getSize();
    return self.scale_dimensions_to_fit_in_box(width, height, window_size.x - 20, window_size.y - 20);
  }

  self.resize = function(dialog, width, height) {
    var dim = self.scale_dimensions_to_fit_in_window(parseInt(width), parseInt(height));
    var window_size = window.getSize();
    dialog.setStyles({
      width: dim.width,
      height: dim.height,
      left: (window_size.x - dim.width) / 2.0,
      top: (window_size.y - dim.height) / 2.0
    });
  }

  self.open = function(element, width, height) {
    veneer.close();

    element = element.clone();

    var body = document.getElement("body");

    var dialog = new Element(".veneer_dialog");
    element.inject(dialog);
    dialog.inject(body);

    var overlay = new Element(".veneer_overlay");
    overlay.inject(body);

    self.resize(dialog, width, height);
    add_observer(overlay);
  };

  self.close = function() {
    var dialog = document.getElement(".veneer_dialog");
    if (dialog) {
      dialog.dispose();
    }
    var overlay = document.getElement(".veneer_overlay");
    if (overlay) {
      overlay.dispose();
    }
  }

  return self;
}());