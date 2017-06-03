(function (window) {
    //prevent overwriting
    if (typeof window.citrus === "undefined") {
        window.citrus = {};
    }

    citrus.namespace = function (namespaceString) {
        if (namespaceString)
            var parts = namespaceString.split('.');
        var parent = window;
        var currentPart = '';

        for (var i = 0, length = parts.length; i < length; i++) {
            currentPart = parts[i];
            parent[currentPart] = parent[currentPart] || {};
            parent = parent[currentPart];
        }

        return parent;
    };

    //citrus.namespace alias
    citrus.ns = citrus.namespace;

    citrus.hasNamespace = function (namespaceString) {
        var parts = namespaceString.split('.');
        var parent = window;
        var currentPart = '';

        for (var i = 0, length = parts.length; i < length; i++) {
            currentPart = parts[i];
            if (typeof parent[currentPart] === "undefined") {
                return false;
            }
            parent = parent[currentPart];
        }
        return true;
    };

    //citrus.hasNamespace alias
    citrus.hasNs = citrus.hasNamespace;
})(window);
