import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image_file') as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: '请上传图片' },
        { status: 400 }
      );
    }

    // 将图片转换为 base64
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // 获取图片格式
    const imageType = imageFile.type.split('/')[1]; // 例如: 'png', 'jpeg', 'webp'
    const imageUrl = `data:image/${imageType};base64,${base64Image}`;

    // 调用火山引擎 API
    const apiKey = process.env.ARK_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key 未配置' },
        { status: 500 }
      );
    }

    const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'ep-20251016234744-hj8vh',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: '识别图片'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ]
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
    
    // 返回识别结果
    return NextResponse.json({
      success: true,
      result: data.choices?.[0]?.message?.content || '识别失败',
      fullResponse: data
    });

  } catch (error) {
    console.error('识别图片错误:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    );
  }
}

