const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addNode(this.rootNode, data);

    function addNode(node, data) {
      if (!node) {
        // return leaf
        return new Node(data);
      }

      if (data < node.data) {
        node.left = addNode(node.left, data);
      }

      if (data > node.data) {
        node.right = addNode(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    const result = isNodeFound(this.rootNode, data);

    function isNodeFound(node, data) {
      if (node.data === data) {
        return true;
      }

      if (data < node.data) {
        if (!node.left) {
          return false;
        }
        return isNodeFound(node.left, data);
      }

      if (data > node.data) {
        if (!node.right) {
          return false;
        }
        return isNodeFound(node.right, data);
      }
    }

    return result;
  }

  find(data) {
    const foundNode = findNode(this.rootNode, data);

    function findNode(node, data) {
      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        if (!node.left) {
          return null;
        }
        return findNode(node.left, data);
      }

      if (data > node.data) {
        if (!node.right) {
          return null;
        }
        return findNode(node.right, data);
      }
    }

    return foundNode;
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        // if data === node.data

        // if node is a tree leaf
        if (!node.left && !node.right) {
          return null;
        }

        // if node is a single-child node
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }

        // if node has both children
        // let maxFromNodeLeft = node.left;
        let maxFromLeftNodes = node.left;
        while (maxFromLeftNodes.right) {
          maxFromLeftNodes = maxFromLeftNodes.right;
        }
        node.data = maxFromLeftNodes.data;
        node.right = removeNode(node.right, maxFromLeftNodes.data);

        return node;
      }
    }
  }

  min() {
    const min = findMin(this.rootNode);

    function findMin(node) {
      if (!node) {
        return null;
      }

      if (!node.left) {
        return node.data;
      }

      return findMin(node.left);
    }

    return min;
  }

  max() {
    const max = findMax(this.rootNode);

    function findMax(node) {
      if (!node) {
        return node;
      }

      if (!node.right) {
        return node.data;
      }

      return findMax(node.right);
    }

    return max;
  }
}

module.exports = {
  BinarySearchTree,
};
