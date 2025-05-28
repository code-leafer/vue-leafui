# 设计资源

My UI 设计资源是基于我们的设计系统构建的，提供完整、统一的设计元素，帮助设计师和开发者打造一致的产品体验。

## 组件设计资源

设计资源包含我们所有组件的设计规范和可编辑组件，方便设计师直接使用进行界面设计。

<div class="resource-cards">
  <div class="resource-card">
    <img src="/images/resources/figma.png" alt="Figma" />
    <div class="resource-card-info">
      <h3>Figma 组件库</h3>
      <p>基于 Figma 设计的完整组件库，包含所有 My UI 组件</p>
      <a href="https://www.figma.com" target="_blank" class="resource-download-btn">下载资源</a>
    </div>
  </div>
  
  <div class="resource-card">
    <img src="/images/resources/sketch.png" alt="Sketch" />
    <div class="resource-card-info">
      <h3>Sketch 组件库</h3>
      <p>基于 Sketch 设计的完整组件库，包含所有 My UI 组件</p>
      <a href="https://www.sketch.com" target="_blank" class="resource-download-btn">下载资源</a>
    </div>
  </div>
  
  <div class="resource-card">
    <img src="/images/resources/adobe-xd.png" alt="Adobe XD" />
    <div class="resource-card-info">
      <h3>Adobe XD 组件库</h3>
      <p>基于 Adobe XD 设计的完整组件库，包含所有 My UI 组件</p>
      <a href="https://www.adobe.com/products/xd.html" target="_blank" class="resource-download-btn">下载资源</a>
    </div>
  </div>
</div>

## 设计指南

我们提供了详细的设计指南，帮助设计师了解 My UI 的设计原则、色彩系统、排版系统和组件规范。

- [设计语言](./design-language)
- [色彩系统](./color-system)
- [排版系统](./typography-system)
- [组件设计规范](./component-specs)

## 图标库

My UI 提供了一套丰富的图标库，满足常见的界面设计需求。

<div class="resource-card icon-library-card">
  <img src="/images/resources/icons.png" alt="图标库" />
  <div class="resource-card-info">
    <h3>SVG 图标库</h3>
    <p>提供 SVG 格式的图标，易于定制颜色和大小</p>
    <a href="#" target="_blank" class="resource-download-btn">下载图标库</a>
  </div>
</div>

<style>
.resource-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin: 32px 0;
}

.resource-card {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.resource-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.resource-card-info {
  padding: 16px;
}

.resource-card-info h3 {
  margin-top: 0;
  font-size: 18px;
}

.resource-download-btn {
  display: inline-block;
  padding: 8px 16px;
  background-color: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 8px;
  transition: background-color 0.3s;
}

.resource-download-btn:hover {
  background-color: var(--vp-c-brand-dark);
}

.icon-library-card {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.icon-library-card img {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .icon-library-card {
    flex-direction: column;
  }
  
  .icon-library-card img {
    width: 100%;
  }
}
</style> 