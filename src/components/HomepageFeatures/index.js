import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '强大性能',
    Svg: require('@site/static/img/performance.svg').default,
    description: (
      <>
        32 位强大处理器，远超传统 8 位机可用资源
      </>
    ),
  },
  {
    title: '兼容极佳',
    Svg: require('@site/static/img/Arduino_ide.svg').default,
    description: (
      <>
        完美兼容 Arduino 平台，可用 Arduino IDE 编译运行，兼容全部 API 与语法
      </>
    ),
  },
  {
    title: '多端可用',
    Svg: require('@site/static/img/platform.svg').default,
    description: (
      <>
        全平台支持，无论是 Windows、MacOS 还是 Linux，都能轻松使用
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
