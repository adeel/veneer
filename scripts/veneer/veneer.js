var veneer = (function() {
  var self = {};

  function scale_dimensions_to_fit_in_box(width, height, max_width, max_height) {
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

  function scale_dimensions_to_fit_in_window(width, height) {
    var window_size = window.getSize();
    return scale_dimensions_to_fit_in_box(width, height, window_size.x - 20, window_size.y - 20);
  }

  self.resize = function(modal, width, height) {
    var dim = scale_dimensions_to_fit_in_window(parseInt(width), parseInt(height));
    var window_size = window.getSize();
    modal.setStyles({
      width: dim.width,
      height: dim.height,
      left: (window_size.x - dim.width) / 2.0,
      top: (window_size.y - dim.height) / 2.0
    });
  }

  self.autoresize = function(modal) {
    self.resize(modal, modal.getSize().x, modal.getSize().y);
  }

  function add_observer(overlay) {
    overlay.addEvent("click", function() {
      self.close();
    });
  }

  self.open = function(element, width, height) {
    veneer.close();

    var body = document.getElement("body");
    var modal = new Element(".veneer_modal");
    element.clone().inject(modal);
    modal.inject(body);

    var overlay = new Element(".veneer_overlay");
    overlay.inject(body);

    if (width && height) {
      self.resize(modal, width, height);
    } else {
      self.autoresize(modal);
    }
    
    add_observer(overlay);
  };

  self.close = function() {
    var modal = document.getElement(".veneer_modal");
    if (modal) {
      modal.dispose();
    }
    var overlay = document.getElement(".veneer_overlay");
    if (overlay) {
      overlay.dispose();
    }
  }

  return self;
}());