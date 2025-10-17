import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, size = '2K' } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: '请输入提示词' },
        { status: 400 }
      );
    }

    // 获取 API Key
    const apiKey = process.env.ARK_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key 未配置' },
        { status: 500 }
      );
    }

    // 调用火山引擎图片生成 API
    const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'ep-20251017225426-ptjqf',
        prompt: prompt,
        sequential_image_generation: 'disabled',
        response_format: 'url',
        size: size,
        stream: false,
        watermark: true
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API 错误:', errorText);
      return NextResponse.json(
        { error: `API 调用失败: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // 返回生成结果
    return NextResponse.json({
      success: true,
      data: data
    });

  } catch (error) {
    console.error('生成图片错误:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    );
  }
}

