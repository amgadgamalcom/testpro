{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.jdk17
    pkgs.unzip
    pkgs.nodejs_20
    pkgs.chromium
    pkgs.fontconfig
    pkgs.dejavu_fonts

  ];
  idx.extensions = [
    
  ];
  idx.workspace = {
    onCreate = {
    };
    onStart = {
      command = "cd tesss && npm install && node index.js";
    };
  };
  idx.previews = {
    previews = {
      web = {
        command = [
          "node tesss/index.js"
        ];
        manager = "web";
      };
      android = {
        command = [
          "flutter"
          "run"
          "--machine"
          "-d"
          "android"
          "-d"
          "localhost:5555"
        ];
        manager = "flutter";
      };
    };
  };
}
